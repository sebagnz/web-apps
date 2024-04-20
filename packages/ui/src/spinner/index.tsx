import { twMerge } from 'tailwind-merge'

export const Spinner = ({ className }: { className?: string }) => (
  <div className={twMerge('inline-block aspect-square animate-spin rounded-full border-2 border-base/30 border-t-accent', className)} />
)
