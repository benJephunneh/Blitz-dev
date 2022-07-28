import { useRouter, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import { LoginForm } from "app/auth/components/LoginForm"
import { useToast } from "@chakra-ui/react"
import LoginFormChakra from "../components/LoginFormChakra"

const ChakraLoginPage: BlitzPage = () => {
  const router = useRouter()
  const toast = useToast()

  const next = router.query.next as string | undefined
  const redirectTo = decodeURIComponent(next || "/")

  return (
    <div>
      <LoginFormChakra
        onSuccess={(_user) => {
          router.push(redirectTo)
          toast({
            title: `Welcome back, ${_user.username}`,
            description: "You have successfully logged in",
            status: "success",
          })
        }}
      />
    </div>
  )
}

ChakraLoginPage.redirectAuthenticatedTo = "/"
ChakraLoginPage.getLayout = (page) => <Layout title="Log In">{page}</Layout>

export default ChakraLoginPage
