import { resolver } from "blitz"
import db from "db"
import { CreateCustomer } from "../validations"

export default resolver.pipe(resolver.zod(CreateCustomer), resolver.authorize(), async (data) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const customer = await db.customer.create({ data })

  return customer
})
