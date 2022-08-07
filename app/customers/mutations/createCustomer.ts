import { resolver } from "blitz"
import db from "db"
import { CreateCustomer as createCustomerSchema } from "app/customers/validations"

export default resolver.pipe(
  resolver.zod(createCustomerSchema),
  resolver.authorize(),
  async ({ firstname, lastname }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const customer = await db.customer.create({
      data: {
        firstname,
        lastname,
      },
    })

    return customer
  }
)
