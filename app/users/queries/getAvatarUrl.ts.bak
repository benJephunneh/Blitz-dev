import { User } from "@prisma/client"

const getAvatarUrl = (
  user: Pick<User, "avatarId" | "avatarVersion"> | null | undefined,
  size: number
) => {
  if (!user?.avatarId) return ""

  const version = user.avatarVersion ? `${user.avatarVersion}` : undefined

  return cloudinaryClient.url(user.avatarId, {
    width: size,
    height: size,
    crop: "fill",
    gravity: "face",
    version,
  })
}

export default getAvatarUrl
