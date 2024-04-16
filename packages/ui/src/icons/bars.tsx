import clsx from 'clsx'

type BarsIconProps = {
  className?: string
  hoverable?: boolean
}

export const BarsIcon = ({ className, hoverable = false }: BarsIconProps) => (
  <svg className={clsx('w-[24px] h-[24px]', 'stroke-1', { 'hover:stroke-[1.5]': hoverable }, className)} aria-hidden fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h14" />
  </svg>
)
