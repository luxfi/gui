import * as React from 'react'
import { XStack, YStack, H2, Paragraph, Button } from '@hanzo/gui'
import type { LuxLinkRenderer } from '../header/Header'

export type LuxCtaAction = {
  label: string
  href: string
}

export type LuxCtaProps = {
  title: React.ReactNode
  subtitle?: React.ReactNode
  primary: LuxCtaAction
  secondary?: LuxCtaAction
  renderLink?: LuxLinkRenderer
}

const DefaultLink: LuxLinkRenderer = ({ href, children }) => (
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
}) => {
  const Link = renderLink ?? DefaultLink
  return (
    <YStack bg="$background" px="$6" py="$12" $gtMd={{ py: '$20' }}>
      <YStack
        maxWidth={896}
        width="100%"
        mx="auto"
        items="center"
        gap="$4"
        p="$8"
        borderRadius="$10"
        borderWidth={1}
        borderColor="rgba(255,255,255,0.1)"
      >
        <H2
          color="$color"
          textAlign="center"
          fontWeight="700"
          fontSize={32}
          lineHeight={38}
          $gtMd={{ fontSize: 48, lineHeight: 56 }}
        >
          {title}
        </H2>
        {subtitle ? (
          <Paragraph
            textAlign="center"
            fontSize={18}
            color="rgba(255,255,255,0.8)"
            maxWidth={576}
          >
            {subtitle}
          </Paragraph>
        ) : null}
        <XStack flexWrap="wrap" gap="$3" mt="$2" justify="center">
          <Link href={primary.href}>
            <Button size="$5" bg="$color" color="$background" borderRadius="$6">
              {primary.label}
            </Button>
          </Link>
          {secondary ? (
            <Link href={secondary.href}>
              <Button
                size="$5"
                chromeless
                borderWidth={1}
                borderColor="rgba(255,255,255,0.2)"
                color="$color"
                borderRadius="$6"
              >
                {secondary.label}
              </Button>
            </Link>
          ) : null}
        </XStack>
      </YStack>
    </YStack>
  )
}
