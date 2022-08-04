import { Link, useRouter, BlitzPage, Routes, useMutation, Head } from "blitz"
import { Button, Stack, useToast } from "@chakra-ui/react"
import BoxLayout from "app/core/layouts/BoxLayout"
import { CustomerForm2 as CustomerForm } from "app/customers/components/CustomerForm2"
import createCustomer from "app/customers/mutations/createCustomer"
import { FORM_ERROR } from "app/core/components/Form"
import { CreateCustomer as createCustomerSchema } from "app/customers/validations"

const NewCustomerPage: BlitzPage = () => {
  const [createCustomerMutation] = useMutation(createCustomer)
  const router = useRouter()

  return (
    <Stack spacing={8}>
      <CustomerForm
        submitText="Create customer"
        schema={createCustomerSchema}
        initialValues={{ firstname: "", lastname: "" }}
        onSubmit={async (values) => {
          try {
            const customer = await createCustomerMutation({ ...values })
            router.push(Routes.ShowCustomerPage({ customerId: customer.id }))
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.CustomersPage()}>
          <Button as="a" w="full">
            Customers
          </Button>
        </Link>
      </p>
    </Stack>
  )
}

NewCustomerPage.authenticate = { redirectTo: Routes.LoginPage() }
NewCustomerPage.getLayout = (page) => (
  <BoxLayout title={"Create"} description="Create a new customer">
    {page}
  </BoxLayout>
)

export default NewCustomerPage
