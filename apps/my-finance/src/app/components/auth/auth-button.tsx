import clsx from 'clsx'
import { useRouter } from 'next/navigation'

import { ArrowLeftToBracketIcon, ArrowRightToBracketIcon } from '@web-apps/ui'

import { useAuth } from '@/hooks/auth'

import { Authenticated, Unauthenticated } from '@/components/auth/authentication'

export const AuthButton = ({ className }: { className?: string }) => {
  const { logout } = useAuth()
  const { push } = useRouter()

  const pushLogin = () => push('/login')

  return (
    <>
      <Authenticated>
        <button className={clsx('flex items-center gap-x-1 text-sm text-content-secondary', className)} onClick={logout}>
          <span>Log out</span>
          <ArrowRightToBracketIcon className="relative top-[1px] w-[20px] h-[20px]" />
        </button>
      </Authenticated>
      <Unauthenticated>
        <button className={clsx('flex items-center gap-x-1 text-sm text-content-secondary', className)} onClick={pushLogin}>
          <span>Log in</span>
          <ArrowLeftToBracketIcon className="relative top-[1px] w-[20px] h-[20px]" />
        </button>
      </Unauthenticated>
    </>
  )
}
