import { Link, useRouter, BlitzPage, Routes } from "blitz"
import { Stack, useToast } from "@chakra-ui/react"
import BoxLayout from "app/core/layouts/BoxLayout"
import CustomerForm from "app/customers/components/CustomerForm"

const NewCustomerPage: BlitzPage = () => {
  const router = useRouter()
  const toast = useToast()

  return (
    <Stack spacing={8}>
      <CustomerForm
        title="Create new customer"
        newCustomer
        onSuccess={(_customer) => {
          // const next = router.query.next ? decodeURIComponent(router.query.next as string) : "/"
          // router.push(next)
          router.push(Routes.ShowCustomerPage({ customerId: _customer.id }))
          toast({
            title: `${_customer.firstname} ${_customer.lastname} added`,
            description: "Customer successfully added.",
            status: "success",
          })
        }}
      />

      <p>
        <Link href={Routes.CustomersPage()}>
          <a>Customers</a>
        </Link>
      </p>
    </Stack>
  )
}

NewCustomerPage.authenticate = { redirectTo: Routes.LoginPage() }
NewCustomerPage.getLayout = (page) => (
  <BoxLayout title={"Create New Customer"} description="Create a new customer">
    {page}
  </BoxLayout>
)

export default NewCustomerPage
