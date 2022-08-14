import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteCustomer = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(DeleteCustomer),
  resolver.authorize(["Admin", "Owner"]),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant

    // Query the user to delete also the associated locations and histories.
    // Consider, also, to not delete the customer but to make them now not searchable (keep for records).
    const customer = await db.customer.deleteMany({ where: { id } })

    return customer
  }
)
