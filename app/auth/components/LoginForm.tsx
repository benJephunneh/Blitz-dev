import { AuthenticationError, Link, useMutation, Routes, PromiseReturnType } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import login from "app/auth/mutations/login"
import { Login } from "app/auth/validations"
import { useForm } from "react-hook-form"
import { Button, HStack, Input, VStack } from "@chakra-ui/react"
import { ReactNode } from "react"

type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void
  children?: ReactNode
}

export const LoginForm = (props: LoginFormProps) => {
  const { onSuccess, children } = props
  const [loginMutation] = useMutation(login)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const handleError = (error: any) => {
    if (error instanceof AuthenticationError) {
      return {
        [FORM_ERROR]: "Email or password is incorrect.",
      }
    } else {
      return {
        [FORM_ERROR]: "Something went wrong: " + error.toString(),
      }
    }
  }

  const onSubmit = async (values) => {
    try {
      const user = await loginMutation(values)
      props.onSuccess?.(user)
    } catch (error) {
      return handleError(error)
    }
  }
  console.log(errors)

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <VStack w="full">
        <Input placeholder="Username" {...register("username", { required: true })} />
        <Input
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />
      </VStack>

      <HStack py={2} spacing="auto">
        <Button type="submit" size="sm" variant="ghost">
          Log in
        </Button>
        {children}
      </HStack>
    </Form>
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

export default LoginForm
