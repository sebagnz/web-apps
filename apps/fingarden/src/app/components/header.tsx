import { twMerge } from 'tailwind-merge'

import { BaseHeader } from '@web-apps/ui'

import { Menu } from './menu'

export const Header = () => (
  <BaseHeader
    className={twMerge('py-2 px-4', 'justify-center items-center', 'bg-gradient-to-b from-accent-900 to-accent-900/80', 'shadow-base shadow-md')}
  >
    <div className="flex-1"></div>
    <p className="text-xl text-inverted font-light">
      <span className="font-semibold ">Fin</span>Garden
    </p>
    <div className="flex-1 relative flex items-center justify-end">
      <Menu />
    </div>
  </BaseHeader>
)
