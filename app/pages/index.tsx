import { Suspense } from "react"
import { Link, BlitzPage, useMutation, Routes } from "blitz"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import Logo from "app/core/components/Logo"
import Layout from "app/core/layouts/Layout"
import logout from "app/auth/mutations/logout"
import logo from "public/logo.png"
import { Light as SyntaxHighlighter } from "react-syntax-highlighter"
import { github } from "react-syntax-highlighter/dist/cjs/styles/hljs"
import { Code, Container, Flex, Heading, HStack, Stack, Text, VStack } from "@chakra-ui/react"
import { Image } from "blitz"
import abstIcon from "public/abst icon.png"

const links = [
  {
    name: "Customers",
    href: "/customers",
  },
  {
    name: "Locations",
    href: "/locations",
  },
  {
    name: "Blitzjs.com",
    href: "https://blitzjs.com/docs/getting-started?utm_source=blitz-new&utm_medium=app-template&utm_campaign=blitz-new",
  },
  {
    name: "Blitzjs Github",
    href: "https://github.com/blitz-js/blitz",
  },
]

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

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
  const branch = "master/dev/chakra/chakra-header"
  const currentUser = useCurrentUser()

  return (
    <Container maxWidth="container.xl" padding={4}>
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
      <Flex height="50vh" paddingY={20}>
        <VStack width="full" height="full" padding={10} spacing={10} alignItems="flex-start">
          <Suspense fallback="Logging in...">
            <UserInfo />
          </Suspense>
        </VStack>
        <VStack
          width="full"
          height="full"
          padding={10}
          spacing={10}
          alignItems="flex-start"
          background="gray.50"
        >
          {/*
          <Suspense fallback="Logging in...">
            {currentUser &&
              links.map((link) => {
                return (
                  <Suspense key={link.name} fallback="Loading...">
                    <Link href={link.href}>
                      <a>{link.name}</a>
                    </Link>
                  </Suspense>
                )
              })}
          </Suspense>
          */}
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

        <footer>
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

      <footer>
        <a
          href="https://blitzjs.com?utm_source=blitz-new&utm_medium=app-template&utm_campaign=blitz-new"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Blitz.js
        </a>
      </footer>
          */}
    </Container>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
