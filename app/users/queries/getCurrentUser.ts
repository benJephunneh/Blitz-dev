import { Ctx } from "blitz"
import db from "db"

export default async function getCurrentUser(_ = null, { session }: Ctx) {
  if (!session.userId) return null

  const user = await db.user.findFirst({
    where: { id: session.userId },
<<<<<<< HEAD
    select: { id: true, username: true, email: true, role: true },
=======
    select: { id: true, name: true, email: true, role: true },
>>>>>>> 2ea781347c4590e1f45c6ee1ac8baef075b9d7aa
  })

  return user
}
