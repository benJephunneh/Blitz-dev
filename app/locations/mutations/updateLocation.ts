import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateLocation = z.object({
  id: z.number(),
  primary: z.boolean(),
  number: z.number(),
  street: z.string(),
  city: z.string(),
  state: z.string(),
  zipcode: z.number(),
  customerId: z.number(),
})

export default resolver.pipe(
  resolver.zod(UpdateLocation),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const location = await db.location.update({ where: { id }, data })

    return location
  }
)
