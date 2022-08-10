import { Button, Fade, HStack, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"
import { Link, Routes, useRouter } from "blitz"
import { FaArrowRight, FaChevronDown } from "react-icons/fa"

const HeaderLoginButton = () => {
  return (
    <MenuButton as={Button} size="sm" variant="ghost" px={1} rightIcon={<FaChevronDown />}>
      Log in
    </MenuButton>
  )
}
const HeaderLogIn = () => {
  const router = useRouter()

  return (
    <HStack spacing={1} justify="flex-end">
      <Link href={Routes.LoginPage()} passHref>
        <Button size="sm" as="a" variant="ghost">
          Log in
        </Button>
      </Link>
      <Link href={Routes.SignupPage()} passHref>
        <Button size="sm" as="a" rightIcon={<FaArrowRight />} colorScheme="green">
          Sign up
        </Button>
      </Link>
    </HStack>
  )
}

export default HeaderLogIn
