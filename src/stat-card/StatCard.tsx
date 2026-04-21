import * as React from 'react'
import { YStack, Text, Paragraph } from '@hanzo/gui'

export type LuxStatCardProps = {
  label: string
  value: React.ReactNode
  delta?: React.ReactNode
  /**
   * Visual emphasis. 'danger' and 'success' color the delta.
   */
  tone?: 'neutral' | 'success' | 'danger'
  /** Formatter hint, e.g. $ / %. Rendered as a small suffix. */
  suffix?: string
}

const toneColor = {
  neutral: '$color',
  success: '$green10',
  danger: '$red10',
} as const

export const LuxStatCard: React.FC<LuxStatCardProps> = ({
  label,
  value,
  delta,
  tone = 'neutral',
  suffix,
}) => (
  <YStack
    p="$4"
    br="$4"
    bw={1}
    bc="$borderColor"
    gap="$2"
    bg="$background"
  >
    <Paragraph
      fontSize="$2"
      textTransform="uppercase"
      letterSpacing={1}
      opacity={0.6}
    >
      {label}
    </Paragraph>
    <Text fontWeight="700" fontSize="$9" lineHeight={1.1}>
      {value}
      {suffix ? (
        <Text fontWeight="500" fontSize="$6" opacity={0.6}>
          {' '}
          {suffix}
        </Text>
      ) : null}
    </Text>
    {delta !== undefined && delta !== null ? (
      <Text fontSize="$3" color={toneColor[tone]}>
        {delta}
      </Text>
    ) : null}
  </YStack>
)

export type LuxStatRowProps = {
  stats: readonly LuxStatCardProps[]
  /** Max container width in px. Default 1280. */
  maxWidth?: number
}

export const LuxStatRow: React.FC<LuxStatRowProps> = ({
  stats,
  maxWidth = 1280,
}) => (
  <YStack ai="center" px="$4" py="$6">
    <YStack w="100%" maxWidth={maxWidth}>
      <YStack
        flexDirection="row"
        flexWrap="wrap"
        gap="$4"
        $sm={{ flexDirection: 'column' }}
      >
        {stats.map((s) => (
          <YStack key={s.label} flex={1} minWidth={200}>
            <LuxStatCard {...s} />
          </YStack>
        ))}
      </YStack>
    </YStack>
  </YStack>
)
