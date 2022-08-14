import { FC } from "react"
import { Icon, useColorMode } from "@chakra-ui/react"
import { FaMoon, FaSun } from "react-icons/fa"
import HeaderIconButton from "./HeaderIconButton"

const HeaderDayNight = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <HeaderIconButton
      label={colorMode === "dark" ? "Day hike" : "Night hike"}
      onClick={toggleColorMode}
      icon={<Icon as={colorMode === "dark" ? FaSun : FaMoon} w={5} h={5} />}
    />
  )
}

export default HeaderDayNight
