import {
  Button,
  Fade,
  Flex,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  Spacer,
  Stack,
  useToast,
} from "@chakra-ui/react"
import ChakraLoginForm from "app/auth/components/ChakraLoginForm"
import LoginForm from "app/auth/components/LoginForm"
import { Link, Routes, useRouter } from "blitz"
import { Suspense } from "react"
import { FaArrowRight, FaChevronDown } from "react-icons/fa"

const HeaderLoginButton = () => {
  return (
    <Fade in>
      <MenuButton
        as={Button}
        size="sm"
        variant="ghost"
        px={1}
        rightIcon={<Icon pr={1} as={FaChevronDown} />}
      >
        Log in
      </MenuButton>
    </Fade>
  )
}

const HeaderLogIn = () => {
  const router = useRouter()
  const toast = useToast()
  // const session = useSession()
  // const isLoggedIn = !!session.userId
  // const isNotLoggedIn = !isLoggedIn

  return (
    <HStack spacing={0} justify="flex-end">
      <Suspense fallback="Loading...">
        <Menu>
          <HeaderLoginButton />

          <MenuList>
            <Stack spacing={8} px={2}>
              <ChakraLoginForm
                onSuccess={(_user) => {
                  const next = router.query.next
                    ? decodeURIComponent(router.query.next as string)
                    : "/"
                  router.push(next)
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
              </ChakraLoginForm>
            </Stack>
          </MenuList>
        </Menu>
      </Suspense>
    </HStack>
  )
}

export default HeaderLogIn
