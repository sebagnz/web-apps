import clsx from 'clsx'
import { ReactNode } from 'react'

const Table = ({ children }: { children: ReactNode }) => {
  return <table className="w-full flex flex-row flex-nowrap overflow-hidden my-5 table-fixed">{children}</table>
}

const THead = ({ children }: { children: ReactNode }) => {
  return <thead className="text-accent-content">{children}</thead>
}

const TBody = ({ children }: { children: ReactNode }) => {
  return <tbody className="flex-1 sm:flex">{children}</tbody>
}

const TR = ({ children, className }: { children: ReactNode; className?: string }) => {
  return <tr className={clsx('flex flex-col grow flex-nowrap mb-2 last:mb-0 sm:mb-0', className)}>{children}</tr>
}

const TH = ({ children, className }: { children: ReactNode; className?: string }) => {
  return <th className={clsx('bg-accent text-left p-3', className)}>{children}</th>
}

const TD = ({ children, className }: { children: ReactNode; className?: string }) => {
  return <td className={clsx('p-3 grow', className)}>{children}</td>
}

export { Table, THead, TBody, TR, TH, TD }
