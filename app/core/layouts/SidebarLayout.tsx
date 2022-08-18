import { Container, Grid, GridItem } from "@chakra-ui/react"
import { BlitzLayout } from "blitz"
import { ReactNode } from "react"
import Header from "../components/header/Header"
import Navigation from "../components/Navigation"

type SidebarLayoutProps = {
  title?: string
  description?: string
  children?: ReactNode
}

const SidebarLayout: BlitzLayout<SidebarLayoutProps> = ({ title, description, children }) => {
  return (
    <>
      <Header title={title} />

      <Container as="main" maxW="container.lg" py={{ base: 5, md: 10 }}>
        <Grid templateColumns={{ base: "1fr", md: "1fr 3fr", lg: "1fr 4fr" }} gap={12}>
          <GridItem display={{ base: "none", md: "block" }}>
            <Navigation />
          </GridItem>

          <GridItem>{children}</GridItem>
        </Grid>
      </Container>
    </>
  )
}

export default SidebarLayout
