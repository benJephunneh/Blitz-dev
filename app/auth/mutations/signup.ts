import { resolver, SecurePassword } from "blitz"
import db from "db"
import { Signup } from "app/auth/validations"
import { Role } from "types"

const signup = resolver.pipe(
  resolver.zod(Signup),
  async ({ username, email, password, role }, ctx) => {
    const hashedPassword = await SecurePassword.hash(password.trim())

    const user = await db.user.create({
      data: {
        username,
        email,
        hashedPassword,
        role,
      },
      select: { id: true, username: true, email: true, role: true },
    })

    await ctx.session.$create({ userId: user.id, role: user.role as Role })
    return user
  }
)

export default signup
