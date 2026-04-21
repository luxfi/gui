'use client'
import * as React from 'react'
import {
  XStack,
  YStack,
  Text,
  Button,
  Popover,
  Separator,
  Adapt,
  Sheet,
} from '@hanzo/gui'
import {
  LUX_PRIMARY_LINKS,
  LUX_PRODUCTS,
  LUX_VARIANT_HREF,
  type LuxVariant,
} from '../nav/products'

export type LuxLinkRenderer = (props: {
  href: string
  children: React.ReactNode
}) => React.ReactNode

export type LuxHeaderProps = {
  variant?: LuxVariant
  /**
   * Render function for links. Override to use a framework Link (Next, Remix).
   */
  renderLink?: LuxLinkRenderer
  actions?: React.ReactNode
  label?: string
  /** Optional brand mark override (e.g. custom SVG logo). */
  brandMark?: React.ReactNode
}

const DefaultLink: LuxLinkRenderer = ({ href, children }) => (
  <a href={href} style={{ textDecoration: 'none', color: 'inherit' }}>
    {children}
  </a>
)

const variantLabel = (variant: LuxVariant): string => {
  if (variant === 'default') return ''
  if (variant === 'id') return 'ID'
  return variant.charAt(0).toUpperCase() + variant.slice(1)
}

const LuxMark: React.FC = () => (
  <XStack
    width={24}
    height={24}
    borderRadius="$3"
    bg="$color"
    items="center"
    justify="center"
  >
    <Text color="$background" fontSize={14} fontWeight="700" lineHeight={14}>
      L
    </Text>
  </XStack>
)

export const LuxHeader: React.FC<LuxHeaderProps> = ({
  variant = 'default',
  renderLink,
  actions,
  label,
  brandMark,
}) => {
  const Link = renderLink ?? DefaultLink
  const suffix = label ?? variantLabel(variant)
  const activeHref = LUX_VARIANT_HREF[variant]
  const [open, setOpen] = React.useState(false)

  return (
    <XStack
      position="fixed"
      t={0}
      l={0}
      r={0}
      z={50}
      bg="rgba(0,0,0,0.8)"
      borderBottomWidth={1}
      borderColor="rgba(255,255,255,0.1)"
      items="center"
      justify="space-between"
      gap="$4"
      px="$4"
      py="$3"
      $gtSm={{ px: '$6', py: '$4' }}
    >
      <Link href={activeHref}>
        <XStack items="center" gap="$2" flexShrink={0}>
          {brandMark ?? <LuxMark />}
          <Text
            color="$color"
            fontSize={20}
            fontWeight="700"
            letterSpacing={1}
            whiteSpace="nowrap"
          >
            Lux{suffix ? ` ${suffix}` : ''}
          </Text>
        </XStack>
      </Link>

      <XStack
        display="none"
        gap="$6"
        flex={1}
        justify="center"
        $gtLg={{ display: 'flex' }}
      >
        {LUX_PRIMARY_LINKS.map((item) => {
          const isActive = item.href === activeHref
          return (
            <Link key={item.href} href={item.href}>
              <Text
                color={isActive ? '$color' : 'rgba(255,255,255,0.7)'}
                fontSize={14}
                fontWeight={isActive ? '600' : '400'}
                hoverStyle={{ color: '$color' }}
              >
                {item.name}
              </Text>
            </Link>
          )
        })}
      </XStack>

      <XStack items="center" gap="$2" flexShrink={0} $gtSm={{ gap: '$3' }}>
        {actions}
        <XStack $gtLg={{ display: 'none' }}>
          <Popover open={open} onOpenChange={setOpen} placement="bottom-end">
            <Popover.Trigger asChild>
              <Button
                size="$3"
                circular
                chromeless
                aria-label={open ? 'Close menu' : 'Open menu'}
              >
                <HamburgerIcon open={open} />
              </Button>
            </Popover.Trigger>

            <Adapt when="maxMd" platform="touch">
              <Sheet modal dismissOnSnapToBottom snapPointsMode="fit">
                <Sheet.Frame padding="$4" bg="$background">
                  <Adapt.Contents />
                </Sheet.Frame>
                <Sheet.Overlay bg="rgba(0,0,0,0.5)" />
              </Sheet>
            </Adapt>

            <Popover.Content
              bg="$background"
              borderWidth={1}
              borderColor="rgba(255,255,255,0.1)"
              p="$4"
              maxWidth={360}
              enterStyle={{ y: -10, opacity: 0 }}
              exitStyle={{ y: -10, opacity: 0 }}
              animation="quick"
            >
              <LuxMobileMenu
                activeHref={activeHref}
                renderLink={renderLink}
                onNavigate={() => setOpen(false)}
              />
            </Popover.Content>
          </Popover>
        </XStack>
      </XStack>
    </XStack>
  )
}

