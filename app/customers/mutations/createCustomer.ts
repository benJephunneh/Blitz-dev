import { resolver } from "blitz"
import db from "db"
import { CreateCustomer as createCustomerSchema } from "app/customers/validations"

export default resolver.pipe(
  resolver.zod(createCustomerSchema),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const customer = await db.customer.create({ data: input })

    return customer
  }
)
