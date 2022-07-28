import { useQuery } from "blitz"
import getCurrentUser from "app/users/queries/getCurrentUser"

// export const useCurrentUser = () => {
//   const [user] = useQuery(getCurrentUser, null)
//   return user
// }

type UseCurrentUserOptions = {
  suspense?: boolean
}

export const useCurrentUser = (options: UseCurrentUserOptions = {}) => {
  const { suspense = true } = options
  const [user] = useQuery(getCurrentUser, null, { suspense })
  return user
}
