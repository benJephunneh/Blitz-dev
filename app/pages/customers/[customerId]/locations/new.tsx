import { Link, useRouter, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createLocation from "app/locations/mutations/createLocation"
import { LocationForm, FORM_ERROR } from "app/locations/components/LocationForm"

const NewLocationPage: BlitzPage = () => {
  const router = useRouter()
  const customerId = useParam("customerId", "number")
  const [createLocationMutation] = useMutation(createLocation)

  return (
    <div>
      <h1>Create New Location</h1>

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
          <a>Locations</a>
        </Link>
      </p>
    </div>
  )
}

NewLocationPage.authenticate = true
NewLocationPage.getLayout = (page) => <Layout title={"Create New Location"}>{page}</Layout>

export default NewLocationPage
