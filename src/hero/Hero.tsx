import * as React from 'react'
import { YStack, XStack, H1, H2, Paragraph, Button } from '@hanzo/gui'

export type LuxHeroProps = {
  eyebrow?: string
  title: React.ReactNode
  subtitle?: React.ReactNode
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  /**
   * Optional visual rendered to the right on large screens and below
   * copy on small. Accepts any ReactNode (image, spline, video).
   */
  visual?: React.ReactNode
  renderLink?: (props: {
    href: string
    children: React.ReactNode
  }) => React.ReactNode
  /** Max container width in px. Default 1280. */
  maxWidth?: number
}

const DefaultLink = ({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) => (
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
  maxWidth = 1280,
}) => {
  const Link = renderLink ?? DefaultLink
  return (
    <YStack
      tag="section"
      role="region"
      ai="center"
      px="$4"
      py="$10"
      bg="$background"
    >
      <XStack
        w="100%"
        maxWidth={maxWidth}
        gap="$8"
        ai="center"
        jc="space-between"
        $sm={{ flexDirection: 'column' }}
      >
        <YStack flex={1} gap="$4" maxWidth={640}>
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
          <H1
            fontSize={72}
            lineHeight={1.05}
            fontWeight="800"
            $sm={{ fontSize: 48 }}
          >
            {title}
          </H1>
          {subtitle ? (
            <Paragraph fontSize="$6" opacity={0.8} lineHeight={1.5}>
              {subtitle}
            </Paragraph>
          ) : null}
          {(primaryCta || secondaryCta) && (
            <XStack gap="$3" mt="$2" flexWrap="wrap">
              {primaryCta ? (
                <Link href={primaryCta.href}>
                  <Button size="$5" themeInverse>
                    {primaryCta.label}
                  </Button>
                </Link>
              ) : null}
              {secondaryCta ? (
                <Link href={secondaryCta.href}>
                  <Button size="$5" chromeless>
                    {secondaryCta.label}
                  </Button>
                </Link>
              ) : null}
            </XStack>
          )}
        </YStack>
        {visual ? (
          <YStack flex={1} ai="center" jc="center">
            {visual}
          </YStack>
        ) : null}
      </XStack>
    </YStack>
  )
}
