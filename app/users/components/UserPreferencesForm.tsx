import { Heading, Input, useToast } from "@chakra-ui/react"
import Form, { FORM_ERROR } from "app/core/components/Form"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { BlitzPage, useMutation } from "blitz"
import { FC } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const UserPreferencesSchema = z.object({
  number1: z.number(),
  number2: z.number(),
})

type UserPreferencesFormProps = {
  onSuccess?: () => void
}

const UserPreferencesForm: FC<{ number1: number; number2: number }> = ({ number1, number2 }) => {
  const currentUser = useCurrentUser()
  const toast = useToast()

  // const [updatePreferencesMutation] = useMutation(updatePreferences)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  console.log(errors)

  const handleError = (error: any) => {
    if (error) {
      return {
        [FORM_ERROR]: "Something wint rong.",
      }
    }
  }

  const onSubmit = async () => {
    try {
      const sum = number1 + number2
      toast({
        title: "Successful calculation.",
        description: `${number1} + ${number2} = ${sum}`,
        status: "success",
      })
    } catch (error) {
      return {
        [FORM_ERROR]: "Something wint rong.",
      }
    }
  }

  return (
    <>
      <Heading size="lg">There are no preferences.</Heading>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input></Input>
      </Form>
    </>
  )
}

export default UserPreferencesForm