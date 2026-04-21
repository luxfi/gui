'use client'
import * as React from 'react'
import { XStack, YStack, Text, Button, Input, Spinner } from '@hanzo/gui'

// Minimal AI SDK v4 data-stream line parser — so we don't pull in ai-sdk as a
// runtime dep on every consumer. Each chunk is newline-delimited: `0:"text"`,
// `d:{...}`, `e:{...}`, etc. We only care about `0:` (token) and stop at `e:`/end.
function parseStreamLine(line: string): { type: 'text' | 'end'; value?: string } | null {
  if (!line) return null
  const colon = line.indexOf(':')
  if (colon < 0) return null
  const tag = line.slice(0, colon)
  const payload = line.slice(colon + 1)
  if (tag === '0') {
    try {
      return { type: 'text', value: JSON.parse(payload) as string }
    } catch {
      return null
    }
  }
  if (tag === 'd' || tag === 'e') return { type: 'end' }
  return null
}

export type LuxChatMessage = {
  id: string
  role: 'user' | 'assistant'
  content: string
}

export type LuxChatWidgetProps = {
  /** Publishable key (pk-*) for hanzo/cloud. Required. */
  publishableKey: string
  /** Override the chat-docs endpoint. Default: https://api.hanzo.ai/v1/chat-docs */
  endpoint?: string
  /** Widget title. Default: "Lux AI". */
  title?: string
  /** Subtitle. Default: "Ask anything about Lux". */
  subtitle?: string
  /** Current page URL/path used as RAG context hint. */
  pageContext?: string
  /** Seed suggestions shown before the first message. */
  suggestions?: string[]
  /** Open-by-default (for debugging). */
  defaultOpen?: boolean
}

const DEFAULT_SUGGESTIONS = [
  'What is Lux?',
  'Show me the MPC architecture',
  'How does post-quantum crypto work here?',
  'Where do I start with the API?',
]

/**
 * Floating chat widget that streams RAG-backed answers from hanzo/cloud's
 * /v1/chat-docs endpoint using a publishable key (pk-*). Safe to embed in
 * public pages — the key is origin-scoped server-side.
 */
