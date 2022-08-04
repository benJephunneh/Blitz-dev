import { useRouter, BlitzPage, Routes, Link, useMutation } from "blitz"
import { Button, Stack, useToast } from "@chakra-ui/react"
import { SignupForm } from "../components/SignupForm"
import BoxLayout from "app/core/layouts/BoxLayout"
import TextDivider from "app/core/components/TextDivider"
import { Signup } from "../validations"
import signupMutation from "../mutations/signupMutation"
import { FORM_ERROR } from "app/core/components/Form"

const SignupPage: BlitzPage = () => {
  const [createUserMutation] = useMutation(signupMutation)
  const router = useRouter()
  const toast = useToast()

  return (
    <Stack spacing={8}>
      <SignupForm
        submitText="Create user"
        schema={Signup}
        onSubmit={async (values) => {
          try {
            await createUserMutation({ ...values })
            router.push(Routes.Home())
          } catch (error) {
            console.log(error)
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

SignupPage.redirectAuthenticatedTo = "/"
SignupPage.getLayout = (page) => (
  <BoxLayout title="Sign Up" description="Create new user">
    {page}
  </BoxLayout>
)

export default SignupPage
