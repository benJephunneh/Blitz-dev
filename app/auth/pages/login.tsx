import { useRouter, BlitzPage, Link, Routes } from "blitz"
import { Button, Stack, useToast } from "@chakra-ui/react"
import TextDivider from "app/core/components/TextDivider"
import LoginForm from "../components/LoginForm"
import BoxLayout from "app/core/layouts/BoxLayout"

/****
 * Modify to use Popover
 */

const LoginPage: BlitzPage = () => {
  const router = useRouter()
  const toast = useToast()

  return (
    <Stack spacing={8}>
      <LoginForm
        onSuccess={(_user) => {
          const next = router.query.next ? decodeURIComponent(router.query.next as string) : "/"
          router.push(next)
          toast({
            title: `Welcome back, ${_user.username}`,
            description: "You've successfully logged in.",
            status: "success",
          })
          // const next = router.query.next ? decodeURIComponent(router.query.next as string) : "/"
        }}
      />
      <div>
        <Link href={Routes.ForgotPasswordPage()} passHref>
          <Button as="a" w="full" bg="red.100">
            Reset password
          </Button>
        </Link>
      </div>

      <TextDivider>Or</TextDivider>
    </Stack>
  )
}

LoginPage.redirectAuthenticatedTo = Routes.Home()
LoginPage.getLayout = (page) => (
  <BoxLayout title="Log In" description="Sign in to visualize the effluent.">
    {page}
  </BoxLayout>
)

export default LoginPage
