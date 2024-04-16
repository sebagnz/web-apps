import clsx from 'clsx'

type CloseIconProps = {
  className?: string
  hoverable?: boolean
}

export const CloseIcon = ({ className, hoverable = false }: CloseIconProps) => (
  <svg className={clsx('w-[24px] h-[24px]', 'stroke-1', { 'hover:stroke-[1.5]': hoverable }, className)} aria-hidden fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6m0 12L6 6" />
  </svg>
)
