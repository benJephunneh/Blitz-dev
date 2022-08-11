import { Button, FormControl, FormLabel, HStack, Input, VStack } from "@chakra-ui/react"
import { FORM_ERROR } from "app/core/components/Form"
import { AuthenticationError, PromiseReturnType, useMutation } from "blitz"
import { resolveConfig } from "prettier"
import { ReactNode } from "react"
import { useForm } from "react-hook-form"
import login from "../mutations/login"

type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void
  children?: ReactNode
}

export default function ChakraLoginForm<LoginFormProps>({ onSuccess, children }) {
  const [loginMutation] = useMutation(login)
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()

  function onSubmit(values: any) {
    return new Promise((resolve) => {
      resolve(loginMutation(values))
    })
      .then((user) => onSuccess?.(user))
      .catch((error) => handleError(error))
  }

  function handleError(error: any) {
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <VStack w="full">
          <Input
            id="username"
            placeholder="Username"
            {...register("username", { required: true })}
          />
          <Input
            id="password"
            placeholder="Password"
            type="password"
            {...register("password", { required: true })}
          />
        </VStack>
        <HStack py={2} spacing="auto">
          <Button type="submit" size="sm" variant="ghost" isLoading={isSubmitting}>
            Log in
          </Button>
          {children}
        </HStack>
      </FormControl>
    </form>
  )
}
