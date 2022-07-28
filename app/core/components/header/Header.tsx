import { Box, Container, Grid, GridItem, useColorModeValue } from "@chakra-ui/react"
import { useSession } from "blitz"
import { useState } from "react"
import HeaderActions from "./HeaderActions"
import HeaderDrawer from "./HeaderDrawer"
import HeaderLogo from "./HeaderLogo"

const Header = () => {
  const session = useSession({ suspense: false })
  const [drawerIsOpen, setDrawerIsOpen] = useState(false)
  const toggleDrawer = () => setDrawerIsOpen((state) => !state)

  const isLoggedIn = !!session.userId
  const isLoggedOut = !session.userId && !session.isLoading

  return (
    <>
      <HeaderDrawer isOpen={drawerIsOpen} onClose={() => setDrawerIsOpen(false)} />

      <Box position="sticky" top={0} zIndex={3}>
        <Box
          as="header"
          py={3}
          bg={useColorModeValue("white", "gray.700")}
          borderBottom="1px solid"
          borderBottomColor={useColorModeValue("gray.200", "gray.800")}
          transition="border 0.2s ease"
        >
          <Container maxW="full">
            <Grid
              templateColumns={{ base: "1fr 1fr", md: "1fr auto 1fr" }}
              alignItems="center"
              gap={3}
            >
              <GridItem>
                <HeaderActions toggleDrawer={toggleDrawer} />
              </GridItem>

              <GridItem>
                <HeaderLogo />
              </GridItem>

              <GridItem>
                {isLoggedIn && <HeaderLogOut />}
                {isLoggedOut && <HeaderLogIn />}
              </GridItem>
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  )
}

export default Header
