import { BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import { LoginForm } from "app/auth/components/LoginForm"
import { useToast } from "@chakra-ui/react"

const LoginPage: BlitzPage = () => {
  const toast = useToast()

  return (
    <LoginForm
      onSuccess={(_user) => {
        toast({
          title: `Welcome back ${_user.username}`,
          description: "You've successfully logged in.",
          status: "success",
        })
      }}
    />
  )
}

LoginPage.redirectAuthenticatedTo = "/"
LoginPage.getLayout = (page) => <Layout title="Log In">{page}</Layout>

export default LoginPage
