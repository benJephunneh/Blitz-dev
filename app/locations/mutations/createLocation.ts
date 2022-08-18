import getCustomer from "app/customers/queries/getCustomer"
import { resolver, useQuery } from "blitz"
import db from "db"
import { CreateLocation } from "../validations"

export default resolver.pipe(
  resolver.zod(CreateLocation),
  resolver.authorize(),
  async ({ primary, number, street, city, state, zipcode, block, lot, parcel, customerId }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const location = await db.location.create({
      data: {
        primary,
        number,
        street,
        city,
        state,
        zipcode,
        block,
        lot,
        parcel,
        customer: {
          connect: {
            id: customerId,
          },
        },
      },
    })
    // const location = await db.location.create({ data })

    return location
  }
)
