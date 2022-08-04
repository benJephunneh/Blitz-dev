import { Link, useRouter, useMutation, useParam, BlitzPage, Routes } from "blitz"
import { Button } from "@chakra-ui/react"
import createLocation from "app/locations/mutations/createLocation"
import { LocationForm, FORM_ERROR } from "app/locations/components/LocationForm"
import BoxLayout from "app/core/layouts/BoxLayout"

const NewLocationPage: BlitzPage = () => {
  const router = useRouter()
  const customerId = useParam("customerId", "number")
  const [createLocationMutation] = useMutation(createLocation)

  return (
    <>
      <LocationForm
        submitText="Create Location"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateLocation}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const location = await createLocationMutation({ ...values, customerId: customerId! })
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

      <p>
        <Link href={Routes.LocationsPage({ customerId: customerId! })}>
          <Button as="a" w="full">
            Locations
          </Button>
        </Link>
      </p>
    </>
  )
}

NewLocationPage.authenticate = true
NewLocationPage.getLayout = (page) => (
  <BoxLayout title={"Create"} description="Create a new location">
    {page}
  </BoxLayout>
)

export default NewLocationPage
