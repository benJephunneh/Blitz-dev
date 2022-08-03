import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getCustomer from "app/customers/queries/getCustomer"
import updateCustomer from "app/customers/mutations/updateCustomer"
import { FORM_ERROR } from "app/customers/components/CustomerForm"
import { CustomerForm } from "app/customers/components/CustomerForm"
// Should probably be an UpdateCustomerForm

export const EditCustomer = () => {
  const router = useRouter()
  const customerId = useParam("customerId", "number")
  const [customer, { setQueryData }] = useQuery(
    getCustomer,
    { id: customerId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateCustomerMutation] = useMutation(updateCustomer)

  return (
    <>
      <Head>
        <title>Edit Customer {customer.id}</title>
      </Head>

      <div>
        <h1>Edit Customer {customer.id}</h1>
        <pre>{JSON.stringify(customer, null, 2)}</pre>

        <CustomerForm
          submitText="Update Customer"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateCustomer}
          initialValues={customer}
          onSubmit={async (values) => {
            try {
              const updated = await updateCustomerMutation({
                id: customer.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowCustomerPage({ customerId: updated.id }))
            } catch (error: any) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditCustomerPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditCustomer />
      </Suspense>

      <p>
        <Link href={Routes.CustomersPage()}>
          <a>Customers</a>
        </Link>
      </p>
    </div>
  )
}

EditCustomerPage.authenticate = true
EditCustomerPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditCustomerPage
