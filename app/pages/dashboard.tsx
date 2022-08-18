import { Suspense } from "react"
import { Link, BlitzPage, useMutation, Routes, useSession, RouteUrlObject } from "blitz"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react"
import PlainLayout from "app/core/layouts/PlainLayout"
import { IconType } from "react-icons"
import { FcConferenceCall, FcGlobe } from "react-icons/fc"
import IconCard from "app/core/components/IconCard"

type IconCardProps = {
  icon: IconType
  title: string
  text: string | JSX.Element
  actionLink?: RouteUrlObject
  actionText?: string
}

// const IconCard: FC<IconCardProps> = ({ icon, title, text, actionLink, actionText }) => {
//   return (
//     <Box bg={useColorModeValue("white", "gray.800")} p={5} borderRadius="md" textAlign="center">
//       <Icon as={icon} w={8} h={8} mb={2} />
//       <Heading size="md" mb={2}>
//         {title}
//       </Heading>
//       <Text opacity="0.8">{text}</Text>
//
//       {actionLink && actionText && (
//         <Link href={actionLink} passHref>
//           <Button isFullWidth as="a" mt={5}>
//             {actionText}
//           </Button>
//         </Link>
//       )}
//     </Box>
//   )
// }

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  // const session = useSession({ suspense: true })
  // const isLoggedIn = !!session.userId

  // if (isLoggedIn) {
  if (currentUser) {
    return (
      <>
        <HStack>
          <button
            className="button small"
            onClick={async () => {
              await logoutMutation()
            }}
          >
            Logout
          </button>
          <div>
            User: <code>{currentUser.username}</code>
            <br />
            Role: <code>{currentUser.role}</code>
          </div>
        </HStack>
        <pre>{JSON.stringify(currentUser)}</pre>
      </>
    )
  } else {
    return (
      <>
        <HStack>
          <Link href={Routes.SignupPage()}>
            <a className="button small">
              <strong>Sign Up</strong>
            </a>
          </Link>
          <Link href={Routes.LoginPage()}>
            <a className="button small">
              <strong>Login</strong>
            </a>
          </Link>
        </HStack>
      </>
    )
  }
}

const Dashboard: BlitzPage = () => {
  const branch = "master/dev/chakra/chakra-rhf"
  const session = useSession({ suspense: false })
  const isLoggedIn = !!session.userId
  const currentUser = useCurrentUser({ suspense: false })

  return (
    <>
      <Box bg={useColorModeValue("gray.50", "gray.800")}>
        <Container as="main" maxWidth="container.sm" textAlign="center" py={{ base: 12, md: 20 }}>
          {isLoggedIn && (
            <>
              <Heading size="2xl" mb={2}>
                {currentUser?.username}
              </Heading>
              <Text fontSize="2xl" opacity="0.8">
                Ride the effluent.
              </Text>
            </>
          )}
        </Container>
      </Box>

      <Container as="main" maxW="container.lg" py={{ base: 12, md: 20 }}>
        <Flex height="75vh" paddingY={20}>
          <VStack width="full" height="full" padding={10} spacing={10} alignItems="flex-start">
            <IconCard icon={FcConferenceCall} title="Customers" text="View list of customers" />
            <IconCard icon={FcGlobe} title="Locations" text="View customer locations" />
          </VStack>
          <VStack
            width="full"
            height="full"
            padding={10}
            spacing={10}
            alignItems="flex-start"
            background="gray.50"
          ></VStack>
        </Flex>
        <footer>
          <Suspense>
            <HStack spacing={2}>
              <Button as="a" href="https://github.com/benJephunneh/Blitz-dev">
                Github - Blitz-dev
              </Button>
              <Button as="a" href="https://www.apalacheeseptic.com/">
                Apalachee Backhoe
              </Button>
            </HStack>
          </Suspense>
        </footer>

        <footer>
          <a
            href="https://blitzjs.com?utm_source=blitz-new&utm_medium=app-template&utm_campaign=blitz-new"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by Blitz.js
          </a>
        </footer>
      </Container>
    </>
  )
}

Dashboard.suppressFirstRenderFlicker = true
Dashboard.authenticate = { redirectTo: Routes.LoginPage() }
Dashboard.getLayout = (page) => (
  <PlainLayout title="Dashboard" description="Home page for logged-in users">
    {page}
  </PlainLayout>
)

export default Dashboard
