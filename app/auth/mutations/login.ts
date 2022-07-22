import { resolver, SecurePassword, AuthenticationError } from "blitz"
import db from "db"
import { Login } from "../validations"
import { Role } from "types"

<<<<<<< HEAD
export const authenticateUser = async (rawUsername: string, rawPassword: string) => {
  const { username, password } = Login.parse({ username: rawUsername, password: rawPassword })
  const user = await db.user.findFirst({ where: { username } })
=======
export const authenticateUser = async (rawName: string, rawPassword: string) => {
  const { name, password } = Login.parse({ name: rawName, password: rawPassword })
  const user = await db.user.findFirst({ where: { name } })
>>>>>>> 2ea7813 (Initialize chakra)
  if (!user) throw new AuthenticationError()

  const result = await SecurePassword.verify(user.hashedPassword, password)

  if (result === SecurePassword.VALID_NEEDS_REHASH) {
    // Upgrade hashed password with a more secure hash
    const improvedHash = await SecurePassword.hash(password)
    await db.user.update({ where: { id: user.id }, data: { hashedPassword: improvedHash } })
  }

  const { hashedPassword, ...rest } = user
  return rest
}

<<<<<<< HEAD
export default resolver.pipe(resolver.zod(Login), async ({ username, password }, ctx) => {
  // This throws an error if credentials are invalid
  const user = await authenticateUser(username, password)
=======
export default resolver.pipe(resolver.zod(Login), async ({ name, password }, ctx) => {
  // This throws an error if credentials are invalid
  const user = await authenticateUser(name, password)
>>>>>>> 2ea7813 (Initialize chakra)

  await ctx.session.$create({ userId: user.id, role: user.role as Role })

  return user
})
