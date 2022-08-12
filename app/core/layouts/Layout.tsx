import { Box, useColorModeValue } from "@chakra-ui/react"
import { Head, BlitzLayout } from "blitz"
import { ReactNode } from "react"

const Layout: BlitzLayout<{ title?: string; children?: ReactNode }> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title || "blitz-dev"}</title>
        <link rel="icon" href="/abst icon.ico" />
      </Head>

      {children}
    </>
  )
}

export default Layout
