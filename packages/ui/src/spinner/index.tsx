import clsx from 'clsx'

export const Spinner = ({ className }: { className?: string }) => (
  <div
    className={clsx('inline-block aspect-square animate-spin rounded-full border-2 border-control-base/30 border-t-content-accent/60', className)}
  />
)
