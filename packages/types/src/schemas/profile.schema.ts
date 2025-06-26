import z from "zod"

export const profileSchema = z.object({
  id: z.string().uuid(),
  name: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  profileImg: z.string().url().nullable().optional(),
})

export type Profile = z.infer<typeof profileSchema>
