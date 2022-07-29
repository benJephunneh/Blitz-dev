import { Button, GridItem, Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react"
import PrefetchQueryClient from "app/core/helpers/prefetchQueryClient"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import PlainLayout from "app/core/layouts/PlainLayout"
import getCurrentUser from "app/users/queries/getCurrentUser"
import profileQuery from "app/users/queries/getUserProfile"
import {
  BlitzPage,
  GetServerSideProps,
  Link,
  NotFoundError,
  Routes,
  useParam,
  useRouter,
} from "blitz"
import { Suspense } from "react"

const ProfilePage: BlitzPage = () => {
  // const router = useRouter()
  const username = useParam("username", "string")
  const currentUser = useCurrentUser({ suspense: true })

  return (
    <VStack w="500px" h="100vh" p={10} spacing={10} alignItems="flex-start" justify="left">
      <Heading size="lg" alignItems="center">
        {username}
      </Heading>
      <SimpleGrid row={1} columnGap={3} w="full">
        <GridItem>
          <Suspense>
            <Link href={`mailto:${currentUser!.email}`} passHref>
              <Text as="a" fontSize="lg">
                {`${currentUser!.email}`}
              </Text>
            </Link>
          </Suspense>
        </GridItem>
        <GridItem>
          <Text fontSize="lg" fontStyle="bold">
            {currentUser!.role}
          </Text>
        </GridItem>
        <GridItem>
          <Link href={Routes.Home()} passHref>
            <Button as="a" w="full">
              Return home
            </Button>
          </Link>
        </GridItem>
      </SimpleGrid>
    </VStack>
  )
}

ProfilePage.getLayout = (page) => <PlainLayout>{page}</PlainLayout>

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const client = new PrefetchQueryClient(ctx)

  try {
    const username = ctx.params?.username as string
    await client.prefetchQuery(profileQuery, { username })
  } catch (error) {
    if (error instanceof NotFoundError) {
      return { notFound: true }
    } else {
      throw error
    }
  }

  return {
    props: {
      dehydratedState: client.dehydrate(),
    },
  }
}

export default ProfilePage
