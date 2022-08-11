import { Button, FormControl, FormLabel, HStack, Input, Select, VStack } from "@chakra-ui/react"
import { t } from "@chakra-ui/styled-system/dist/declarations/src/utils"
import { FORM_ERROR } from "app/core/components/Form"
import { AuthenticationError, useMutation } from "blitz"
import { useForm } from "react-hook-form"
import { z } from "zod"
import signup from "../mutations/signup"

type SignupFormProps = {
  onSuccess?: () => void
}

export default function ChakraSignup<SignupFormProps>({ onSuccess }) {
  const [signupMutation] = useMutation(signup)
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()

  function onSubmit(values: any) {
    return new Promise((resolve) => {
      resolve(signupMutation(values))
    })
      .then((user) => onSuccess?.(user))
      .catch((error) => handleError(error))
  }

  function handleError(error: any) {
    if (error) {
      return {
        [FORM_ERROR]: "Something is knot rite.",
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
          <Select id="role" bg="gray.100" w="max-content" defaultValue="Tech">
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
    </form>
  )
}
