import * as React from 'react'
import { YStack, XStack, H3, Paragraph } from '@hanzo/gui'

export type LuxFeature = {
  title: string
  description: string
  icon?: React.ReactNode
}

export type LuxFeatureGridProps = {
  heading?: React.ReactNode
  eyebrow?: string
  features: readonly LuxFeature[]
  /** Columns on large screens. Default 3. */
  columns?: 2 | 3 | 4
  /** Max container width in px. Default 1280. */
  maxWidth?: number
}

export const LuxFeatureGrid: React.FC<LuxFeatureGridProps> = ({
  heading,
  eyebrow,
  features,
  columns = 3,
  maxWidth = 1280,
}) => {
  // Tamagui Stack uses flex; we pick a width per item to achieve columns.
  const widthPct = `${Math.floor(100 / columns) - 1}%`

  return (
    <YStack
      tag="section"
      role="region"
      ai="center"
      px="$4"
      py="$10"
      bg="$background"
    >
      <YStack w="100%" maxWidth={maxWidth} gap="$6">
        {(eyebrow || heading) && (
          <YStack gap="$2" maxWidth={640}>
            {eyebrow ? (
              <Paragraph
                fontSize="$3"
                textTransform="uppercase"
                letterSpacing={2}
                opacity={0.6}
              >
                {eyebrow}
              </Paragraph>
            ) : null}
            {heading ? (
              <H3 fontSize="$9" fontWeight="700" lineHeight={1.15}>
                {heading}
              </H3>
            ) : null}
          </YStack>
        )}
        <XStack flexWrap="wrap" gap="$4">
          {features.map((f) => (
            <YStack
              key={f.title}
              width={widthPct}
              $sm={{ width: '100%' }}
              gap="$2"
              p="$4"
              br="$4"
              bw={1}
              bc="$borderColor"
            >
              {f.icon ? <YStack>{f.icon}</YStack> : null}
              <H3 fontSize="$6" fontWeight="600">
                {f.title}
              </H3>
              <Paragraph opacity={0.8}>{f.description}</Paragraph>
            </YStack>
          ))}
        </XStack>
      </YStack>
    </YStack>
  )
}
