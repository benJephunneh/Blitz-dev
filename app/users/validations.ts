import { z } from "zod"

export const username = z.string().transform((str) => str.trim())

export const password = z
  .string()
  .min(10)
  .max(100)
  .transform((str) => str.trim())

export const ResetPassword = z
  .object({
    username,
    password,
    passwordConfirmation: password,
    token: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match.",
    path: ["passwordConfirmation"],
  })

export const ChangePassword = z.object({
  currentPassword: z.string(),
  newPassword: password,
})
