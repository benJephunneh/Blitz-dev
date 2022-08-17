import { Link, useRouter, useMutation, useParam, BlitzPage, Routes } from "blitz"
import PlainLayout from "app/core/layouts/PlainLayout"
import createLocation from "app/locations/mutations/createLocation"
import { LocationForm, FORM_ERROR } from "app/locations/components/LocationForm"
import { Button, Flex, Grid, GridItem, VStack } from "@chakra-ui/react"
import { ImCross } from "react-icons/im"

const NewLocationPage: BlitzPage = () => {
  const router = useRouter()
  const customerId = useParam("customerId", "number")
  const [createLocationMutation] = useMutation(createLocation)

  return (
    <Flex w="auto" position="relative">
      <Grid
        w="full"
        justifyItems="left"
        alignItems="center"
        templateAreas={`'form submission'`}
        gridTemplateColumns={"1fr 1fr 1fr"}
        columnGap={3}
      >
        <GridItem area="form">
          <VStack spacing={2}>
            <LocationForm
              submitText="Create Location"
              // TODO use a zod schema for form validation
              //  - Tip: extract mutation's schema into a shared `validations.ts` file and
              //         then import and use it here
              // schema={CreateLocation}
              // initialValues={{}}
              onSubmit={async (values) => {
                try {
                  const location = await createLocationMutation({
                    ...values,
                    customerId: customerId!,
                  })
                  router.push(
                    Routes.ShowLocationPage({ customerId: customerId!, locationId: location.id })
                  )
                } catch (error: any) {
                  console.error(error)
                  return {
                    [FORM_ERROR]: error.toString(),
                  }
                }
              }}
            />
            <Link href={Routes.ShowCustomerPage({ customerId: customerId! })}>
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

NewLocationPage.authenticate = true
NewLocationPage.getLayout = (page) => (
  <PlainLayout title={"Create New Location"}>{page}</PlainLayout>
)

export default NewLocationPage
