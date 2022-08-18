import { Suspense, useState } from "react"
import { Head, useRouter, useQuery, useParam, BlitzPage, Routes, Link } from "blitz"
import PlainLayout from "app/core/layouts/PlainLayout"
import getCustomer from "app/customers/queries/getCustomer"
import {
  Button,
  ButtonGroup,
  HStack,
  IconButton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Text,
  Tabs,
  VStack,
} from "@chakra-ui/react"
import { FaEdit, FaPlus } from "react-icons/fa"
import { TiArrowBack } from "react-icons/ti"
import getLocations from "app/locations/queries/getLocations"

export const Customer = () => {
  const router = useRouter()
  const [sortBy, setSortBy] = useState("street")
  const customerId = useParam("customerId", "number")
  const [customer] = useQuery(getCustomer, { id: customerId })
  const fullname = `${customer.firstname} ${customer.lastname}`

  const [{ locations }] = useQuery(getLocations, {
    where: { customerId: customer.id },
    orderBy: { street: "asc" },
  })

  return (
    <>
      <Head>
        <title>{fullname}</title>
      </Head>

      <Tabs variant="enclosed">
        <TabList>
          <Tab>
            <ButtonGroup isAttached>
              <Button fontSize={30} variant="unstyled">
                {fullname}
              </Button>
              <Button
                pr={0}
                fontSize={30}
                variant="ghost"
                justifyContent="left"
                leftIcon={<FaEdit size={15} />}
                onClick={() => router.push(Routes.EditCustomerPage({ customerId: customer.id }))}
              />
            </ButtonGroup>
          </Tab>
          <Tab>Jobs</Tab>
          <Tab>Estimates</Tab>
          <Tab>Invoices</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Tab>
              <VStack alignItems="left" spacing={2}>
                <Button
                  pl={0}
                  aria-label="Add location"
                  rightIcon={<FaPlus />}
                  variant="link"
                  color="#009a4c"
                  justifyContent="left"
                  onClick={() => router.push(Routes.NewLocationPage({ customerId: customer.id }))}
                >
                  Add location
                </Button>
                {locations.map((location) => (
                  <Button
                    pl={0}
                    variant="link"
                    justifyContent="left"
                    onClick={() =>
                      router.push(
                        Routes.ShowLocationPage({
                          customerId: customer.id,
                          locationId: location.id,
                        })
                      )
                    }
                  >
                    {`${location.number} ${location.street}, ${location.city} ${location.zipcode}`}
                  </Button>
                ))}
              </VStack>
            </Tab>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}

const ShowCustomerPage: BlitzPage = () => {
  const router = useRouter()
  return (
    <div>
      <Button
        leftIcon={<TiArrowBack />}
        variant="ghost"
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
ShowCustomerPage.getLayout = (page) => <PlainLayout title="Customer">{page}</PlainLayout>

export default ShowCustomerPage
