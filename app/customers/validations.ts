import { z } from "zod"

const firstname = z.string().transform((str) => str.trim())
const lastname = z.string().transform((str) => str.trim())

export const CreateCustomer = z.object({
  firstname,
  lastname,
})
