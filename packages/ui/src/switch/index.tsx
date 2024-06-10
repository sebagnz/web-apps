import { ChangeEvent, ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

type SwitchProps = {
  on: boolean
  onChange: (on: boolean) => void
}

type Props = Omit<ComponentPropsWithoutRef<'input'>, keyof SwitchProps> & SwitchProps

export const Switch = ({ children, className, on, onChange, ...rest }: Props) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => onChange(e.target.checked)

  return (
    <label className="flex">
      <input type="checkbox" onChange={handleChange} checked={on} className="peer sr-only" {...rest} />
      <span
        className={twMerge(
          'relative inline-block cursor-pointer outline-0 select-none rounded-full aspect-[2/1] p-[2px]',
          'transition-all duration-500 ease-[cubic-bezier(.25,.1,.25,1)]',
          'border border-base',
          'bg-accent-muted peer-checked:bg-accent',
          'after:block after:box-content after:relative after:content-[""] after:left-0 after:w-1/2 after:aspect-square after:rounded-full',
          'after:shadow-sm after:shadow-base',
          'after:bg-base',
          'after:transition-all after:duration-300 after:ease-[cubic-bezier(.175,.885,.32,1.275)]',
          'peer-checked:after:left-1/2',
          'active:after:pr-4 peer-checked:active:after:-ml-4',
          className,
        )}
      />
    </label>
  )
}
