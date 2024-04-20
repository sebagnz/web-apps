import { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

const Table = ({ className, ...props }: ComponentPropsWithoutRef<'table'>) => {
  return (
    <table
      className={twMerge('table-auto border border-base rounded-lg overflow-hidden shadow-base shadow-sm text-sm text-left', className)}
      {...props}
    />
  )
}

const THead = ({ className, ...props }: ComponentPropsWithoutRef<'thead'>) => {
  return <thead className={twMerge('text-xs uppercase bg-base', className)} {...props} />
}

const TBody = ({ className, ...props }: ComponentPropsWithoutRef<'tbody'>) => {
  return <tbody className={className} {...props} />
}

const TR = ({ className, ...props }: ComponentPropsWithoutRef<'tr'>) => {
  return <tr className={twMerge('odd:bg-base even:bg-muted/20 border-b border-base', className)} {...props} />
}

const TH = ({ className, ...props }: ComponentPropsWithoutRef<'th'>) => {
  return <th className={twMerge('px-5 py-3 font-medium whitespace-nowrap', className)} {...props} />
}

const TD = ({ className, ...props }: ComponentPropsWithoutRef<'td'>) => {
  return <td className={twMerge('px-5 py-3', className)} {...props} />
}

export const UITable = { Table, THead, TBody, TR, TH, TD }
