import * as React from 'react'
import { XStack, YStack, H2, Text } from '@hanzo/gui'

export type LuxStatTone = 'neutral' | 'success' | 'danger'

export type LuxStatCardProps = {
  label: string
  value: React.ReactNode
  delta?: React.ReactNode
  /** Visual emphasis. 'danger' and 'success' color the delta. */
  tone?: LuxStatTone
  /** Formatter hint, e.g. $ / %. Rendered as a small suffix. */
  suffix?: string
}

const toneColor: Record<LuxStatTone, any> = {
  neutral: '$color',
  success: '#22C55E',
  danger: '#EF4444',
}

export const LuxStatCard: React.FC<LuxStatCardProps> = ({
  label,
  value,
  delta,
  tone = 'neutral',
  suffix,
}) => (
  <YStack
    gap="$2"
    p="$4"
    borderRadius="$6"
    borderWidth={1}
    borderColor="rgba(255,255,255,0.1)"
    bg="$background"
    flex={1}
    minWidth={200}
  >
    <Text
      fontSize={12}
      letterSpacing={2}
      textTransform="uppercase"
      color="rgba(255,255,255,0.6)"
    >
      {label}
    </Text>
    <XStack items="baseline" gap="$1">
      <H2 color="$color" fontSize={30} fontWeight="700" lineHeight={32}>
        {value}
      </H2>
      {suffix ? (
        <Text fontSize={18} fontWeight="500" color="rgba(255,255,255,0.6)">
          {suffix}
        </Text>
      ) : null}
    </XStack>
    {delta !== undefined && delta !== null ? (
      <Text fontSize={14} color={toneColor[tone]}>
        {delta}
      </Text>
    ) : null}
  </YStack>
)

export type LuxStatRowProps = {
  stats: readonly LuxStatCardProps[]
}

export const LuxStatRow: React.FC<LuxStatRowProps> = ({ stats }) => (
  <YStack bg="$background" px="$6" py="$8">
    <XStack
      maxWidth={1280}
      width="100%"
      mx="auto"
      flexWrap="wrap"
      gap="$4"
    >
      {stats.map((s) => (
        <LuxStatCard key={s.label} {...s} />
      ))}
    </XStack>
  </YStack>
)
