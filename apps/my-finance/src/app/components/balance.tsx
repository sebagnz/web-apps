import { CSSProperties, ComponentPropsWithoutRef, useRef } from 'react'
import { SwitchTransition, Transition, TransitionStatus } from 'react-transition-group'

import { usePreferences } from '@/hooks/preferences'

const Currency = { EUR: '€', USD: '$' } as const

type CurrencyType = typeof Currency

type BalanceProps = { currency?: keyof CurrencyType; children: number | string }

type Props = Omit<ComponentPropsWithoutRef<'p'>, keyof BalanceProps> & BalanceProps

const duration = 100

const initialStyle = {
  transition: `all ${duration}ms ease`,
  opacity: 1,
  scale: 1,
}

const transitionStyles: Record<TransitionStatus, CSSProperties> = {
  entering: { scale: 1, opacity: 1 },
  entered: { scale: 1, opacity: 1 },
  exiting: { scale: 0.7, opacity: 0.7 },
  exited: { scale: 0.7, opacity: 0.7 },
  unmounted: { scale: 0.7, opacity: 0.7 },
}

export const Balance = ({ currency = 'EUR', children, ...rest }: Props) => {
  const nodeRef = useRef(null)

  const { preferences } = usePreferences()

  if (!preferences) return null

  const textContent = preferences.hideBalances ? '••••••' : children.toLocaleString()

  return (
    <SwitchTransition>
      <Transition nodeRef={nodeRef} key={textContent} timeout={duration} unmountOnExit>
        {(state) => (
          <p
            {...rest}
            ref={nodeRef}
            style={{
              ...initialStyle,
              ...transitionStyles[state],
            }}
          >
            {Currency[currency]} {textContent}
          </p>
        )}
      </Transition>
    </SwitchTransition>
  )
}
