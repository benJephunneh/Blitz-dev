import { Suspense } from "react"
import { Image, Link, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import logo from "public/logo.png"
import abstLogo from "public/abst Logo.png"
import { Light as SyntaxHighlighter } from "react-syntax-highlighter"
import { github } from "react-syntax-highlighter/dist/cjs/styles/hljs"
import { Header } from "app/core/components/Header"
import { useState } from "react"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
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
      </>
    )
  } else {
    return (
      <>
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
      </>
    )
  }
}

const Logo = () => {
  const currentUser = useCurrentUser()

  if (currentUser) {
    return (
      <>
        <div className="logo">
          <Image src={abstLogo} alt="ABST logo" />
        </div>
      </>
    )
  } else {
    return (
      <>
        <div className="logo">
          <Image src={logo} alt="Blitz logo" />
        </div>
      </>
    )
  }
}

const Home: BlitzPage = () => {
  const [navIsOpen, setNavIsOpen] = useState(false)
  const branch = "master/dev/tailwind/banner"

  return (
    <div>
      <div className="overflow-hidden">
        <div>
          <div className="relative pb-1 md:pb-3 gap-y-24 xl:gap-y-44">
            <div className="z-30 text-white col-span-full">
              <Header
                className="px-6 mx-auto max-w-7xl"
                onNavToggle={(isOpen) => {
                  setNavIsOpen(isOpen)
                }}
                hasLightBg={true}
                stickyBgClass={false}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <main>
          <Suspense fallback="Logging in...">
            <Logo />
          </Suspense>
          <p>
            <strong>Congrats!</strong> Your app is ready, including user sign-up and log-in. <br />
            This is the <strong>{branch}</strong> branch.
          </p>
          <div className="buttons" style={{ marginTop: "1rem", marginBottom: "1rem" }}>
            <Suspense fallback="Logging in...">
              <UserInfo />
            </Suspense>
          </div>
          <p>
            To <strong>add a new model to your app</strong>,
            <br /> run the following in your terminal:
          </p>
          <div>
            <SyntaxHighlighter
              language="bash"
              style={github}
              className="rounded-lg border text-md sm:text-sm border-gray-200"
              customStyle={{
                padding: "0.5em",
              }}
            >
              {`
  blitz generate all customer \\
    firstname \\
    lastname \\
    locations:Location[]
              `.trim()}
            </SyntaxHighlighter>
          </div>
          <div style={{ marginBottom: "1rem" }}>(Select No to skip running prisma migrate)</div>
          <div>
            <SyntaxHighlighter
              language="bash"
              style={github}
              className="rounded-lg border text-md sm:text-sm border-gray-200"
              customStyle={{
                padding: "0.5em",
              }}
            >
              {`
  blitz generate all location \\
    primary:boolean:default=true \\
    number:int \\
    street \\
    city \\
    state:string:default="FL" \\
    zipcode:int \\
    block:string? \\
    lot:int? \\
    parcel:string? \\
    --parent=customer \\
    belongsTo:customer
              `.trim()}
            </SyntaxHighlighter>
          </div>
          <div style={{ marginBottom: "1rem" }}>(Select Yes to run prisma migrate)</div>
          <div style={{ marginBottom: "1rem" }}>
            (Now run <code>blitz prisma migrate dev</code>)
          </div>
          <div>
            <p>
              Then <strong>restart the server:</strong>
            </p>
            <SyntaxHighlighter
              language="bash"
              style={github}
              className="rounded-lg border text-md sm:text-sm border-gray-200"
              customStyle={{
                padding: "0.5em",
              }}
            >
              {`
  blitz dev
  `.trim()}
            </SyntaxHighlighter>
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
            href="https://blitzjs.com?utm_source=blitz-new&utm_medium=app-template&utm_campaign=blitz-new"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by Blitz.js
          </a>
        </footer>

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
            text-align: left;
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
      </div>
    </div>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
