import { useRouter, BlitzPage, Routes, Link } from "blitz"
import { Button, Stack, useToast } from "@chakra-ui/react"
import ChakraSignupForm from "../components/ChakraSignupForm"
import BoxLayout from "app/core/layouts/BoxLayout"

const SignupPage: BlitzPage = () => {
  const router = useRouter()
  const toast = useToast()

  return (
    <Stack spacing={8}>
      <ChakraSignupForm
        onSuccess={(_user) => {
          // router.push(Routes.Home())
          router.push(Routes.ProfilePage({ username: _user.username }))
          toast({
            title: `Welcome, ${_user.username}`,
            description: "User successfully created.",
            status: "success",
          })
        }}
      />
    </Stack>
  )
}

// Require authentication if you want only admins to be able to sign people up.
// SignupPage.authenticate = true
SignupPage.getLayout = (page) => (
  <BoxLayout title="Sign Up" description="Create new user">
    {page}
  </BoxLayout>
)

export default SignupPage
