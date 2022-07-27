import { NotFoundError, SecurePassword, resolver, AuthenticationError } from "blitz"
import db from "db"
import { authenticateUser } from "./login"
import { ChangePassword } from "../validations"

export default resolver.pipe(
  resolver.zod(ChangePassword),
  resolver.authorize(),
  async ({ currentPassword, newPassword }, ctx) => {
    const user = await db.user.findFirst({ where: { id: ctx.session.userId! } })
    if (!user) throw new NotFoundError()

    try {
<<<<<<< HEAD
      await authenticateUser(user.username, currentPassword)
=======
      await authenticateUser(user.name, currentPassword)
>>>>>>> 2ea781347c4590e1f45c6ee1ac8baef075b9d7aa
    } catch (error: any) {
      if (error instanceof AuthenticationError) {
        throw new Error("Invalid Password")
      }
      throw error
    }

    const hashedPassword = await SecurePassword.hash(newPassword.trim())
    await db.user.update({
      where: { id: user.id },
      data: { hashedPassword },
    })

    return true
  }
)
