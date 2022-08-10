import { GridItem, Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react"
import PlainLayout from "app/core/layouts/PlainLayout"
import { BlitzPage, Link, Routes, useParam, useSession } from "blitz"
import { useCurrentUser } from "header/app/core/hooks/useCurrentUser"

const ProfilePage: BlitzPage = () => {
  const username = useParam("username", "string")
  const currentUser = useCurrentUser({ suspense: true })

  return (
    <VStack w="500px" h="100vh" p={10} spacing={10} alignItems="flex-start" justify="left">
      <Heading size="lg" alignItems="center">
        {username}
      </Heading>
      <SimpleGrid row={1} columnGap={3} w="full">
        <GridItem>
          <Link href={`mailto:${currentUser!.email}`} passHref>
            <Text as="a" fontSize="lg" fontStyle="italic">
              {currentUser!.email}
            </Text>
          </Link>
        </GridItem>
        {/*
        <GridItem>
          <Text fontSize="lg" fontStyle="bold">
            {currentUser!.role}
          </Text>
        </GridItem>
        <GridItem>
          <Link href={Routes.ChangePasswordPage({ username })} passHref>
            <Button as="a" w="full" bg="green.100">
              Change password
            </Button>
          </Link>
        </GridItem>
        <GridItem>
          <Link href={Routes.Home()} passHref>
            <Button as="a" w="full">
              Return home
            </Button>
          </Link>
        </GridItem>
        */}
      </SimpleGrid>
    </VStack>
  )
}

ProfilePage.getLayout = (page) => <PlainLayout>{page}</PlainLayout>
ProfilePage.authenticate = { redirectTo: Routes.LoginPage() }

export default ProfilePage
