import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getCustomer from "app/customers/queries/getCustomer"
import updateCustomer from "app/customers/mutations/updateCustomer"
import { FORM_ERROR } from "app/customers/components/CustomerForm"
import CustomerForm from "app/customers/components/CustomerForm"
import { useToast } from "@chakra-ui/react"
// Should probably be an UpdateCustomerForm

export const EditCustomer = () => {
  const router = useRouter()
  const toast = useToast()
  const customerId = useParam("customerId", "number")
  const [customer, { setQueryData }] = useQuery(
    getCustomer,
    { id: customerId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  return (
    <>
      <CustomerForm
        title="Edit customer"
        editCustomer
        onSuccess={() => {
          toast({
            title: "Update successful",
            description: `${customer.firstname} ${customer.lastname} successfully updated.`,
            status: "success",
          })
        }}
      />
      <pre>{JSON.stringify(customer, null, 2)}</pre>
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
