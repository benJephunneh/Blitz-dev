import { Button, Input, Stack, VStack } from "@chakra-ui/react"
import Form, { FORM_ERROR } from "app/core/components/Form"
import { PromiseReturnType, useMutation } from "blitz"
import { useForm } from "react-hook-form"
import createCustomer from "../mutations/createCustomer"
export { FORM_ERROR } from "app/core/components/Form"

type CustomerFormProps = {
  onSuccess?: (customer: PromiseReturnType<typeof createCustomer>) => void
}

// export function NewCustomerForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
const CustomerForm = (props: CustomerFormProps) => {
  const [newCustomerMutation] = useMutation(createCustomer)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  console.log(errors)

  const handleError = (error) => {
    return {
      [FORM_ERROR]: "Something wint rong: " + error.toString(),
    }
  }

  const onSubmit = async (values) => {
    try {
      const customer = await newCustomerMutation(values)
      props.onSuccess?.(customer)
    } catch (error: any) {
      handleError(error)
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <VStack w="full">
          <Input placeholder="First name" {...register("firstname", { required: true })} />
          <Input placeholder="Last name" {...register("lastname", { required: true })} />
          <Button type="submit" w="full" bg="green.200">
            Do it
          </Button>
        </VStack>
      </Form>
    </>
  )
}

export default CustomerForm
