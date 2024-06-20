import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ComponentPropsWithoutRef, useRef } from 'react'
import { twMerge } from 'tailwind-merge'

import { Routes } from '@/routes'

import {
  ArrowLeftToBracketIcon,
  ArrowRightToBracketIcon,
  BarsIcon,
  ChartLineUpIcon,
  CloseIcon,
  MessageIcon,
  PreferencesIcon,
  UINav,
  UserIcon,
} from '@web-apps/ui'

import { useAuth } from '@/hooks/auth'

import { Authenticated, Unauthenticated } from '@/components/auth'
import { HideBalancesSwitch } from '@/components/hide-balance-switch'
import { TransitionLink } from '@/components/transition-link'

import avatarPlaceholder from '../../../public/avatar-placeholder.png'

export const { Nav, NavContainer, NavDivider, NavGroup, NavItem, useNav } = UINav

export const Menu = ({ className, ...rest }: ComponentPropsWithoutRef<'div'>) => {
  const menuAnchorRef = useRef<HTMLDivElement | null>(null)

  const { user, logout } = useAuth()
  const { push } = useRouter()
  const { isExpanded, close, toggle } = useNav({ ref: menuAnchorRef })

  return (
    <div ref={menuAnchorRef} className={twMerge('min-h-[36px]', className)} {...rest}>
      <Authenticated>
        <AvatarImage onClick={toggle} src={user?.avatarURL || avatarPlaceholder} width={36} height={36} />
      </Authenticated>

      <Unauthenticated>
        <BarsIcon onClick={toggle} className="text-inverted w-[32px] h-[32px]" />
      </Unauthenticated>

      <NavContainer expanded={isExpanded}>
        <CloseButton onClick={close} className="ml-auto w-[32px] h-[32px]" />

        <UserInfo />

        <Nav>
          <NavGroup>
            <NavItem onClick={close}>
              <NavLink href={Routes.app.accounts.index}>
                <AccontsIcon /> Accounts
              </NavLink>
            </NavItem>

            <NavItem onClick={close}>
              <NavLink href={Routes.app.analytics.index}>
                <AnalyticsIcon /> Analytics
              </NavLink>
            </NavItem>
          </NavGroup>

          <Authenticated>
            <NavDivider />

            <NavGroup>
              <NavItem className="flex items-center gap-x-2">
                <HideBalancesSwitch id="balance-toggle" />{' '}
                <label className="cursor-pointer" htmlFor="balance-toggle">
                  Hide balances
                </label>
              </NavItem>
            </NavGroup>
          </Authenticated>

          <NavDivider />

          <NavGroup>
            <NavItem onClick={close}>
              <NavLink href={Routes.app.preferences.index}>
                <PreferencesIcon /> Preferences
              </NavLink>
            </NavItem>

            <NavItem>
              <NavExtLink href="https://insigh.to/b/fingarden" target="_blank" rel="noopener noreferrer">
                <MessageIcon /> Feedback
              </NavExtLink>
            </NavItem>

            <NavItem onClick={close}>
              <Authenticated>
                <NavButton onClick={logout}>
                  <LogoutIcon /> Log out
                </NavButton>
              </Authenticated>

              <Unauthenticated>
                <NavButton onClick={() => push(Routes.login.index)}>
                  <LoginIcon /> Log in
                </NavButton>
              </Unauthenticated>
            </NavItem>
          </NavGroup>
        </Nav>
      </NavContainer>
    </div>
  )
}

const NavLink = ({ className, ...rest }: ComponentPropsWithoutRef<typeof TransitionLink>) => {
  return <TransitionLink className={twMerge('flex items-center gap-x-2', className)} {...rest} />
}

const NavExtLink = ({ className, ...rest }: ComponentPropsWithoutRef<'a'>) => {
  return <a className={twMerge('flex items-center gap-x-2', className)} {...rest} />
}

const NavButton = ({ className, ...rest }: ComponentPropsWithoutRef<'button'>) => {
  return <button className={twMerge('flex items-center gap-x-2', className)} {...rest} />
}

const AvatarImage = ({ className, ...rest }: Omit<ComponentPropsWithoutRef<typeof Image>, 'alt'>) => (
  <Image alt="User avatar" className={twMerge('rounded-full border-2 border-white cursor-pointer', className)} {...rest} />
)

const CloseButton = ({ className, ...rest }: ComponentPropsWithoutRef<typeof CloseIcon>) => (
  <CloseIcon
    className={twMerge('sm:hidden', 'rounded-md', 'text-accent active:bg-control-accent/10 hover:bg-control-accent/10', className)}
    {...rest}
  />
)

const UserInfo = () => {
  const { user } = useAuth()

  if (!user?.name && !user?.email) return null

  return (
    <>
      <div>
        {user?.name && <p className="text-lg font-medium">{user.name}</p>}
        {user?.email && <p className="text-sm font-light">{user.email}</p>}
      </div>
      <NavDivider />
    </>
  )
}

const AccontsIcon = () => <UserIcon className="text-accent w-[20px]" />

const AnalyticsIcon = () => <ChartLineUpIcon className="text-accent w-[20px]" />

const LogoutIcon = () => <ArrowRightToBracketIcon className="text-accent w-[20px]" />

const LoginIcon = () => <ArrowLeftToBracketIcon className="text-accent w-[20px]" />
