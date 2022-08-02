import { AuthenticationError, Link, useMutation, Routes, PromiseReturnType } from "blitz"
import { FORM_ERROR } from "app/core/components/Form"
import login from "app/auth/mutations/login"
import { useForm } from "react-hook-form"
import { FC } from "react"
import { Button, Input, VStack } from "@chakra-ui/react"

type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void
}

const LoginForm: FC<LoginFormProps> = ({ onSuccess }) => {
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
        [FORM_ERROR]: "Something is knot rite: " + error.toString(),
      }
    }
  }
  console.log(errors)

  const onSubmit = async (values) => {
    try {
      const user = await loginMutation(values)
      onSuccess?.(user)
    } catch (error) {
      return handleError(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack w="full">
        <Input placeholder="Username" {...register("username", { required: true })} />
        <Input
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />
        <Button type="submit" w="full" bg="green.200">
          Do it
        </Button>
      </VStack>
    </form>
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
