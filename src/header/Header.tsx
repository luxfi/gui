import * as React from 'react'
import { XStack, YStack, Text } from '@hanzo/gui'
import {
  LUX_PRIMARY_LINKS,
  LUX_PRODUCTS,
  LUX_VARIANT_HREF,
  type LuxVariant,
} from '../nav/products'

export type LuxHeaderProps = {
  /**
   * Highlights the active product in nav + sets wordmark brand suffix.
   * e.g. `variant="exchange"` -> "Lux Exchange".
   */
  variant?: LuxVariant
  /**
   * Render prop for the home / brand link. Lets apps use their router
   * (next/link, @tanstack/react-router, etc) without pulling a router
   * dependency into this package.
   */
  renderLink?: (props: {
    href: string
    children: React.ReactNode
  }) => React.ReactNode
  /**
   * Optional action slot rendered at the far right. Common uses:
   * wallet connect button, sign-in button, theme toggle.
   */
  actions?: React.ReactNode
  /**
   * Optional explicit label. Defaults to the variant name (title-cased).
   */
  label?: string
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

const variantLabel = (variant: LuxVariant): string => {
  if (variant === 'default') return ''
  if (variant === 'id') return 'ID'
  return variant.charAt(0).toUpperCase() + variant.slice(1)
}

export const LuxHeader: React.FC<LuxHeaderProps> = ({
  variant = 'default',
  renderLink,
  actions,
  label,
}) => {
  const Link = renderLink ?? DefaultLink
  const suffix = label ?? variantLabel(variant)

  return (
    <XStack
      tag="header"
      role="banner"
      ai="center"
      jc="space-between"
      px="$4"
      py="$3"
      bg="$background"
      bbc="$borderColor"
      bbw={1}
    >
      <XStack ai="center" gap="$3">
        <Link href={LUX_VARIANT_HREF[variant]}>
          <XStack ai="center" gap="$2">
            <LuxMark />
            <Text fontWeight="700" fontSize="$5">
              Lux{suffix ? ` ${suffix}` : ''}
            </Text>
          </XStack>
        </Link>
      </XStack>

      <XStack ai="center" gap="$4" display="none" $gtSm={{ display: 'flex' }}>
        {LUX_PRIMARY_LINKS.map((item) => (
          <Link key={item.href} href={item.href}>
            <Text
              fontSize="$3"
              opacity={item.href === LUX_VARIANT_HREF[variant] ? 1 : 0.7}
              fontWeight={
                item.href === LUX_VARIANT_HREF[variant] ? '600' : '500'
              }
            >
              {item.name}
            </Text>
          </Link>
        ))}
      </XStack>

      <XStack ai="center" gap="$2">
        {actions}
      </XStack>
    </XStack>
  )
}

// Simple square "Lux" mark. Apps can override by passing their own
// branded component via composition.
const LuxMark: React.FC = () => (
  <YStack
    w={24}
    h={24}
    br="$2"
    bg="$color"
    ai="center"
    jc="center"
  >
    <Text color="$background" fontWeight="700" fontSize={14}>
      L
    </Text>
  </YStack>
)

/**
 * Compound dropdown mega-menu (desktop). Kept as named export so apps
 * can pull it in without the whole header if they build custom chrome.
 */
export const LuxProductMenu: React.FC<{
  renderLink?: LuxHeaderProps['renderLink']
}> = ({ renderLink }) => {
  const Link = renderLink ?? DefaultLink
  return (
    <YStack gap="$4" p="$4" bg="$background" br="$4" bw={1} bc="$borderColor">
      {LUX_PRODUCTS.map((section) => (
        <YStack key={section.section} gap="$2">
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
                <YStack gap="$1" py="$1">
                  <Text fontWeight="600">{item.name}</Text>
                  {item.desc ? (
                    <Text fontSize="$2" opacity={0.6}>
                      {item.desc}
                    </Text>
                  ) : null}
                </YStack>
              </Link>
            ))}
          </YStack>
        </YStack>
      ))}
    </YStack>
  )
}
