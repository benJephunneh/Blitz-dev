import { HStack, Icon, useColorMode } from "@chakra-ui/react"
import { FC } from "react"
import { FaBars, FaMoon, FaSun } from "react-icons/fa"
import HeaderIconButton from "./HeaderIconButton"

type HeaderActionProps = {
  toggleDrawer: () => void
}

const HeaderActions: FC<HeaderActionProps> = ({ toggleDrawer }) => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <HStack spacing={1}>
      <HeaderIconButton
        label="Open menu"
        onClick={toggleDrawer}
        icon={<Icon as={FaBars} w={5} h={5} />}
      />
      <HeaderIconButton
        label={colorMode === "dark" ? "Day hike" : "Night hike"}
        onClick={toggleColorMode}
        icon={<Icon as={colorMode === "dark" ? FaSun : FaMoon} w={5} h={5} />}
      />
    </HStack>
  )
}

export default HeaderActions
