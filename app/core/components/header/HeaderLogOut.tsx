import { HStack } from "@chakra-ui/react"
import HeaderUserMenu from "./HeaderUserMenu"

const HeaderLogOut = () => {
  return (
    <HStack spacing={1} justify="flex-end">
      <HeaderUserMenu />
    </HStack>
  )
}

export default HeaderLogOut
