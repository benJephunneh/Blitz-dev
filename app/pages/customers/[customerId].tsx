import { Suspense } from "react"
import { Head, useRouter, useQuery, useParam, BlitzPage, Routes } from "blitz"
import PlainLayout from "app/core/layouts/PlainLayout"
import getCustomer from "app/customers/queries/getCustomer"
import {
  Button,
  HStack,
  IconButton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react"
import { FaEdit, FaPlus } from "react-icons/fa"
import { TiArrowBack } from "react-icons/ti"
import getLocations from "app/locations/queries/getLocations"

export const Customer = () => {
  const router = useRouter()
  const customerId = useParam("customerId", "number")
  const [customer] = useQuery(getCustomer, { id: customerId })
  const fullname = `${customer.firstname} ${customer.lastname}`

  const [{ locations }] = useQuery(getLocations, {
    where: { customerId: customer.id },
    orderBy: { updatedAt: "desc" },
  })

  return (
    <>
      <Head>
        <title>{fullname}</title>
      </Head>

      <HStack>
        <Button fontSize={30} variant="ghost" rightIcon={<FaEdit size={15} />}>
          {fullname}
        </Button>
        <Tabs variant="enclosed">
          <TabList>
            <Tab>
              Locations
              <IconButton
                aria-label="New location"
                icon={<FaPlus />}
                variant="ghost"
                onFocus={() => {
                  router.push(Routes.NewLocationPage({ customerId: customer.id }))
                }}
              />
            </Tab>
            <Tab>Jobs</Tab>
            <Tab>Estimates</Tab>
            <Tab>Invoices</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {locations.map(
                (location) =>
                  `${location.number} ${location.street}, ${location.city}  ${location.zipcode}`
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </HStack>
    </>
  )
}

const ShowCustomerPage: BlitzPage = () => {
  const router = useRouter()
  return (
    <div>
      <Button
        leftIcon={<TiArrowBack />}
        onClick={() => {
          router.push(Routes.CustomersPage())
        }}
      >
        Customers
      </Button>

      <Suspense fallback={<div>Loading...</div>}>
        <Customer />
      </Suspense>
    </div>
  )
}

ShowCustomerPage.authenticate = true
ShowCustomerPage.getLayout = (page) => <PlainLayout>{page}</PlainLayout>

export default ShowCustomerPage
