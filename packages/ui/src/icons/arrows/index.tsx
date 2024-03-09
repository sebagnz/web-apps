import clsx from 'clsx'

type arrowIconProps = {
  className?: string
  hoverable?: boolean
}

export const ArrowLeftToBracketIcon = ({ className, hoverable = false }: arrowIconProps) => (
  <svg className={clsx('w-[24px] h-[24px]', 'stroke-1', { 'hover:stroke-[1.5]': hoverable }, className)} aria-hidden fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2" />
  </svg>
)

export const ArrowRightToBracketIcon = ({ className, hoverable = false }: arrowIconProps) => (
  <svg className={clsx('w-[24px] h-[24px]', 'stroke-1', { 'hover:stroke-[1.5]': hoverable }, className)} aria-hidden fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2" />
  </svg>
)

export const ArrowRight = ({ className, hoverable = false }: arrowIconProps) => (
  <svg className={clsx('w-[24px] h-[24px]', 'stroke-1', { 'hover:stroke-[1.5]': hoverable }, className)} aria-hidden fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m14 0-4 4m4-4-4-4" />
  </svg>
)
