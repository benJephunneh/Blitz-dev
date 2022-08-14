import { FC } from "react"
import { Icon } from "@chakra-ui/react"
import { FaBars } from "react-icons/fa"
import HeaderIconButton from "./HeaderIconButton"

type HeaderHamburgerProps = {
  toggleDrawer: () => void
}

const HeaderHamburger: FC<HeaderHamburgerProps> = ({ toggleDrawer }) => {
  return (
    <HeaderIconButton
      label="Open menu"
      onClick={toggleDrawer}
      icon={<Icon as={FaBars} w={5} h={5} />}
    />
  )
}

export default HeaderHamburger
