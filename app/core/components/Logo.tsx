import { Image } from "blitz"
import { Box } from "@chakra-ui/react"
import { useCurrentUser } from "../hooks/useCurrentUser"
import abstIcon from "public/abst icon.png"
import blitzLogo from "public/logo.png"

const Logo = () => {
  const currentUser = useCurrentUser()

  if (currentUser) {
    return (
      <Box boxSize="50px">
        <Image src={abstIcon} alt="ABST icon" />
      </Box>
    )
  } else {
    return (
      <Box boxSize="50px" objectFit="cover">
        <Image src={blitzLogo} alt="Blitz.js logo" />
      </Box>
    )
  }
}

export default Logo
