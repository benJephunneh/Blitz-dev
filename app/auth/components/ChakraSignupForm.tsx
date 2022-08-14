import { PromiseReturnType, useMutation } from "blitz"
import { useForm } from "react-hook-form"
import { Button, FormControl, HStack, Input, Select, VStack } from "@chakra-ui/react"
import Form, { FORM_ERROR } from "app/core/components/Form"
import signup from "../mutations/signup"
import { FC } from "react"

type SignupFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof signup>) => void
}

const ChakraSignup: FC<SignupFormProps> = ({ onSuccess }) => {
  const [signupMutation] = useMutation(signup)
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()

  const onSubmit = async (values: any) => {
    return new Promise((resolve) => {
      resolve(signupMutation(values))
    })
      .then((user: PromiseReturnType<typeof signup>) => onSuccess?.(user))
      .catch((error) => handleError(error))
  }

  const handleError = (error: any) => {
    if (error.code === "P2002" && error.meta?.target?.includes("email")) {
      return { email: "This email is already in use." }
    } else if (error.code === "P2002" && error.meta?.target?.includes("username")) {
      return { username: "This username is already in use." }
    } else {
      return {
        [FORM_ERROR]: "Something is knot rite.",
      }
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <VStack w="full">
          <Input
            id="username"
            placeholder="Username"
            type="text"
            {...register("username", { required: true })}
          />
          <Input
            id="email"
            placeholder="Email"
            type="email"
            {...register("email", { required: true })}
          />
          <Input
            id="password"
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
          />
          <Select id="role" bg="gray.100" w="max-content" defaultValue="Tech" {...register("role")}>
            <option value="Owner">Owner</option>
            <option value="Admin">Admin</option>
            <option value="Tech">Tech</option>
          </Select>
        </VStack>
        <HStack py={2} spacing="auto">
          <Button type="submit" size="sm" variant="ghost" isLoading={isSubmitting}>
            Sign up
          </Button>
        </HStack>
      </FormControl>
    </Form>
  )
}

export default ChakraSignup
