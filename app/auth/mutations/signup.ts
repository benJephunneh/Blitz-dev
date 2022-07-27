import { resolver, SecurePassword } from "blitz"
import db from "db"
import { Signup } from "app/auth/validations"
import { Role } from "types"

<<<<<<< HEAD
export default resolver.pipe(resolver.zod(Signup), async ({ username, email, password, role }, ctx) => {
  const hashedPassword = await SecurePassword.hash(password.trim())
  const user = await db.user.create({
    data: {
      username,
=======
export default resolver.pipe(resolver.zod(Signup), async ({ name, email, password, role }, ctx) => {
  const hashedPassword = await SecurePassword.hash(password.trim())
  const user = await db.user.create({
    data: {
      name,
>>>>>>> 2ea781347c4590e1f45c6ee1ac8baef075b9d7aa
      email,
      hashedPassword,
      role,
    },
<<<<<<< HEAD
    select: { id: true, username: true, email: true, role: true },
=======
    select: { id: true, name: true, email: true, role: true },
>>>>>>> 2ea781347c4590e1f45c6ee1ac8baef075b9d7aa
  })

  await ctx.session.$create({ userId: user.id, role: user.role as Role })
  return user
})
