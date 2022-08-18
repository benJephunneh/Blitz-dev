import { z, ZodSchema } from "zod"

const id = z.number()
const firstname = z.string()
const lastname = z.string()

export const CreateCustomer = z.object({
  firstname,
  lastname,
})

export const UpdateCustomer = z.object({
  id,
  firstname,
  lastname,
})

export const DeleteCustomer = z.object({
  id,
})
