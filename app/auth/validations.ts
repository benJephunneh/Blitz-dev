import { z } from "zod"

export const username = z.string().transform((str) => str.trim())

export const email = z
  .string()
  .email()
  .transform((str) => str.toLowerCase().trim())
// Wonder if .toLowerCase().trim() will be needed.

export const password = z
  .string()
  .min(10)
  .max(100)
  .transform((str) => str.trim())

export const role = z.string()

export const Signup = z.object({
  username,
  email,
  password,
  role,
})

export const Login = z.object({
  username,
  password,
})

export const ForgotPassword = z.object({
  email,
})

export const ChangePassword = z
  .object({
    username: username,
    password: password,
    passwordConfirmation: password,
    token: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"], // set the path of the error
  })

// export const ChangePassword = z.object({
//   currentPassword: z.string(),
//   newPassword: password,
// })
