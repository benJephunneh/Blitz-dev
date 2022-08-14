import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createCustomer from "app/customers/mutations/createCustomer"
import { CustomerForm, FORM_ERROR } from "app/customers/components/CustomerForm"

const NewCustomerPage: BlitzPage = () => {
  const router = useRouter()
  const [createCustomerMutation] = useMutation(createCustomer)

  return (
    <div>
      <h1>Create New Customer</h1>

      <CustomerForm
        submitText="Create Customer"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateCustomer}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const customer = await createCustomerMutation(values)
            router.push(Routes.ShowCustomerPage({ customerId: customer.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.CustomersPage()}>
          <a>Customers</a>
        </Link>
      </p>
    </div>
  )
}

NewCustomerPage.authenticate = false // false for dev, only
NewCustomerPage.getLayout = (page) => <Layout title={"Create New Customer"}>{page}</Layout>

export default NewCustomerPage
