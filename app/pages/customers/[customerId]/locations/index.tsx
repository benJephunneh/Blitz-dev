import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, useParam, BlitzPage, Routes } from "blitz"
import SidebarLayout from "app/core/layouts/SidebarLayout"
import getLocations from "app/locations/queries/getLocations"

const ITEMS_PER_PAGE = 100

export const LocationsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const customerId = useParam("customerId", "number")
  const [{ locations, hasMore }] = usePaginatedQuery(getLocations, {
    where: { customer: { id: customerId! } },
    orderBy: { street: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {locations.map((location) => (
          <li key={location.id}>
            <Link
              href={Routes.ShowLocationPage({ customerId: customerId!, locationId: location.id })}
            >
              <a>{location.number}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const LocationsPage: BlitzPage = () => {
  const customerId = useParam("customerId", "number")

  return (
    <>
      <Head>
        <title>Locations</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewLocationPage({ customerId: customerId! })}>
            <a>Create Location</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <LocationsList />
        </Suspense>
      </div>
    </>
  )
}

LocationsPage.authenticate = true
LocationsPage.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>

export default LocationsPage
