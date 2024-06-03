import { twMerge } from 'tailwind-merge'

import { BaseHeader } from '@web-apps/ui'

import { Garden } from '@/components/garden'

import { Menu } from './menu'

export const Header = () => (
  <BaseHeader
    className={twMerge('py-2 px-4', 'justify-center items-center', 'bg-gradient-to-b from-accent-900 to-accent-900/80', 'shadow-base shadow-md')}
  >
    <div className="flex-1"></div>
    <p className="flex items-center text-2xl text-inverted">
      Fin
      <Garden height={20} className="invert" />
    </p>
    <div className="flex-1 relative flex items-center justify-end">
      <Menu />
    </div>
  </BaseHeader>
)
