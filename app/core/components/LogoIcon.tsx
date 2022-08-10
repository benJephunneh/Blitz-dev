import { Box, BoxProps } from "@chakra-ui/react"
import { Image } from "blitz"
import abstIcon from "public/abst icon.png"
import { FC } from "react"

const LogoIcon: FC<BoxProps> = (props) => {
  return (
    <Box {...props}>
      <Image src={abstIcon} alt="ABST icon" />
    </Box>
  )
}

export default LogoIcon
