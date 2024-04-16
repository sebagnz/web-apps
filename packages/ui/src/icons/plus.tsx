import clsx from 'clsx'

type PlusIconProps = {
  className?: string
  hoverable?: boolean
}

export const PlusIcon = ({ className, hoverable = false }: PlusIconProps) => (
  <svg className={clsx('w-[24px] h-[24px]', 'stroke-1', { 'hover:stroke-[1.5]': hoverable }, className)} aria-hidden fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M12 7.8v8.4M7.8 12h8.4m4.8 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
)
