import * as React from 'react'
import { XStack, YStack, Text, Separator } from '@hanzo/gui'
import { LUX_PRODUCTS } from '../nav/products'

export type LuxFooterProps = {
  renderLink?: (props: {
    href: string
    children: React.ReactNode
  }) => React.ReactNode
  /**
   * Legal entity shown in the copyright line.
   * Default: "Lux Industries Inc."
   */
  legalEntity?: string
  /**
   * Override the copyright year. Defaults to current UTC year at render.
   */
  year?: number
  /**
   * Extra rows (newsletter, social icons) rendered above the columns.
   */
  topSlot?: React.ReactNode
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

export const LuxFooter: React.FC<LuxFooterProps> = ({
  renderLink,
  legalEntity = 'Lux Industries Inc.',
  year,
  topSlot,
}) => {
  const Link = renderLink ?? DefaultLink
  const displayYear = year ?? new Date().getUTCFullYear()

  return (
    <YStack
      tag="footer"
      role="contentinfo"
      px="$4"
      py="$8"
      gap="$6"
      bg="$background"
      btc="$borderColor"
      btw={1}
    >
      {topSlot}

      <XStack
        gap="$8"
        flexWrap="wrap"
        $sm={{ flexDirection: 'column', gap: '$6' }}
      >
        {LUX_PRODUCTS.map((section) => (
          <YStack key={section.section} gap="$2" minWidth={160}>
            <Text
              fontSize="$2"
              opacity={0.5}
              textTransform="uppercase"
              letterSpacing={1}
            >
              {section.section}
            </Text>
            <YStack gap="$1">
              {section.items.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Text fontSize="$3" opacity={0.85}>
                    {item.name}
                  </Text>
                </Link>
              ))}
            </YStack>
          </YStack>
        ))}
      </XStack>

      <Separator />

      <XStack
        jc="space-between"
        ai="center"
        $sm={{ flexDirection: 'column', gap: '$2' }}
      >
        <Text fontSize="$2" opacity={0.6}>
          {'© '}
          {displayYear} {legalEntity}. All rights reserved.
        </Text>
        <XStack gap="$4">
          <Link href="https://lux.network/terms">
            <Text fontSize="$2" opacity={0.6}>
              Terms
            </Text>
          </Link>
          <Link href="https://lux.network/privacy">
            <Text fontSize="$2" opacity={0.6}>
              Privacy
            </Text>
          </Link>
          <Link href="https://status.lux.network">
            <Text fontSize="$2" opacity={0.6}>
              Status
            </Text>
          </Link>
        </XStack>
      </XStack>
    </YStack>
  )
}
