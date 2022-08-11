import { useRouter, BlitzPage, Routes } from "blitz"
import SignupForm from "app/auth/components/SignupForm"
import { Stack, useToast } from "@chakra-ui/react"
import BoxLayout from "header/app/core/layouts/BoxLayout"

const SignupPage: BlitzPage = () => {
  const router = useRouter()
  const toast = useToast()

  const next = router.query.next as string | undefined
  const redirectTo = decodeURIComponent(next || "/")

  return (
    <Stack spacing={8}>
      <SignupForm
        onSuccess={(_user) => {
          router.push(redirectTo)
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

SignupPage.getLayout = (page) => (
  <BoxLayout title="Sign Up" description="Create new user">
    {page}
  </BoxLayout>
)

export default SignupPage
