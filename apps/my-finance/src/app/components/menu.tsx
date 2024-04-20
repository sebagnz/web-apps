import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ComponentPropsWithoutRef, useRef } from 'react'

import { Routes } from '@/routes'

import { ArrowLeftToBracketIcon, ArrowRightToBracketIcon, BarsIcon, ChartLineUpIcon, ChartPieIcon, CloseIcon, UserIcon } from '@web-apps/ui'

import { useAuth } from '@/hooks/auth'

import { Authenticated, Unauthenticated } from '@/components/auth'
import { Nav, NavContainer, NavDivider, NavGroup, NavItem, useNav } from '@/components/nav'

import avatarPlaceholder from '../../../public/avatar-placeholder.png'

export const Menu = ({ className, ...rest }: ComponentPropsWithoutRef<'div'>) => {
  const menuAnchorRef = useRef<HTMLDivElement | null>(null)

  const { user, logout } = useAuth()
  const { push } = useRouter()
  const { isExpanded, close, toggle } = useNav({ ref: menuAnchorRef })

  return (
    <div ref={menuAnchorRef} className={clsx('min-h-[36px]', className)} {...rest}>
      <Authenticated>
        <AvatarImage onClick={toggle} src={user?.avatarURL || avatarPlaceholder} width={36} height={36} />
      </Authenticated>

      <Unauthenticated>
        <BarsIcon onClick={toggle} className="text-inverted w-[32px] h-[32px]" />
      </Unauthenticated>

      <NavContainer expanded={isExpanded}>
        <CloseButton onClick={close} className="ml-auto w-[32px] h-[32px]" />

        <UserInfo />

        <NavDivider />

        <Nav>
          <NavGroup>
            <NavItem onClick={close}>
              <NavLink href={Routes.app.accounts.index}>
                <AccontsIcon /> Accounts
              </NavLink>
            </NavItem>

            <NavItem onClick={close}>
              <NavLink href={Routes.app.expenses.index}>
                <ExpensesIcon /> Expenses
              </NavLink>
            </NavItem>

            <NavItem onClick={close}>
              <NavLink href={Routes.app.savings.index}>
                <SavingsIcon /> Savings
              </NavLink>
            </NavItem>
          </NavGroup>

          <NavDivider />

          <NavGroup>
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

const NavLink = ({ className, ...rest }: ComponentPropsWithoutRef<typeof Link>) => {
  return <Link className={clsx('flex items-center gap-x-2', className)} {...rest} />
}

const NavButton = ({ className, ...rest }: ComponentPropsWithoutRef<'button'>) => {
  return <button className={clsx('flex items-center gap-x-2', className)} {...rest} />
}

const AvatarImage = ({ className, ...rest }: Omit<ComponentPropsWithoutRef<typeof Image>, 'alt'>) => (
  <Image alt="User avatar" className={clsx('rounded-full border-2 border-white cursor-pointer', className)} {...rest} />
)

const CloseButton = ({ className, ...rest }: ComponentPropsWithoutRef<typeof CloseIcon>) => (
  <CloseIcon className={clsx('sm:hidden', 'rounded-md', 'text-accent active:bg-control-accent/10 hover:bg-control-accent/10', className)} {...rest} />
)

const UserInfo = () => {
  const { user } = useAuth()

  if (!user?.name && !user?.email) return null

  return (
    <div>
      {user?.name && <p className="text-lg font-medium">{user.name}</p>}
      {user?.email && <p className="text-sm font-light">{user.email}</p>}
    </div>
  )
}

const AccontsIcon = () => <UserIcon className="text-accent w-[20px]" />

const ExpensesIcon = () => <ChartPieIcon className="text-accent w-[20px]" />

const SavingsIcon = () => <ChartLineUpIcon className="text-accent w-[20px]" />

const LogoutIcon = () => <ArrowRightToBracketIcon className="text-accent w-[20px]" />

const LoginIcon = () => <ArrowLeftToBracketIcon className="text-accent w-[20px]" />