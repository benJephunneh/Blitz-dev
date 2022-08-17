import { Suspense, useState } from "react"
import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import { Button, Flex, Grid, GridItem, Text, VStack } from "@chakra-ui/react"
import { ImCross } from "react-icons/im"
import createCustomer from "app/customers/mutations/createCustomer"
import { CustomerForm, FORM_ERROR } from "app/customers/components/CustomerForm"
import PlainLayout from "app/core/layouts/PlainLayout"
import GradientBorder from "app/core/components/GradientBorder"
import { Customer } from "./[customerId]"

export const NewCustomer = () => {
  const router = useRouter()
  const [createCustomerMutation] = useMutation(createCustomer)
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  // const handleChange = (e) => {
  //   if (e.target.name === "firstname") {
  //     setFirstname(e.target.value)
  //   } else if (e.target.name === "lastname") {
  //     setLastname(e.target.value)
  //   }
  // }

  return (
    <Flex w="auto" position="relative">
      <Grid
        w="full"
        justifyItems="left"
        alignItems="center"
        templateAreas={`"form submission ."`}
        gridTemplateColumns={"1fr 1fr 1fr"}
        columnGap={3}
      >
        <GridItem area="form">
          <VStack spacing={2}>
            <CustomerForm
              submitText="Create customer"
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
            <Link href={Routes.CustomersPage()}>
              <Button as="a" color="#ff0a4c" w="full" rightIcon={<ImCross size={10} />}>
                Cancel
              </Button>
            </Link>
          </VStack>
        </GridItem>
      </Grid>
    </Flex>
  )
}

const NewCustomerPage: BlitzPage = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <NewCustomer />
      </Suspense>
    </>
  )
}

NewCustomerPage.authenticate = false // false for dev, only
NewCustomerPage.getLayout = (page) => <PlainLayout title="Create new customer">{page}</PlainLayout>

export default NewCustomerPage
