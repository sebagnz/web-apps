import clsx from 'clsx'
import { ComponentPropsWithoutRef } from 'react'

const Table = ({ className, ...props }: ComponentPropsWithoutRef<'table'>) => {
  return (
    <table
      className={clsx('table-auto border border-base rounded-lg overflow-hidden shadow-base shadow-sm text-sm text-left', className)}
      {...props}
    />
  )
}

const THead = ({ className, ...props }: ComponentPropsWithoutRef<'thead'>) => {
  return <thead className={clsx('text-xs uppercase bg-base', className)} {...props} />
}

const TBody = ({ className, ...props }: ComponentPropsWithoutRef<'tbody'>) => {
  return <tbody className={className} {...props} />
}

const TR = ({ className, ...props }: ComponentPropsWithoutRef<'tr'>) => {
  return <tr className={clsx('odd:bg-base even:bg-muted/20 border-b border-base', className)} {...props} />
}

const TH = ({ className, ...props }: ComponentPropsWithoutRef<'th'>) => {
  return <th className={clsx('px-5 py-3 font-medium whitespace-nowrap', className)} {...props} />
}

const TD = ({ className, ...props }: ComponentPropsWithoutRef<'td'>) => {
  return <td className={clsx('px-5 py-3', className)} {...props} />
}

export { Table, THead, TBody, TR, TH, TD }
