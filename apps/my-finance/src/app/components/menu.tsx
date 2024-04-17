import { useRouter } from 'next/navigation'
import { ComponentPropsWithoutRef, useRef } from 'react'

import { Routes } from '@/routes'

import { ArrowLeftToBracketIcon, ArrowRightToBracketIcon, ChartLineUpIcon, ChartPieIcon, UserIcon } from '@web-apps/ui'

import { useAuth } from '@/hooks/auth'

import { Authenticated, Unauthenticated } from '@/components/auth'
import { MenuButton, Nav, NavButton, NavCloseButton, NavContainer, NavGroup, NavItem, NavLink, NavMenuDivider, useNavMenu } from '@/components/nav'

export const Menu = ({ className, ...rest }: ComponentPropsWithoutRef<'div'>) => {
  const menuAnchorRef = useRef<HTMLDivElement | null>(null)

  const { logout } = useAuth()
  const { push } = useRouter()
  const { isMenuExpanded, closeMenu, toggleMenu } = useNavMenu({ ref: menuAnchorRef })

  const handleLogout = () => {
    closeMenu()
    logout()
  }

  const handleLogin = () => {
    closeMenu()
    push(Routes.login.index)
  }

  return (
    <div ref={menuAnchorRef} className={className} {...rest}>
      <MenuButton onClick={toggleMenu} />

      <NavContainer expanded={isMenuExpanded}>
        <div className="flex items-center justify-end">
          <NavCloseButton onClick={closeMenu} />
        </div>

        <Nav>
          <NavGroup>
            <NavItem onClick={closeMenu}>
              <NavLink href={Routes.app.accounts.index}>
                <UserIcon className="text-base-accent w-[20px]" /> Accounts
              </NavLink>
            </NavItem>

            <NavItem onClick={closeMenu}>
              <NavLink href={Routes.app.expenses.index}>
                <ChartPieIcon className="text-base-accent w-[20px]" /> Expenses
              </NavLink>
            </NavItem>

            <NavItem onClick={closeMenu}>
              <NavLink href={Routes.app.savings.index}>
                <ChartLineUpIcon className="text-base-accent w-[20px] stroke-2" /> Savings
              </NavLink>
            </NavItem>
          </NavGroup>

          <NavMenuDivider />

          <NavGroup>
            <NavItem onClick={closeMenu}>
              <Authenticated>
                <NavButton onClick={handleLogout}>
                  <ArrowRightToBracketIcon className="text-base-accent w-[20px] stroke-2" />
                  Log out
                </NavButton>
              </Authenticated>

              <Unauthenticated>
                <NavButton onClick={handleLogin}>
                  <ArrowLeftToBracketIcon className="text-base-accent w-[20px] stroke-2" />
                  Log in
                </NavButton>
              </Unauthenticated>
            </NavItem>
          </NavGroup>
        </Nav>
      </NavContainer>
    </div>
  )
}
