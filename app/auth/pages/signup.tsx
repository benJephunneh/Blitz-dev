import { useRouter, BlitzPage, Routes, Link, useMutation } from "blitz"
import { Button, Stack } from "@chakra-ui/react"
import { SignupForm } from "../components/SignupForm"
import BoxLayout from "app/core/layouts/BoxLayout"
import TextDivider from "app/core/components/TextDivider"
import { Signup } from "../validations"
import signupMutation from "../mutations/signupMutation"
import { FORM_ERROR } from "app/core/components/Form"

const SignupPage: BlitzPage = () => {
  const router = useRouter()
  const [createUserMutation] = useMutation(signupMutation)

  return (
    <Stack spacing={8}>
      <SignupForm
        submitText="Create"
        // schema={Signup}
        // initialValues={{ username: "", email: "", password: "", role: "Tech" }}
        onSubmit={async (values) => {
          try {
            const user = await createUserMutation({ ...values })
            router.push(Routes.ProfilePage({ username: user.username }))
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
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

SignupPage.authenticate = true
SignupPage.getLayout = (page) => (
  <BoxLayout title="Sign Up" description="Create new user">
    {page}
  </BoxLayout>
)

export default SignupPage
