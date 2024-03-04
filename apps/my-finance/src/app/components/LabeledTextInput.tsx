import clsx from 'clsx'
import { forwardRef } from 'react'

type LabeledTextInputRef = HTMLInputElement
type LabeledTextInputProps = React.ComponentPropsWithRef<'input'> & {
  label: string
}

export const LabeledTextInput = forwardRef<LabeledTextInputRef, LabeledTextInputProps>(function TextInput({ label, className, ...props }, ref) {
  return (
    <div className={clsx('relative', 'flex', 'border rounded-md overflow-hidden', 'focus-within:ring-1')}>
      <label className={clsx('fi-input', 'inline-block', 'py-3 pl-2 pr-3', 'flex items-center')} htmlFor={props.id}>
        {label}
      </label>
      <input className={clsx('fi-input', 'inline-block', 'py-3 pl-3 pr-2', 'flex flex-1', className)} {...props} ref={ref} />
    </div>
  )
})
