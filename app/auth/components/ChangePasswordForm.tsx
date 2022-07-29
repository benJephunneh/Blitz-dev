import { Button, Input, useToast, VStack } from "@chakra-ui/react"
import { FORM_ERROR } from "app/core/components/Form"
import { NotFoundError, PromiseReturnType, useMutation, useRouterQuery } from "blitz"
import { FC } from "react"
import { useForm } from "react-hook-form"
import changePassword from "../mutations/changePassword"

type ChangePasswordFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof changePassword>) => void
}

const ChangePasswordForm: FC<ChangePasswordFormProps> = ({ onSuccess }) => {
  const query = useRouterQuery()
  const [changePasswordMutation] = useMutation(changePassword)
  const toast = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const handleError = (error: any) => {
    if (error.name === "ChangePasswordError") {
      return {
        [FORM_ERROR]: error.message,
      }
    } else {
      return {
        [FORM_ERROR]: "Something wint rong: " + error.toString(),
      }
    }
  }
  console.log(errors)

  const onSubmit = async (values) => {
    try {
      await changePasswordMutation(values)
      onSuccess?.(true)
    } catch (error) {
      handleError(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack w="full">
        <Input placeholder="New password" type="password" />
        <Input placeholder="Confirm new password" type="password" {...register("password")} />
        <Button type="submit" w="full" bg="red.100">
          Change
        </Button>
      </VStack>
    </form>
  )
}

export default ChangePasswordForm
