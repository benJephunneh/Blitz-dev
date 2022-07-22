import { useMedia } from "./useMedia"

export const useIsDesktop = () => {
  const matches = useMedia("(min-width: 1024px)")
  return matches
}
