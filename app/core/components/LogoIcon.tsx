import { Icon, IconProps } from "@chakra-ui/react"
import { Image } from "blitz"
import abstIcon from "public/abst icon.png"
import { FC } from "react"

const LogoIcon: FC<IconProps> = (props) => {
  return (
    <Icon viewBox="0 0 200 200">
      <Image src={abstIcon} alt="ABST icon" />
    </Icon>
  )
}

export default LogoIcon
