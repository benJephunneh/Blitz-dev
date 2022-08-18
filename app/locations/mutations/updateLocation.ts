import { resolver } from "blitz"
import db from "db"
import { UpdateLocation } from "../validations"

export default resolver.pipe(
  resolver.zod(UpdateLocation),
  resolver.authorize(),
  async ({ id, number, street, city, state, zipcode, block, lot, parcel, customerId }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const location = await db.location.update({
      where: { id },
      data: {
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

    return location
  }
)
