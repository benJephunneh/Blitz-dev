import {
  Button,
  Fade,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  useToast,
} from "@chakra-ui/react"
import LoginForm from "app/auth/components/LoginForm"
import { Link, Routes, useRouter } from "blitz"
import { Suspense } from "react"
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
  const toast = useToast()

  const next = router.query.next as string | undefined
  const redirectTo = decodeURIComponent(next || "/")

  return (
    <HStack spacing={0} justify="flex-end">
      <Suspense fallback="Loading...">
        <Menu>
          <HeaderLoginButton />
          <Fade in>
            <MenuList>
              <Stack spacing={8} px={2}>
                <LoginForm
                  onSuccess={(_user) => {
                    router.push(redirectTo)
                    toast({
                      title: `Welcome back, ${_user.username}`,
                      description: "Log in successful",
                      status: "success",
                    })
                  }}
                >
                  <Link href={Routes.SignupPage()} passHref>
                    <Button as="a" size="sm" rightIcon={<FaArrowRight />} colorScheme="green">
                      Sign up
                    </Button>
                  </Link>
                </LoginForm>
              </Stack>
            </MenuList>
          </Fade>
        </Menu>
      </Suspense>
    </HStack>
  )
}

export default HeaderLogIn
