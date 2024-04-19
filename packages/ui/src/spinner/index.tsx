import clsx from 'clsx'

export const Spinner = ({ className }: { className?: string }) => (
  <div className={clsx('inline-block aspect-square animate-spin rounded-full border-2 border-base/30 border-t-accent', className)} />
)
