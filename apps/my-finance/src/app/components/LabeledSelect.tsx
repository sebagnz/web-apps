import clsx from 'clsx'
import { forwardRef } from 'react'

type LabeledSelectRef = HTMLSelectElement
type LabeledSelectProps = React.ComponentPropsWithRef<'select'> & {
  label: string
}

export const LabeledSelect = forwardRef<LabeledSelectRef, LabeledSelectProps>(function TextInput({ label, className, children, ...props }, ref) {
  return (
    <div className={clsx('relative', 'flex', 'border rounded-md overflow-hidden', 'focus-within:ring-1')}>
      <label className={clsx('fi-input', 'inline-block', 'py-3 pl-2 pr-3', 'flex items-center')} htmlFor={props.id}>
        {label}
      </label>
      <select
        className={clsx('fi-input text-content-tertiery text-2xl pl-3 pr-5 py-2 min-w-[60px] border-r-transparent border-r-8', className)}
        {...props}
        ref={ref}
      >
        {children}
      </select>
    </div>
  )
})