const HamburgerIcon: React.FC<{ open: boolean }> = ({ open }) => (
  <svg
    width={22}
    height={22}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
  >
    {open ? (
      <>
        <line x1={6} y1={6} x2={18} y2={18} />
        <line x1={18} y1={6} x2={6} y2={18} />
      </>
    ) : (
      <>
        <line x1={4} y1={7} x2={20} y2={7} />
        <line x1={4} y1={12} x2={20} y2={12} />
        <line x1={4} y1={17} x2={20} y2={17} />
      </>
    )}
  </svg>
)

const LuxMobileMenu: React.FC<{
  activeHref: string
  renderLink?: LuxLinkRenderer
  onNavigate: () => void
}> = ({ activeHref, renderLink, onNavigate }) => {
  const Link = renderLink ?? DefaultLink
  return (
    <YStack gap="$4" maxHeight={480}>
      {LUX_PRODUCTS.map((section, idx) => (
        <YStack key={section.section} gap="$2">
          {idx > 0 ? <Separator /> : null}
          <Text
            color="rgba(255,255,255,0.5)"
            fontSize={11}
            letterSpacing={2}
            textTransform="uppercase"
          >
            {section.section}
          </Text>
          <YStack>
            {section.items.map((item) => {
              const isActive = item.href === activeHref
              return (
                <Link key={item.href} href={item.href}>
                  <Text
                    py="$2"
                    fontSize={14}
                    color={isActive ? '$color' : 'rgba(255,255,255,0.75)'}
                    fontWeight={isActive ? '600' : '400'}
                    hoverStyle={{ color: '$color' }}
                    onPress={onNavigate}
                  >
                    {item.name}
                  </Text>
                </Link>
              )
            })}
          </YStack>
        </YStack>
      ))}
    </YStack>
  )
}

export type LuxProductMenuProps = {
  renderLink?: LuxLinkRenderer
}

export const LuxProductMenu: React.FC<LuxProductMenuProps> = ({
  renderLink,
}) => {
  const Link = renderLink ?? DefaultLink
  return (
    <XStack
      flexWrap="wrap"
      gap="$4"
      p="$4"
      bg="$background"
      borderRadius="$6"
      borderWidth={1}
      borderColor="rgba(255,255,255,0.1)"
    >
      {LUX_PRODUCTS.map((section) => (
        <YStack key={section.section} gap="$2" minWidth={192} flex={1}>
          <Text
            color="rgba(255,255,255,0.5)"
            fontSize={11}
            letterSpacing={2}
            textTransform="uppercase"
          >
            {section.section}
          </Text>
          <YStack gap="$1">
            {section.items.map((item) => (
              <Link key={item.href} href={item.href}>
                <YStack hoverStyle={{ opacity: 0.85 }}>
                  <Text fontSize={14} fontWeight="500" color="$color">
                    {item.name}
                  </Text>
                  {item.desc ? (
                    <Text fontSize={11} color="rgba(255,255,255,0.4)">
                      {item.desc}
                    </Text>
                  ) : null}
                </YStack>
              </Link>
            ))}
          </YStack>
        </YStack>
      ))}
    </XStack>
  )
}
