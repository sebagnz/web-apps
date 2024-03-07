import clsx from 'clsx'

export const Button = ({ className, ...props }: React.ComponentPropsWithoutRef<'button'>) => (
  <button className={clsx('fi-control rounded-md mt-4 mx-auto px-3 py-2', className)} {...props} />
)
