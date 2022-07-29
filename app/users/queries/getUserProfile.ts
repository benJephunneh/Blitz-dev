import { NotFoundError, resolver } from "blitz"
import db from "db"
import { z } from "zod"

const getProfileSchema = z.object({
  username: z.string(),
})

const profileQuery = resolver.pipe(
  resolver.zod(getProfileSchema),

  async ({ username }) => {
    const user = await db.user.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
      },
    })

    if (!user) {
      throw new NotFoundError()
    }
  }
)

export default profileQuery
