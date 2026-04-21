import * as React from 'react'
import { XStack, YStack, H1, Paragraph, Text, Button } from '@hanzo/gui'
import type { LuxLinkRenderer } from '../header/Header'

export type LuxHeroCta = {
  label: string
  href: string
}

export type LuxHeroProps = {
  eyebrow?: string
  title: React.ReactNode
  subtitle?: React.ReactNode
  primaryCta?: LuxHeroCta
  secondaryCta?: LuxHeroCta
  /**
   * Optional visual rendered to the right on large screens and below copy on small.
   * Accepts any ReactNode (image, spline, video).
   */
  visual?: React.ReactNode
  renderLink?: LuxLinkRenderer
}

const DefaultLink: LuxLinkRenderer = ({ href, children }) => (
  <a href={href} style={{ textDecoration: 'none', color: 'inherit' }}>
    {children}
  </a>
)

export const LuxHero: React.FC<LuxHeroProps> = ({
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  visual,
  renderLink,
}) => {
  const Link = renderLink ?? DefaultLink
  return (
    <YStack bg="$background" px="$6" py="$12" $gtMd={{ py: '$20' }}>
      <YStack
        maxWidth={1280}
        width="100%"
        mx="auto"
        gap="$8"
        $gtMd={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <YStack flex={1} gap="$4" maxWidth={720}>
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
          <H1
            color="$color"
            fontWeight="800"
            fontSize={48}
            lineHeight={52}
            $gtMd={{ fontSize: 72, lineHeight: 76 }}
          >
            {title}
          </H1>
          {subtitle ? (
            <Paragraph
              size="$5"
              color="rgba(255,255,255,0.8)"
              lineHeight={28}
              $gtMd={{ fontSize: 20, lineHeight: 32 }}
            >
              {subtitle}
            </Paragraph>
          ) : null}
          {primaryCta || secondaryCta ? (
            <XStack flexWrap="wrap" gap="$3" mt="$2">
              {primaryCta ? (
                <Link href={primaryCta.href}>
                  <Button size="$5" bg="$color" color="$background" borderRadius="$6">
                    {primaryCta.label}
                  </Button>
                </Link>
              ) : null}
              {secondaryCta ? (
                <Link href={secondaryCta.href}>
                  <Button
                    size="$5"
                    chromeless
                    borderWidth={1}
                    borderColor="rgba(255,255,255,0.2)"
                    color="$color"
                    borderRadius="$6"
                  >
                    {secondaryCta.label}
                  </Button>
                </Link>
              ) : null}
            </XStack>
          ) : null}
        </YStack>
        {visual ? (
          <YStack flex={1} items="center" justify="center">
            {visual}
          </YStack>
        ) : null}
      </YStack>
    </YStack>
  )
}
