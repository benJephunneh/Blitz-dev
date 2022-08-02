import { useRouter, BlitzPage, Routes, Link } from "blitz"
import { Button, Stack, useToast } from "@chakra-ui/react"
import SignupForm from "../components/SignupForm"
import BoxLayout from "app/core/layouts/BoxLayout"
import TextDivider from "app/core/components/TextDivider"

const SignupPage: BlitzPage = () => {
  const router = useRouter()
  const toast = useToast()

  return (
    <Stack spacing={8}>
      <SignupForm
        onSuccess={(_user) => {
          router.push(Routes.Home())
          toast({
            title: `Welcome, ${_user.username}`,
            description: "User successfully created.",
            status: "success",
          })
        }}
      />

      <TextDivider>Or</TextDivider>

      <Link href={Routes.LoginPage()} passHref>
        <Button as="a" w="full" bg="blue.200">
          Log in
        </Button>
      </Link>
    </Stack>
  )
}

SignupPage.redirectAuthenticatedTo = "/"
SignupPage.getLayout = (page) => (
  <BoxLayout title="Sign Up" description="Create new user">
    {page}
  </BoxLayout>
)

export default SignupPage
