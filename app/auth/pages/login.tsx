import { useRouter, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import { LoginForm } from "app/auth/components/LoginForm"
import { HStack, Stack, Text, useToast } from "@chakra-ui/react"

const LoginPage: BlitzPage = () => {
  const router = useRouter()
  const toast = useToast()

  const next = router.query.next as string | undefined
  const redirectTo = decodeURIComponent(next || "/")

  return (
    <LoginForm
      onSuccess={(_user) => {
        router.push(redirectTo)
        toast({
          title: `Welcome back ${_user.username}`,
          description: "You've successfully logged in.",
          status: "success",
        })
        // const next = router.query.next ? decodeURIComponent(router.query.next as string) : "/"
      }}
    />
  )
}

LoginPage.redirectAuthenticatedTo = "/"
LoginPage.getLayout = (page) => <Layout title="Log In">{page}</Layout>

export default LoginPage
