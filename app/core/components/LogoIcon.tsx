import { Box, Icon, IconProps } from "@chakra-ui/react"
import { Image } from "blitz"
import abstIcon from "public/abst icon.png"

const LogoIcon = (props) => {
  return (
    <Box boxSize={10}>
      <Image src={abstIcon} alt="ABST logo" />
    </Box>
  )
}

export default LogoIcon
