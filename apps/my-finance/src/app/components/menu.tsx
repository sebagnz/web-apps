import clsx from 'clsx'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ComponentPropsWithoutRef, useRef } from 'react'

import { Routes } from '@/routes'

import { ArrowLeftToBracketIcon, ArrowRightToBracketIcon, BarsIcon, ChartLineUpIcon, ChartPieIcon, CloseIcon, UserIcon } from '@web-apps/ui'

import { useAuth } from '@/hooks/auth'

import { Authenticated, Unauthenticated } from '@/components/auth'
import { Nav, NavButton, NavContainer, NavGroup, NavItem, NavLink, NavMenuDivider, useNavMenu } from '@/components/nav'

import avatarPlaceholder from '../../../public/avatar-placeholder.png'

export const Menu = ({ className, ...rest }: ComponentPropsWithoutRef<'div'>) => {
  const menuAnchorRef = useRef<HTMLDivElement | null>(null)

  const { user, logout } = useAuth()
  const { push } = useRouter()
  const { isMenuExpanded, closeMenu, toggleMenu } = useNavMenu({ ref: menuAnchorRef })

  return (
    <div ref={menuAnchorRef} className={clsx('min-h-[36px]', className)} {...rest}>
      <Authenticated>
        <AvatarImage onClick={toggleMenu} src={user?.avatarURL || avatarPlaceholder} width={36} height={36} />
      </Authenticated>

      <Unauthenticated>
        <BarsIcon onClick={toggleMenu} className="w-[32px] h-[32px]" />
      </Unauthenticated>

      <NavContainer expanded={isMenuExpanded}>
        <CloseButton onClick={closeMenu} className="ml-auto w-[32px] h-[32px]" />

        <UserInfo />

        <NavMenuDivider />

        <Nav>
          <NavGroup>
            <NavItem onClick={closeMenu}>
              <NavLink href={Routes.app.accounts.index}>
                <AccontsIcon /> Accounts
              </NavLink>
            </NavItem>

            <NavItem onClick={closeMenu}>
              <NavLink href={Routes.app.expenses.index}>
                <ExpensesIcon /> Expenses
              </NavLink>
            </NavItem>

            <NavItem onClick={closeMenu}>
              <NavLink href={Routes.app.savings.index}>
                <SavingsIcon /> Savings
              </NavLink>
            </NavItem>
          </NavGroup>

          <NavMenuDivider />

          <NavGroup>
            <NavItem onClick={closeMenu}>
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

const AvatarImage = ({ className, ...rest }: Omit<ComponentPropsWithoutRef<typeof Image>, 'alt'>) => (
  <Image alt="User avatar" className={clsx('rounded-full border-2 border-content-accent', className)} {...rest} />
)

const CloseButton = ({ className, ...rest }: ComponentPropsWithoutRef<typeof CloseIcon>) => (
  <CloseIcon
    className={clsx('sm:hidden', 'rounded-md', 'text-base-accent active:bg-control-accent/10 hover:bg-control-accent/10', className)}
    {...rest}
  />
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

const AccontsIcon = () => <UserIcon className="text-base-accent w-[20px] stroke-2" />

const ExpensesIcon = () => <ChartPieIcon className="text-base-accent w-[20px] stroke-2" />

const SavingsIcon = () => <ChartLineUpIcon className="text-base-accent w-[20px] stroke-2" />

const LogoutIcon = () => <ArrowRightToBracketIcon className="text-base-accent w-[20px] stroke-2" />

const LoginIcon = () => <ArrowLeftToBracketIcon className="text-base-accent w-[20px] stroke-2" />
