import { Box } from "@chakra-ui/react"
import { BlitzLayout, Head } from "blitz"
import { ReactNode } from "react"
import Header from "../components/header/Header"

type PlainLayoutProps = {
  title?: string
  description?: string
  children?: ReactNode
}

const PlainLayout: BlitzLayout<PlainLayoutProps> = ({ title, description, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header title={title} />

      <Box p={5} overflow="hidden">
        {children}
      </Box>
    </>
  )
}

export default PlainLayout
