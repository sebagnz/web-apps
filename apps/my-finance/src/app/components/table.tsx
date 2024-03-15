import clsx from 'clsx'
import { ComponentPropsWithoutRef } from 'react'

const Table = ({ className, ...props }: ComponentPropsWithoutRef<'table'>) => {
  return <table className={clsx('table-auto rounded-lg overflow-hidden shadow-sm text-sm text-left text-content-tertiary', className)} {...props} />
}

const THead = ({ className, ...props }: ComponentPropsWithoutRef<'thead'>) => {
  return <thead className={clsx('text-xs text-content-secondary uppercase bg-gray-50', className)} {...props} />
}

const TBody = ({ className, ...props }: ComponentPropsWithoutRef<'tbody'>) => {
  return <tbody className={className} {...props} />
}

const TR = ({ className, ...props }: ComponentPropsWithoutRef<'tr'>) => {
  return <tr className={clsx('odd:bg-white even:bg-gray-50 border-b', className)} {...props} />
}

const TH = ({ className, ...props }: ComponentPropsWithoutRef<'th'>) => {
  return <th className={clsx('px-5 py-3 font-medium text-gray-900 whitespace-nowrap', className)} {...props} />
}

const TD = ({ className, ...props }: ComponentPropsWithoutRef<'td'>) => {
  return <td className={clsx('px-5 py-3', className)} {...props} />
}

export { Table, THead, TBody, TR, TH, TD }
