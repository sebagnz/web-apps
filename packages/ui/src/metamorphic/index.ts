export type DistributiveOmit<T, TOmitted extends PropertyKey> = T extends any ? Omit<T, TOmitted> : never

export type Metamorphic<TDetault extends React.ElementType, TProps> = <TAs extends React.ElementType>(
  props: { as?: TAs } & DistributiveOmit<React.ComponentPropsWithoutRef<React.ElementType extends TAs ? TDetault : TAs>, 'as'> & TProps,
) => React.ReactElement
