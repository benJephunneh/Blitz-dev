import { z } from "zod"

const primary = z.boolean()
const number = z.number()
const street = z.string()
const city = z.string()
const state = z.string()
const zipcode = z.number()
const block = z.string()
const lot = z.number()
const parcel = z.string()
const customerId = z.number()

export const CreateLocation = z.object({
  primary,
  number,
  street,
  city,
  state,
  zipcode,
  block,
  lot,
  parcel,
  customerId,
})

export const UpdateLocation = z.object({
  id: z.number(),
  primary,
  number,
  street,
  city,
  state,
  zipcode,
  block,
  lot,
  parcel,
  customerId,
})
