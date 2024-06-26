import { ComponentPropsWithoutRef, ReactNode, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

function LabeledInput({ className, ...props }: { className?: string; children: ReactNode }) {
  return <div className={twMerge('flex', 'py-1', 'border border-base/50 rounded-md', 'focus-within:ring-1', className)} {...props} />
}

function Label({
  className,
  ...rest
}: ComponentPropsWithoutRef<'label'> & {
  htmlFor: NonNullable<ComponentPropsWithoutRef<'label'>['htmlFor']>
  children: NonNullable<ComponentPropsWithoutRef<'label'>['children']>
}) {
  return <label className={twMerge('my-auto px-2', className)} {...rest} />
}

type TextRef = HTMLInputElement
type TextProps = ComponentPropsWithoutRef<'input'>

const Input = forwardRef<TextRef, TextProps>(function TextInput({ className, ...props }, ref) {
  return <input className={twMerge('flex-1', 'p-2', 'rounded-l-none', 'bg-transparent', className)} {...props} ref={ref} />
})

type SelectRef = HTMLSelectElement
type SelectProps = ComponentPropsWithoutRef<'select'>

const Select = forwardRef<SelectRef, SelectProps>(function SelectInput({ className, ...props }, ref) {
  return (
    <select
      className={twMerge(
        'flex-1',
        'pr-1',
        'border-r-8 border-r-transparent rounded-l-none focus:outline-none',
        'bg-transparent',
        'cursor-pointer',
        className,
      )}
      {...props}
      ref={ref}
    />
  )
})

function Option(props: ComponentPropsWithoutRef<'option'>) {
  return <option {...props} />
}

LabeledInput.Label = Label
LabeledInput.Input = Input
LabeledInput.Select = Select
LabeledInput.Option = Option

export { LabeledInput }
