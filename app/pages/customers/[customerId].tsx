import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import PlainLayout from "app/core/layouts/PlainLayout"
import getCustomer from "app/customers/queries/getCustomer"
import deleteCustomer from "app/customers/mutations/deleteCustomer"

export const Customer = () => {
  const router = useRouter()
  const customerId = useParam("customerId", "number")
  const [deleteCustomerMutation] = useMutation(deleteCustomer)
  const [customer] = useQuery(getCustomer, { id: customerId })
  const fullname = `${customer.firstname} ${customer.lastname}`

  return (
    <>
      <Head>
        <title>{fullname}</title>
      </Head>

      <div>
        <h1>{fullname}</h1>

        <Link href={Routes.EditCustomerPage({ customerId: customer.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteCustomerMutation({ id: customer.id })
              router.push(Routes.CustomersPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowCustomerPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.CustomersPage()}>
          <a>Customers</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Customer />
      </Suspense>
    </div>
  )
}

ShowCustomerPage.authenticate = true
ShowCustomerPage.getLayout = (page) => <PlainLayout>{page}</PlainLayout>

export default ShowCustomerPage
