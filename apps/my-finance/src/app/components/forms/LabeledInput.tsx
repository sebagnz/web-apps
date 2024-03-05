import clsx from 'clsx'
import { ComponentPropsWithoutRef, ReactNode, forwardRef } from 'react'

function LabeledInput({ className, ...props }: { className?: string; children: ReactNode }) {
  return <div className={clsx('relative', 'flex', 'border rounded-md overflow-hidden', 'focus-within:ring-1', className)} {...props} />
}

function Label(
  props: ComponentPropsWithoutRef<'label'> & {
    htmlFor: NonNullable<ComponentPropsWithoutRef<'label'>['htmlFor']>
    children: NonNullable<ComponentPropsWithoutRef<'label'>['children']>
  },
) {
  return <label className={clsx('fi-input', 'inline-block', 'py-3 pl-2 pr-3', 'flex items-center')} {...props} />
}

type TextRef = HTMLInputElement
type TextProps = ComponentPropsWithoutRef<'input'>

const Text = forwardRef<TextRef, TextProps>(function TextInput({ className, ...props }, ref) {
  return <input className={clsx('fi-input', 'inline-block', 'py-3 pl-3 pr-2', 'flex flex-1', className)} {...props} ref={ref} />
})

type SelectRef = HTMLSelectElement
type SelectProps = ComponentPropsWithoutRef<'select'>

const Select = forwardRef<SelectRef, SelectProps>(function SelectInput({ className, ...props }, ref) {
  return (
    <select
      className={clsx('fi-input flex-1 text-content-tertiery text-2xl pl-3 pr-5 py-2 min-w-[60px] border-r-transparent border-r-8', className)}
      {...props}
      ref={ref}
    />
  )
})

function Option(props: ComponentPropsWithoutRef<'option'>) {
  return <option {...props} />
}

LabeledInput.Label = Label
LabeledInput.Text = Text
LabeledInput.Select = Select
LabeledInput.Option = Option

export { LabeledInput }
