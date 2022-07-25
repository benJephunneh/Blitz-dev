import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateLocation = z.object({
  number: z.number(),
  street: z.string(),
  city: z.string(),
  state: z.string(),
  zipcode: z.number(),
  customerId: z.number(),
})

export default resolver.pipe(resolver.zod(CreateLocation), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const location = await db.location.create({ data: input })

  return location
})
