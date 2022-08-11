import { BlitzPage, useRouter } from "blitz"
import Layout from "app/core/layouts/Layout"
import { LoginForm } from "app/auth/components/LoginForm"
import { Stack, useToast } from "@chakra-ui/react"

const LoginPage: BlitzPage = () => {
  const toast = useToast()
  const router = useRouter()

  const next = router.query.next as string | undefined
  const redirectTo = decodeURIComponent(next || "/")

  return (
    <Stack spacing={8}>
      <LoginForm
        onSuccess={(_user) => {
          router.push(redirectTo)
          toast({
            title: `Welcome back ${_user.username}`,
            description: "You've successfully logged in.",
            status: "success",
          })
        }}
      />
    </Stack>
  )
}

LoginPage.getLayout = (page) => <Layout title="Log In">{page}</Layout>

export default LoginPage
