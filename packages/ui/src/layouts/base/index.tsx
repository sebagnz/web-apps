import type { ReactNode } from 'react'

export interface BaseLayoutProps {
  header?: ReactNode
  main: ReactNode
  footer?: ReactNode
  leftSidebar?: ReactNode
  rightSidebar?: ReactNode
}

export const BaseLayout = (props: BaseLayoutProps) => {
  let mainSpan

  if (props.rightSidebar && props.leftSidebar) {
    mainSpan = 'md:col-span-4 lg:col-span-3'
  }

  if (!props.rightSidebar && !props.leftSidebar) {
    mainSpan = 'md:col-span-5 lg:col-span-5'
  }

  if (!props.leftSidebar && props.rightSidebar) {
    mainSpan = 'md:col-span-4 lg:col-span-4'
  }

  if (props.leftSidebar && !props.rightSidebar) {
    mainSpan = 'md:col-span-5 lg:col-span-4'
  }

  return (
    <div className="grid grid-cols-5 grid-rows-[auto_1fr_auto] min-h-[100svh]">
      {props.header ? <div className="col-span-5">{props.header}</div> : null}

      {props.leftSidebar ? <div className="hidden lg:block col-span-1">{props.leftSidebar}</div> : null}

      {props.main ? <div className={`col-span-5 ${mainSpan}`}>{props.main}</div> : null}

      {props.rightSidebar ? <div className="hidden md:block col-span-1">{props.rightSidebar}</div> : null}

      {props.footer ? <div className="col-span-5">{props.footer}</div> : null}
    </div>
  )
}
