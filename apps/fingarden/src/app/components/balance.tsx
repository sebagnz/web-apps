import { CSSProperties, ComponentPropsWithoutRef, useRef } from 'react'
import { SwitchTransition, Transition, TransitionStatus } from 'react-transition-group'

import { SCALES, useBalances } from '@/hooks/balances'

import { CurrencyCode } from '@/domain'

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

type BalanceProps = {
  children: number
  currencyCode?: CurrencyCode
  scale?: keyof typeof SCALES
  precision?: number
}

type BalanceComponentProps = Omit<ComponentPropsWithoutRef<'p'>, keyof BalanceProps> & BalanceProps

export const Balance = ({ currencyCode, scale, precision, children, ...rest }: BalanceComponentProps) => {
  const nodeRef = useRef(null)
  const { hideable, formatBalance } = useBalances()

  const textContent = hideable(formatBalance({ value: children, currencyCode, scale, precision }))

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
            {textContent}
          </p>
        )}
      </Transition>
    </SwitchTransition>
  )
}
