import * as React from 'react'
import { XStack, YStack, Text, Separator } from '@hanzo/gui'
import { LUX_PRODUCTS } from '../nav/products'
import type { LuxLinkRenderer } from '../header/Header'

export type LuxFooterProps = {
  renderLink?: LuxLinkRenderer
  legalEntity?: string
  year?: number
  topSlot?: React.ReactNode
}

const DefaultLink: LuxLinkRenderer = ({ href, children }) => (
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
      bg="$background"
      borderTopWidth={1}
      borderColor="rgba(255,255,255,0.1)"
      px="$4"
      py="$10"
      $gtSm={{ px: '$6', py: '$12' }}
    >
      <YStack maxWidth={1280} width="100%" mx="auto" gap="$8">
        {topSlot}

        <XStack flexWrap="wrap" gap="$6" $gtSm={{ gap: '$8' }}>
          {LUX_PRODUCTS.map((section) => (
            <YStack
              key={section.section}
              gap="$3"
              flex={1}
              minWidth={200}
            >
              <Text
                color="rgba(255,255,255,0.5)"
                fontSize={11}
                letterSpacing={2}
                textTransform="uppercase"
              >
                {section.section}
              </Text>
              <YStack gap="$2">
                {section.items.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <Text
                      fontSize={14}
                      color="rgba(255,255,255,0.8)"
                      hoverStyle={{ color: '$color' }}
                    >
                      {item.name}
                    </Text>
                  </Link>
                ))}
              </YStack>
            </YStack>
          ))}
        </XStack>

        <Separator />

        <YStack
          gap="$3"
          $gtMd={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text fontSize={12} color="rgba(255,255,255,0.6)">
            &copy; {displayYear} {legalEntity}. All rights reserved.
          </Text>
          <XStack gap="$4" $gtSm={{ gap: '$6' }}>
            <Link href="https://lux.network/terms">
              <Text
                fontSize={12}
                color="rgba(255,255,255,0.6)"
                hoverStyle={{ color: '$color' }}
              >
                Terms
              </Text>
            </Link>
            <Link href="https://lux.network/privacy">
              <Text
                fontSize={12}
                color="rgba(255,255,255,0.6)"
                hoverStyle={{ color: '$color' }}
              >
                Privacy
              </Text>
            </Link>
            <Link href="https://status.lux.network">
              <Text
                fontSize={12}
                color="rgba(255,255,255,0.6)"
                hoverStyle={{ color: '$color' }}
              >
                Status
              </Text>
            </Link>
          </XStack>
        </YStack>
      </YStack>
    </YStack>
  )
}
