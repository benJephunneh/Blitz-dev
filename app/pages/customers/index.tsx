import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import PlainLayout from "app/core/layouts/PlainLayout"
import getCustomers from "app/customers/queries/getCustomers"
import { Button, ButtonGroup, Flex, VStack } from "@chakra-ui/react"
import { TiArrowLeft, TiArrowRight, TiPlus } from "react-icons/ti"
import CustomerEntry from "app/customers/components/CustomerEntry"

const ITEMS_PER_PAGE = 100

export const CustomersList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ customers, hasMore }] = usePaginatedQuery(getCustomers, {
    orderBy: { lastname: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <Flex w="auto" position="relative">
      <VStack alignItems="left" spacing={2}>
        <VStack justify="left" alignItems="center" spacing={0}>
          {customers.map((customer) => (
            <CustomerEntry customer={customer} />
          ))}
        </VStack>

        <ButtonGroup isAttached>
          <Button disabled={page === 0} leftIcon={<TiArrowLeft />} onClick={goToPreviousPage}>
            Previous
          </Button>
          <Button
            variant="outline"
            bg="#009a4c"
            textColor="#eeea31"
            rightIcon={<TiPlus />}
            onClick={() => router.push(Routes.NewCustomerPage())}
            _hover={{ bg: "#eeea31", textColor: "#009a4c" }}
          >
            Create Customer
          </Button>
          <Button disabled={!hasMore} rightIcon={<TiArrowRight />} onClick={goToNextPage}>
            Next
          </Button>
        </ButtonGroup>
      </VStack>
    </Flex>
  )
}

const CustomersPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Customers</title>
      </Head>

      <div>
        <p></p>

        <Suspense fallback={<div>Loading...</div>}>
          <CustomersList />
        </Suspense>
      </div>
    </>
  )
}

CustomersPage.authenticate = false
CustomersPage.getLayout = (page) => <PlainLayout title="Customers">{page}</PlainLayout>

export default CustomersPage
