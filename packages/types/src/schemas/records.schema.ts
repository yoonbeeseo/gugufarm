import z from "zod"

export const danSchema = z.enum(["1단", "2단", "3단", "4단", "5단", "6단", "7단", "8단", "9단", "무한"])
export type Dan = z.infer<typeof danSchema>

export const recordSchema = z.object({
  id: z.string(),
  uid: z.string().uuid(), //! connect to user,
  score: z.number().min(0),
  timeSpent: z.number().min(0),
  targetDan: danSchema,
  createdAt: z.number().default(new Date().getTime()),
})

export type PersonalRecordWithUid = z.infer<typeof recordSchema>
export type PersonalRecord = Omit<PersonalRecordWithUid, "uid">
export type PersonalRecordWithoutIds = Omit<PersonalRecord, "uid" | "id">
