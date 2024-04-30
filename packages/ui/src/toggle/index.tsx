'use client'

import { ComponentPropsWithoutRef, ReactNode, createContext, useContext, useMemo, useState } from 'react'

import { Switch } from '../switch'

type SwitchProps = ComponentPropsWithoutRef<typeof Switch>

const ToggleContext = createContext<SwitchProps | null>(null)

const useToggleContext = () => {
  const context = useContext(ToggleContext)

  if (!context) {
    throw new Error(`Toggle components cannot be rendered outside the Toggle component`)
  }

  return context
}

type ToggleProps = {
  onChange?: (on: boolean) => void
  children: ReactNode
  initial?: boolean
}

function Toggle(props: ToggleProps) {
  const [on, setOn] = useState(props.initial || false)

  const onChange = (newOn: boolean) => {
    setOn(newOn)
    if (props.onChange) props.onChange(newOn)
  }

  const value = useMemo(() => ({ on, onChange }), [on, props.onChange])

  return <ToggleContext.Provider value={value}>{props.children}</ToggleContext.Provider>
}

const On = ({ children }: { children: ReactNode }) => {
  const { on } = useToggleContext()
  return on ? children : null
}

const Off = ({ children }: { children: ReactNode }) => {
  const { on } = useToggleContext()
  return on ? null : children
}

const Lever = (props: ComponentPropsWithoutRef<'input'>) => {
  const { on, onChange } = useToggleContext()
  return <Switch {...props} on={on} onChange={onChange} />
}

Toggle.On = On
Toggle.Off = Off
Toggle.Lever = Lever

export default Toggle
