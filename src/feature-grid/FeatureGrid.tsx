import * as React from 'react'
import { XStack, YStack, H2, H4, Paragraph, Text } from '@hanzo/gui'

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
}

const minCardWidth: Record<2 | 3 | 4, number> = {
  2: 320,
  3: 280,
  4: 240,
}

export const LuxFeatureGrid: React.FC<LuxFeatureGridProps> = ({
  heading,
  eyebrow,
  features,
  columns = 3,
}) => {
  const minWidth = minCardWidth[columns]
  return (
    <YStack bg="$background" px="$6" py="$12" $gtMd={{ py: '$20' }}>
      <YStack maxWidth={1280} width="100%" mx="auto" gap="$8">
        {eyebrow || heading ? (
          <YStack gap="$2" maxWidth={720}>
            {eyebrow ? (
              <Text
                fontSize={12}
                letterSpacing={2}
                textTransform="uppercase"
                color="rgba(255,255,255,0.6)"
              >
                {eyebrow}
              </Text>
            ) : null}
            {heading ? (
              <H2
                color="$color"
                fontWeight="700"
                fontSize={32}
                lineHeight={38}
                $gtMd={{ fontSize: 48, lineHeight: 56 }}
              >
                {heading}
              </H2>
            ) : null}
          </YStack>
        ) : null}
        <XStack flexWrap="wrap" gap="$4">
          {features.map((f) => (
            <YStack
              key={f.title}
              gap="$2"
              p="$6"
              borderRadius="$6"
              borderWidth={1}
              borderColor="rgba(255,255,255,0.1)"
              bg="rgba(255,255,255,0.02)"
              flex={1}
              minWidth={minWidth}
            >
              {f.icon ? (
                <YStack mb="$2" color="$color">
                  {f.icon}
                </YStack>
              ) : null}
              <H4 color="$color" fontSize={18} fontWeight="600">
                {f.title}
              </H4>
              <Paragraph
                fontSize={14}
                color="rgba(255,255,255,0.8)"
                lineHeight={22}
              >
                {f.description}
              </Paragraph>
            </YStack>
          ))}
        </XStack>
      </YStack>
    </YStack>
  )
}
