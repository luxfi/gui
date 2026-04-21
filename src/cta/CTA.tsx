import * as React from 'react'
import { YStack, XStack, H2, Paragraph, Button } from '@hanzo/gui'

export type LuxCtaProps = {
  title: React.ReactNode
  subtitle?: React.ReactNode
  primary: { label: string; href: string }
  secondary?: { label: string; href: string }
  renderLink?: (props: {
    href: string
    children: React.ReactNode
  }) => React.ReactNode
  /** Max container width in px. Default 1024. */
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

export const LuxCta: React.FC<LuxCtaProps> = ({
  title,
  subtitle,
  primary,
  secondary,
  renderLink,
  maxWidth = 1024,
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
      <YStack
        w="100%"
        maxWidth={maxWidth}
        ai="center"
        gap="$4"
        p="$8"
        br="$6"
        bw={1}
        bc="$borderColor"
      >
        <H2 ta="center" fontSize="$10" fontWeight="700" lineHeight={1.1}>
          {title}
        </H2>
        {subtitle ? (
          <Paragraph ta="center" fontSize="$5" opacity={0.8} maxWidth={560}>
            {subtitle}
          </Paragraph>
        ) : null}
        <XStack gap="$3" mt="$2" flexWrap="wrap" jc="center">
          <Link href={primary.href}>
            <Button size="$5" themeInverse>
              {primary.label}
            </Button>
          </Link>
          {secondary ? (
            <Link href={secondary.href}>
              <Button size="$5" chromeless>
                {secondary.label}
              </Button>
            </Link>
          ) : null}
        </XStack>
      </YStack>
    </YStack>
  )
}