export const LuxChatWidget: React.FC<LuxChatWidgetProps> = ({
  publishableKey,
  endpoint = 'https://api.hanzo.ai/v1/chat-docs',
  title = 'Lux AI',
  subtitle = 'Ask anything about Lux',
  pageContext,
  suggestions = DEFAULT_SUGGESTIONS,
  defaultOpen = false,
}) => {
  const [open, setOpen] = React.useState(defaultOpen)
  const [messages, setMessages] = React.useState<LuxChatMessage[]>([])
  const [input, setInput] = React.useState('')
  const [busy, setBusy] = React.useState(false)
  const scrollRef = React.useRef<HTMLDivElement | null>(null)
  const abortRef = React.useRef<AbortController | null>(null)

  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages, busy])

  const send = React.useCallback(
    async (text: string) => {
      const query = text.trim()
      if (!query || busy) return
      const userMsg: LuxChatMessage = { id: String(Date.now()), role: 'user', content: query }
      setMessages((prev) => [...prev, userMsg])
      setInput('')
      setBusy(true)

      const history = [...messages, userMsg].map((m) => ({ role: m.role, content: m.content }))
      const withContext = pageContext
        ? [{ role: 'system', content: `Current page: ${pageContext}` }, ...history]
        : history

      const controller = new AbortController()
      abortRef.current = controller
      const assistantId = String(Date.now() + 1)
      setMessages((prev) => [...prev, { id: assistantId, role: 'assistant', content: '' }])

      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publishableKey}`,
          },
          body: JSON.stringify({ messages: withContext }),
          signal: controller.signal,
        })
        if (!res.ok || !res.body) {
          const err = await res.text().catch(() => res.statusText)
          throw new Error(err || 'request failed')
        }
        const reader = res.body.getReader()
        const decoder = new TextDecoder()
        let buf = ''
        while (true) {
          const { value, done } = await reader.read()
          if (done) break
          buf += decoder.decode(value, { stream: true })
          const lines = buf.split('\n')
          buf = lines.pop() ?? ''
          for (const line of lines) {
            const parsed = parseStreamLine(line.trim())
            if (!parsed) continue
            if (parsed.type === 'text' && parsed.value) {
              const token = parsed.value
              setMessages((prev) =>
                prev.map((m) => (m.id === assistantId ? { ...m, content: m.content + token } : m)),
              )
            }
          }
        }
      } catch (e) {
        const msg = e instanceof Error ? e.message : 'connection failed'
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? {
                  ...m,
                  content:
                    m.content ||
                    `I hit a snag (${msg}). Try docs.lux.financial or blog.lux.network while I reconnect.`,
                }
              : m,
          ),
        )
      } finally {
        setBusy(false)
        abortRef.current = null
      }
    },
    [busy, endpoint, messages, pageContext, publishableKey],
  )

  if (!open) {
    return (
      <YStack
        position="fixed"
        bottom={24}
        right={24}
        zIndex={9999}
        pointerEvents="auto"
      >
        <Button
          size="$5"
          circular
          onPress={() => setOpen(true)}
          backgroundColor="$color12"
          color="$color1"
          hoverStyle={{ scale: 1.05 }}
          pressStyle={{ scale: 0.95 }}
          aria-label="Open chat"
        >
          <ChatIcon />
        </Button>
      </YStack>
    )
  }

  return (
    <YStack
      position="fixed"
      bottom={0}
      right={0}
      zIndex={9999}
      width="100%"
      height="100%"
      $gtSm={{ bottom: 24, right: 24, width: 380, height: 560, borderRadius: '$4' }}
      backgroundColor="$background"
      borderColor="$borderColor"
      borderWidth={1}
      overflow="hidden"
      shadowColor="$shadowColor"
      shadowRadius={24}
    >
      <XStack
        padding="$3"
        justifyContent="space-between"
        alignItems="center"
        backgroundColor="$color12"
      >
        <YStack>
          <Text color="$color1" fontWeight="700">{title}</Text>
          <Text color="$color1" opacity={0.7} fontSize="$2">{subtitle}</Text>
        </YStack>
        <Button
          size="$2"
          circular
          onPress={() => setOpen(false)}
          backgroundColor="transparent"
          color="$color1"
          aria-label="Close chat"
        >
          ✕
        </Button>
      </XStack>

      <YStack
        flex={1}
        padding="$3"
        gap="$2"
        overflow="scroll"
        ref={scrollRef as any}
      >
        {messages.length === 0 && (
          <YStack gap="$2">
            <Text color="$color11" fontSize="$2">
              Ask about Lux products, post-quantum crypto, MPC, APIs, or docs.
            </Text>
            <XStack flexWrap="wrap" gap="$2">
              {suggestions.map((s) => (
                <Button
                  key={s}
                  size="$2"
                  theme="alt2"
                  onPress={() => send(s)}
                  disabled={busy}
                >
                  {s}
                </Button>
              ))}
            </XStack>
          </YStack>
        )}
        {messages.map((m) => (
          <YStack
            key={m.id}
            alignSelf={m.role === 'user' ? 'flex-end' : 'flex-start'}
            maxWidth="85%"
            padding="$2"
            borderRadius="$3"
            backgroundColor={m.role === 'user' ? '$color12' : '$color3'}
          >
            <Text color={m.role === 'user' ? '$color1' : '$color12'} whiteSpace="pre-wrap">
              {m.content || (m.role === 'assistant' && busy ? '…' : '')}
            </Text>
          </YStack>
        ))}
        {busy && messages[messages.length - 1]?.role !== 'assistant' && (
          <XStack alignSelf="flex-start" padding="$2">
            <Spinner />
          </XStack>
        )}
      </YStack>

      <XStack padding="$2" gap="$2" borderTopWidth={1} borderColor="$borderColor">
        <Input
          flex={1}
          value={input}
          onChangeText={setInput}
          placeholder="Ask anything..."
          onSubmitEditing={() => send(input)}
          disabled={busy}
        />
        <Button
          onPress={() => send(input)}
          disabled={busy || !input.trim()}
          backgroundColor="$color12"
          color="$color1"
        >
          Send
        </Button>
      </XStack>
    </YStack>
  )
}

const ChatIcon: React.FC = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
)
