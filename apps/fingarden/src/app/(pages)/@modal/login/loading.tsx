import { Skeleton } from '@web-apps/ui'

export default function Loading() {
  return (
    <div className="space-y-5 flex flex-col items-center">
      <Skeleton className="h-16 w-32" />

      <div className="space-y-3 flex flex-col items-center">
        <Skeleton className="h-12 w-80" />
        <Skeleton className="h-12 w-80" />

        <Skeleton className="h-12 w-60 rounded-full" />
      </div>

      <Skeleton className="h-12 w-60 rounded-full" />
    </div>
  )
}
