import { PromiseReturnType, useMutation } from "blitz"
import { FORM_ERROR } from "app/core/components/Form"
import signup from "app/auth/mutations/signup"
import { useForm } from "react-hook-form"
import { Input, Select, VStack } from "@chakra-ui/react"

type SignupFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof signup>) => void
}

const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const handleError = (error: any) => {
    if (error.code === "P2002" && error.meta?.target?.includes("email")) {
      // This error comes from Prisma
      return { email: "This email is already being used" }
    } else if (error.code === "P2002" && error.meta?.target?.includes("username")) {
      // This error comes from Prisma
      return { email: "This username is already being used" }
    } else {
      return { [FORM_ERROR]: "Something wint rong" + error.toString() }
    }
  }
  console.log(errors)

  const onSubmit = async (values) => {
    try {
      const user = await signupMutation(values)
      props.onSuccess?.(user)
    } catch (error: any) {
      return handleError(error)
    }
  }

  return (
    <>
      <h1>Create an account</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack w="full">
          <Input
            placeholder="Username"
            {...register("username", { required: true, maxLength: 80 })}
          />
          <Input type="email" placeholder="email" {...register("email", { required: true })} />
          <Input
            type="password"
            placeholder="password"
            {...register("password", { required: true, min: 10 })}
          />
          <Select {...register("role", { required: true })}>
            <option value="Owner">Owner</option>
            <option value="Admin">Admin</option>
            <option value="Tech">Tech</option>
          </Select>
        </VStack>
      </form>
    </>
  )
}

export default SignupForm

/*
export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)

  return (
    <div>
      <h1>Create an Account</h1>

      <Form
        submitText="Create Account"
        schema={Signup}
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          try {
            await signupMutation(values)
            props.onSuccess?.()
          } catch (error: any) {
            if (error.code === "P2002" && error.meta?.target?.includes("email")) {
              // This error comes from Prisma
              return { email: "This email is already being used" }
            } else {
              return { [FORM_ERROR]: error.toString() }
            }
          }
        }}
      >
        <LabeledTextField name="email" label="Email" placeholder="Email" />
        <LabeledTextField name="password" label="Password" placeholder="Password" type="password" />
      </Form>
    </div>
  )
}
*/
