import { Form, FormProps } from "app/core/components/Form"
import { z } from "zod"
import LabeledTextField from "app/core/components/LabeledTextField"
import LabeledSelectField from "app/core/components/LabeledSelectField"

export function SignupForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledTextField name="username" placeholder="Username" />
      <LabeledTextField name="email" type="email" placeholder="Email" />
      <LabeledTextField name="password" type="password" placeholder="Password" />
      <LabeledSelectField name="role" bg="gray.100" w="max-content" defaultValue="Tech">
        <option value="Owner">Owner</option>
        <option value="Admin">Admin</option>
        <option value="Tech">Tech</option>
      </LabeledSelectField>
    </Form>
  )
}

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
