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

const ProfilePage: BlitzPage = () => {
  // const router = useRouter()
  const username = useParam("username", "string")
  const currentUser = useCurrentUser()

  return (
    <VStack w="full" h="full" p={10} spacing={10} alignItems="flex-start">
      <Heading size="lg" alignItems="center">
        {username}
      </Heading>
      <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
        <GridItem colSpan={1}>
          <Text fontSize="md">{currentUser!.email}</Text>
        </GridItem>
        <GridItem colSpan={1}>
          <Text fontSize="md" fontStyle="italic">
            {currentUser!.role}
          </Text>
        </GridItem>
        <GridItem colSpan={2}>
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
