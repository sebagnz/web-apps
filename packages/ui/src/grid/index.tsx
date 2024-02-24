import clsx, { ClassValue } from 'clsx'
import { HTMLAttributes } from 'react'

type Cols = 1 | 2 | 4 | 6 | 12
type Size = 'none' | 'sm' | 'md' | 'lg'
type Breakpoint = 'sm' | 'md' | 'lg'

type SizeByBreakpoint = {
  [K in Breakpoint]?: Size
}

type GridProps = HTMLAttributes<HTMLDivElement> & {
  columns?: Cols
  spacing?: SizeByBreakpoint
  rowSpacing?: SizeByBreakpoint
  columnSpacing?: SizeByBreakpoint
}

const DEFAULT_SPACING: SizeByBreakpoint = {
  sm: undefined,
  md: undefined,
  lg: undefined,
}

export const Grid = ({
  columns = 12,
  spacing = DEFAULT_SPACING,
  rowSpacing = DEFAULT_SPACING,
  columnSpacing = DEFAULT_SPACING,
  className,
  children,
}: GridProps) => {
  const classNames: Array<ClassValue> = ['grid']

  /**
   * Columns
   */
  if (columns === 12) classNames.push(`grid-cols-12`)
  else if (columns === 6) classNames.push(`grid-cols-6`)
  else if (columns === 4) classNames.push(`grid-cols-4`)
  else if (columns === 2) classNames.push(`grid-cols-2`)
  else if (columns === 1) classNames.push(`grid-cols-1`)

  /**
   * Spacing
   */
  if (!spacing.sm) classNames.push()
  else if (spacing.sm === 'none') classNames.push(`gap-0`)
  else if (spacing.sm === 'sm') classNames.push(`gap-4`)
  else if (spacing.sm === 'md') classNames.push(`gap-8`)
  else if (spacing.sm === 'lg') classNames.push(`gap-12`)

  if (!spacing.md) classNames.push()
  else if (spacing.md === 'none') classNames.push(`md:gap-0`)
  else if (spacing.md === 'sm') classNames.push(`md:gap-4`)
  else if (spacing.md === 'md') classNames.push(`md:gap-8`)
  else if (spacing.md === 'lg') classNames.push(`md:gap-12`)

  if (!spacing.lg) classNames.push()
  else if (spacing.lg === 'none') classNames.push(`lg:gap-0`)
  else if (spacing.lg === 'sm') classNames.push(`lg:gap-4`)
  else if (spacing.lg === 'md') classNames.push(`lg:gap-8`)
  else if (spacing.lg === 'lg') classNames.push(`lg:gap-12`)

  /**
   * Row spacing
   */
  if (spacing.sm) classNames.push()
  else if (rowSpacing.sm === 'none') classNames.push(`gap-y-0`)
  else if (rowSpacing.sm === 'sm') classNames.push(`gap-y-4`)
  else if (rowSpacing.sm === 'md') classNames.push(`gap-y-8`)
  else if (rowSpacing.sm === 'lg') classNames.push(`gap-y-12`)

  if (spacing.md) classNames.push()
  else if (rowSpacing.md === 'none') classNames.push(`md:gap-y-0`)
  else if (rowSpacing.md === 'sm') classNames.push(`md:gap-y-4`)
  else if (rowSpacing.md === 'md') classNames.push(`md:gap-y-8`)
  else if (rowSpacing.md === 'lg') classNames.push(`md:gap-y-12`)

  if (spacing.lg) classNames.push()
  else if (rowSpacing.lg === 'none') classNames.push(`lg:gap-y-0`)
  else if (rowSpacing.lg === 'sm') classNames.push(`lg:gap-y-4`)
  else if (rowSpacing.lg === 'md') classNames.push(`lg:gap-y-8`)
  else if (rowSpacing.lg === 'lg') classNames.push(`lg:gap-y-12`)

  /**
   * Column spacing
   */
  if (spacing.sm) classNames.push()
  else if (columnSpacing.sm === 'none') classNames.push(`gap-x-0`)
  else if (columnSpacing.sm === 'sm') classNames.push(`gap-x-4`)
  else if (columnSpacing.sm === 'md') classNames.push(`gap-x-8`)
  else if (columnSpacing.sm === 'lg') classNames.push(`gap-x-12`)

  if (spacing.md) classNames.push()
  else if (columnSpacing.md === 'none') classNames.push(`md:gap-x-0`)
  else if (columnSpacing.md === 'sm') classNames.push(`md:gap-x-4`)
  else if (columnSpacing.md === 'md') classNames.push(`md:gap-x-8`)
  else if (columnSpacing.md === 'lg') classNames.push(`md:gap-x-12`)

  if (spacing.lg) classNames.push()
  else if (columnSpacing.lg === 'none') classNames.push(`lg:gap-x-0`)
  else if (columnSpacing.lg === 'sm') classNames.push(`lg:gap-x-4`)
  else if (columnSpacing.lg === 'md') classNames.push(`lg:gap-x-8`)
  else if (columnSpacing.lg === 'lg') classNames.push(`lg:gap-x-12`)

  return <div className={clsx(classNames, className)}>{children}</div>
}

type ItemProps = HTMLAttributes<HTMLDivElement> & {
  sm?: Cols
  md?: Cols
  lg?: Cols
}

const Item = ({ sm, md, lg, className, children }: ItemProps) => {
  const classNames: Array<ClassValue> = []

  /**
   * Columns
   */
  if (!sm || sm === 12) classNames.push(`col-span-12`)
  else if (sm === 6) classNames.push(`col-span-6`)
  else if (sm === 4) classNames.push(`col-span-4`)
  else if (sm === 2) classNames.push(`col-span-2`)
  else if (sm === 1) classNames.push(`col-span-1`)

  if (!md) classNames.push()
  else if (md === 12) classNames.push(`md:col-span-12`)
  else if (md === 6) classNames.push(`md:col-span-6`)
  else if (md === 4) classNames.push(`md:col-span-4`)
  else if (md === 2) classNames.push(`md:col-span-2`)
  else if (md === 1) classNames.push(`md:col-span-1`)

  if (!lg) classNames.push()
  else if (lg === 12) classNames.push(`lg:col-span-12`)
  else if (lg === 6) classNames.push(`lg:col-span-6`)
  else if (lg === 4) classNames.push(`lg:col-span-4`)
  else if (lg === 2) classNames.push(`lg:col-span-2`)
  else if (lg === 1) classNames.push(`lg:col-span-1`)

  return <div className={clsx(classNames, className)}>{children}</div>
}

Grid.Item = Item
