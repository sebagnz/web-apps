import { z } from 'zod'

export const SnapshotSchema = z.object({
  id: z.string(),
  accountId: z.string(),
  balance: z.number(),
  date: z.date(),
})

export const SnapshotListSchema = z.array(SnapshotSchema)

export type Snapshot = z.infer<typeof SnapshotSchema>
export type SnapshotList = z.infer<typeof SnapshotListSchema>
