import { z } from "zod"

<<<<<<< HEAD
export const username = z.string().transform((str) => str.trim())
=======
export const name = z.string().transform((str) => str.trim())
>>>>>>> 2ea7813 (Initialize chakra)

export const email = z
  .string()
  .email()
  .transform((str) => str.toLowerCase().trim())

<<<<<<< HEAD
=======
export const role = z.string()

>>>>>>> 2ea7813 (Initialize chakra)
export const password = z
  .string()
  .min(10)
  .max(100)
  .transform((str) => str.trim())

<<<<<<< HEAD
export const role = z.string()

export const Signup = z.object({
  username,
=======
export const Signup = z.object({
  name,
>>>>>>> 2ea7813 (Initialize chakra)
  email,
  password,
  role,
})

export const Login = z.object({
<<<<<<< HEAD
  username,
=======
  name,
>>>>>>> 2ea7813 (Initialize chakra)
  password,
})

export const ForgotPassword = z.object({
<<<<<<< HEAD
  email,
=======
  name,
>>>>>>> 2ea7813 (Initialize chakra)
})

export const ResetPassword = z
  .object({
<<<<<<< HEAD
    username: username,
=======
>>>>>>> 2ea7813 (Initialize chakra)
    password: password,
    passwordConfirmation: password,
    token: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"], // set the path of the error
  })

export const ChangePassword = z.object({
  currentPassword: z.string(),
  newPassword: password,
})
