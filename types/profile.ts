import z from "zod"

export const profileSchema = z.object({
  id: z.string().uuid(),
  name: z.string().nullable().default(null),
  email: z.string().email().nullable().default(null),
  profileImg: z.string().url().nullable().default(null),
})

export type Profile = z.infer<typeof profileSchema>
export type ProfileWithoutID = Omit<Profile, "id">
