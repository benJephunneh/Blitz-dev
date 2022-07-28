import { Button, HStack } from "@chakra-ui/react"
import { Link, Routes } from "blitz"
import { FaArrowRight } from "react-icons/fa"

const HeaderLogIn = () => {
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
