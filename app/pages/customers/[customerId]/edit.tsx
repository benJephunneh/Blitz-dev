import { Suspense, useState } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import PlainLayout from "app/core/layouts/PlainLayout"
import getCustomer from "app/customers/queries/getCustomer"
import updateCustomer from "app/customers/mutations/updateCustomer"
import { CustomerForm, FORM_ERROR } from "app/customers/components/CustomerForm"
import { Button, Flex, Grid, GridItem, VStack } from "@chakra-ui/react"
import GradientBorder from "app/core/components/GradientBorder"
import { ImCross } from "react-icons/im"

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
  // const fullname = `${customer.firstname} ${customer.lastname}`
  const [firstname, setFirstname] = useState(customer.firstname)
  const [lastname, setLastname] = useState(customer.lastname)
  const handleChange = (e) => {
    if (e.target.name === "firstname") {
      console.log(e.target.value)
      setFirstname(e.target.value)
    } else if (e.target.name === "lastname") {
      console.log(e.target.value)
      setLastname(e.target.value)
    }
  }

  return (
    <>
      <Head>
        <title>
          {firstname} {lastname}
        </title>
      </Head>

      <Flex m={5} w="auto" position="relative" overflow="hidden">
        <Grid
          w="full"
          justifyItems="left"
          alignItems="center"
          templateAreas={`"form submission"`}
          gridTemplateColumns={"1fr 1fr"}
          columnGap={3}
        >
          <GridItem area="form">
            <VStack spacing={2}>
              <CustomerForm
                submitText="Update Customer"
                // TODO use a zod schema for form validation
                //  - Tip: extract mutation's schema into a shared `validations.ts` file and
                //         then import and use it here
                // schema={UpdateCustomer}
                initialValues={customer}
                onChange={handleChange}
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
              <Link href={Routes.ShowCustomerPage({ customerId: customer.id })}>
                <Button as="a" color="#ff0a4c" w="full" rightIcon={<ImCross size={10} />}>
                  Cancel
                </Button>
              </Link>
            </VStack>
          </GridItem>
          <GridItem area="submission">
            <GradientBorder fontSize={40}>{`${firstname} ${lastname}`}</GradientBorder>
          </GridItem>
        </Grid>
      </Flex>
    </>
  )
}

const EditCustomerPage: BlitzPage = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <EditCustomer />
      </Suspense>
    </>
  )
}

EditCustomerPage.authenticate = true
EditCustomerPage.getLayout = (page) => <PlainLayout title="Edit customer">{page}</PlainLayout>

export default EditCustomerPage
