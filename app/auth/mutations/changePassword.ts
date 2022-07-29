import { resolver, SecurePassword, hash256 } from "blitz"
import db from "db"
import { ChangePassword } from "../validations"
import login from "./login"

export class ChangePasswordError extends Error {
  name = "ChangePasswordError"
  message = "Change password link is invalid or it has expired."
}

export default resolver.pipe(
  resolver.zod(ChangePassword),
  async ({ username, password, token }, ctx) => {
    // 1. Try to find this token in the database
    const hashedToken = hash256(token)
    const possibleToken = await db.token.findFirst({
      where: { hashedToken, type: "RESET_PASSWORD" },
      include: { user: true },
    })

    // 2. If token not found, error
    if (!possibleToken) {
      throw new ChangePasswordError()
    }
    const savedToken = possibleToken

    // 3. Delete token so it can't be used again
    await db.token.delete({ where: { id: savedToken.id } })

    // 4. If token has expired, error
    if (savedToken.expiresAt < new Date()) {
      throw new ChangePasswordError()
    }

    // 5. Since token is valid, now we can update the user's password
    const hashedPassword = await SecurePassword.hash(password.trim())
    const user = await db.user.update({
      where: { id: savedToken.userId },
      data: { hashedPassword },
    })

    // 6. Revoke all existing login sessions for this user
    await db.session.deleteMany({ where: { userId: user.id } })

    // 7. Now log the user in with the new credentials
    await login({ username: user.username, password }, ctx)

    return true
  }
)
