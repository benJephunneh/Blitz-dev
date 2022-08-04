import { Button, Input, VStack } from "@chakra-ui/react"
import Form, { FORM_ERROR } from "app/core/components/Form"
import { Head, PromiseReturnType, useMutation } from "blitz"
import { FC } from "react"
import { useForm } from "react-hook-form"
import createCustomer from "../mutations/createCustomer"
import updateCustomer from "../mutations/updateCustomer"
export { FORM_ERROR } from "app/core/components/Form"

type CustomerFormProps = {
  title: string
  newCustomer?: boolean | undefined
  editCustomer?: boolean | undefined
  onSuccess?: (customer: PromiseReturnType<typeof createCustomer>) => void
}

const CustomerForm: FC<CustomerFormProps> = ({ title, newCustomer, editCustomer, onSuccess }) => {
  const CustomerMutation = async (mutation, values) => {
    const [customerMutation] = useMutation(mutation)
    const customer = await customerMutation(values)

    return customer
  }

  // const customerMutation = (() => {
  //   if (newCustomer) {
  //     return CustomerMutation(createCustomer)
  //   } else if (editCustomer) {
  //     return CustomerMutation(updateCustomer)
  //   }
  // })

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
      if (newCustomer) {
        const customer = CustomerMutation(createCustomer, values)
        onSuccess?.(customer)
      } else if (editCustomer) {
        const customer = CustomerMutation({ updateCustomer }, values)
        onSuccess?.(customer)
      }
    } catch (error: any) {
      handleError(error)
    }
  }

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <h1>{title}</h1>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <VStack w="full">
          <Input placeholder="First name" {...register("firstname", { required: true })} />
          <Input placeholder="Last name" {...register("lastname", { required: true })} />
          <Button type="submit" w="full" bg="green.200">
            Submit
          </Button>
        </VStack>
      </Form>
    </>
  )
}

export default CustomerForm
