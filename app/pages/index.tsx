import { FC, Suspense } from "react"
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
  Icon,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react"
import PlainLayout from "app/core/layouts/PlainLayout"
import { IconType } from "react-icons"
import { FcConferenceCall, FcGlobe } from "react-icons/fc"

const links = [
  {
    name: "Customers",
    href: "/customers",
  },
  {
    name: "Locations",
    href: "/customers/locations",
  },
  {
    name: "Jobs",
    href: "/customers/locations/jobs",
  },
]

type IconCardProps = {
  icon: IconType
  title: string
  text: string | JSX.Element
  actionLink?: RouteUrlObject
  actionText?: string
}

const IconCard: FC<IconCardProps> = ({ icon, title, text, actionLink, actionText }) => {
  return (
    <Box bg={useColorModeValue("white", "gray.800")} p={5} borderRadius="md" textAlign="center">
      <Icon as={icon} w={8} h={8} mb={2} />
      <Heading size="md" mb={2}>
        {title}
      </Heading>
      <Text opacity="0.8">{text}</Text>

      {actionLink && actionText && (
        <Link href={actionLink} passHref>
          <Button isFullWidth as="a" mt={5}>
            {actionText}
          </Button>
        </Link>
      )}
    </Box>
  )
}

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

const Home: BlitzPage = () => {
  const branch = "master/dev/chakra/chakra-rhf"

  const session = useSession({ suspense: false })
  const isLoggedIn = !!session.userId

  return (
    <>
      <Box>
        <Container maxWidth="container.xl" padding={4}>
          {/*
      <VStack alignItems="flex-start">
        <HStack>
          <Suspense fallback="Logging in...">
            <Logo />
          </Suspense>
          <Heading>First things first...</Heading>
        </HStack>
        <VStack alignItems="flex-start" spacing={0}>
          <Code>blitz generate all customer firstname lastname locations:Location[]</Code>
          <Text fontSize="sm">
            Select <strong>No</strong> to skip Prisma migration.
          </Text>
          <br />
          <Code>
            blitz generate all location primary:boolean:default=true number:int street city
            state:string:default=&#34;FL&#34; zipcode:int block:string? \<br />
            lot:int? parcel:string? --parent=customer belongsTo:customer
          </Code>
          <Text fontSize="sm" paddingY={0}>
            Select <strong>Yes</strong> to run Prisma migration.
          </Text>
          <Text paddingY={3}>
            Then <strong>start the server</strong>: <Code>blitz dev</Code>
          </Text>
        </VStack>
      </VStack>
      */}

          <Flex height="75vh" paddingY={20}>
            <VStack width="full" height="full" padding={10} spacing={10} alignItems="flex-start">
              <IconCard icon={FcConferenceCall} title="Customers" text="View list of customers" />
              <IconCard icon={FcGlobe} title="Locations" text="View customer locations" />
              {/*
              <Suspense>
                <UserInfo />
              </Suspense>
    */}
            </VStack>
            <VStack
              width="full"
              height="full"
              padding={10}
              spacing={10}
              alignItems="flex-start"
              background="gray.50"
            >
              {links.map((link) => {
                return (
                  <Suspense key={link.name} fallback="Loading...">
                    <Link href={link.href}>
                      <a>{link.name}</a>
                    </Link>
                  </Suspense>
                )
              })}
            </VStack>
          </Flex>

          {/*
      <div className="container">
        <main>
          <p>
            Then <strong>restart the server</strong>
          </p>
          <pre>
            <code>blitz dev</code>
          </pre>
          <p>
            and go to{" "}
            <Link href="/customers">
              <a>/customers</a>
            </Link>
            <br />
            or{" "}
            <Link href="/locations">
              <a>/customers/locations</a>
            </Link>
          </p>
          <div style={{ marginBottom: "1rem" }}></div>
          <div>
            <p>
              Then <strong>restart the server</strong>
            </p>
            <pre>
              <code>blitz dev</code>
            </pre>
            <p>
              and go to{" "}
              <Link href="/customers">
                <a>/customers</a>
              </Link>
              <br />
              or{" "}
              <Link href="/locations">
                <a>/customers/locations</a>
              </Link>
            </p>
          </div>
          <div className="buttons" style={{ marginTop: "5rem" }}>
            <a
              className="button"
              href="https://blitzjs.com/docs/getting-started?utm_source=blitz-new&utm_medium=app-template&utm_campaign=blitz-new"
              target="_blank"
              rel="noopener noreferrer"
            >
              Documentation
            </a>
            <a
              className="button-outline"
              href="https://github.com/blitz-js/blitz"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github Repo
            </a>
            <a
              className="button-outline"
              href="https://discord.blitzjs.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Discord Community
            </a>
          </div>
        </main>
      </div>
            */}

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

          {/*
          <style jsx global>{`
            @import url("https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@300;700&display=swap");

            html,
            body {
              padding: 0;
              margin: 0;
              font-family: "Libre Franklin", -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
                Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
            }

            * {
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              box-sizing: border-box;
            }

            .container {
              min-height: 100vh;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            }

            main {
              padding: 5rem 0;
              flex: 1;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            }

            main p {
              font-size: 1.2rem;
            }

            p {
              text-align: center;
            }

            footer {
              width: 100%;
              height: 60px;
              border-top: 1px solid #eaeaea;
              display: flex;
              justify-content: center;
              align-items: center;
              background-color: #45009d;
            }

            footer a {
              display: flex;
              justify-content: center;
              align-items: center;
            }

            footer a {
              color: #f4f4f4;
              text-decoration: none;
            }

            .logo {
              margin-bottom: 2rem;
            }

            .logo img {
              width: 300px;
            }

            .buttons {
              display: grid;
              grid-auto-flow: column;
              grid-gap: 0.5rem;
            }
            .button {
              font-size: 1rem;
              background-color: #6700eb;
              padding: 1rem 2rem;
              color: #f4f4f4;
              text-align: center;
            }

            .button.small {
              padding: 0.5rem 1rem;
            }

            .button:hover {
              background-color: #45009d;
            }

            .button-outline {
              border: 2px solid #6700eb;
              padding: 1rem 2rem;
              color: #6700eb;
              text-align: center;
            }

            .button-outline:hover {
              border-color: #45009d;
              color: #45009d;
            }

            pre {
              background: #fafafa;
              border-radius: 5px;
              padding: 0.75rem;
              text-align: center;
            }

            code {
              font-size: 0.9rem;
              font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono,
                Bitstream Vera Sans Mono, Courier New, monospace;
            }
            codeblock {
              margin: 0;
              padding: 1rem 0;
              font-size: 0.9rem;
              font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono,
                Bitstream Vera Sans Mono, Courier New, monospace;
              width: 100%;
              display: flex;
              flex-wrap: wrap;
              justify-content: center;
              align-itmes: center;
              background-color: #070707;
              color: #ffffff;
            }

            .grid {
              display: flex;
              align-items: center;
              justify-content: center;
              flex-wrap: wrap;

              max-width: 800px;
              margin-top: 3rem;
            }

            @media (max-width: 600px) {
              .grid {
                width: 100%;
                flex-direction: column;
              }
            }
          `}</style>
      */}
        </Container>
      </Box>
    </>
  )
}

// Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <PlainLayout title="Home">{page}</PlainLayout>

export default Home
