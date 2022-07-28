import { AuthenticationError, Link, useMutation, Routes, PromiseReturnType } from "blitz"
import { Form, FORM_ERROR } from "app/core/components/Form"
import login from "app/auth/mutations/login"
import { Login } from "app/auth/validations"
import { useForm } from "react-hook-form"
import {
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react"

type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void
}

const LoginFormChakra = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (values) => {
    try {
      const user = await loginMutation(values)
      props.onSuccess?.(user)
    } catch (error: any) {
      if (error instanceof AuthenticationError) {
        return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
      } else {
        return {
          [FORM_ERROR]:
            "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
        }
      }
    }
  }
  console.log(errors)

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <VStack w="full" h="full" p={10} spacing={2} alignItems="flex-start">
          <Heading size="lg">Login</Heading>

          <SimpleGrid columns={2} columnGap={2} rowGap={2} w="full">
            <GridItem colSpan={1}>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input placeholder="yousername" {...register("username", { required: true })} />
              </FormControl>
            </GridItem>
            <GridItem colSpan={1}>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input type="password" {...register("password", { required: true })} />
              </FormControl>
            </GridItem>
            <GridItem colSpan={2}>
              <Input type="submit" />
            </GridItem>
          </SimpleGrid>
        </VStack>
      </Form>

      <div style={{ marginTop: "1rem" }}>
        Or <Link href={Routes.SignupPage()}>Sign Up</Link>
      </div>
    </>
  )
}

/*
export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)

  return (
    <div>
      <h1>Login</h1>

      <Form
        submitText="Login"
        schema={Login}
        initialValues={{ name: "", password: "" }}
        onSubmit={async (values) => {
          try {
            const user = await loginMutation(values)
            props.onSuccess?.(user)
          } catch (error: any) {
            if (error instanceof AuthenticationError) {
              return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
            } else {
              return {
                [FORM_ERROR]:
                  "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
              }
            }
          }
        }}
      >
        <LabeledTextField name="name" label="Username" placeholder="Username" />
        <LabeledTextField name="password" label="Password" placeholder="Password" type="password" />
        <div>
          <Link href={Routes.ForgotPasswordPage()}>
            <a>Forgot your password?</a>
          </Link>
        </div>
      </Form>

      <div style={{ marginTop: "1rem" }}>
        Or <Link href={Routes.SignupPage()}>Sign Up</Link>
      </div>
    </div>
  )
}
*/

export default LoginFormChakra
