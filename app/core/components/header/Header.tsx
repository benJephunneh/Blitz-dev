import { Box, Container, Grid, GridItem, Text, useColorModeValue } from "@chakra-ui/react"
import { useSession } from "blitz"
import { useState } from "react"
import HeaderActions from "./HeaderActions"
import HeaderDayNight from "./HeaderDayNight"
import HeaderDrawer from "./HeaderDrawer"
import HeaderHamburger from "./HeaderHamburger"
import HeaderLogIn from "./HeaderLogIn"
import HeaderLogo from "./HeaderLogo"
import HeaderLogOut from "./HeaderLogOut"

const Header = ({ title }) => {
  const session = useSession({ suspense: false })
  const [drawerIsOpen, setDrawerIsOpen] = useState(false)
  const toggleDrawer = () => setDrawerIsOpen((state) => !state)

  const isLoggedIn = !!session.userId
  const isLoggedOut = !session.userId && !session.isLoading

  return (
    <>
      {isLoggedIn && <HeaderDrawer isOpen={drawerIsOpen} onClose={() => setDrawerIsOpen(false)} />}

      <Box position="sticky" top={0} zIndex={3}>
        <Box
          as="header"
          pt={2}
          pb={5}
          bg={useColorModeValue("white", "gray.700")}
          borderBottom="1px solid"
          borderBottomColor={useColorModeValue("gray.200", "gray.800")}
          transition="border 0.2s ease"
        >
          <Container maxW="full">
            <Grid
              templateAreas={
                isLoggedIn ? `"logo hamburger title colorMode user"` : `"logo 1fr colorMode user"`
              }
              gridTemplateColumns={isLoggedIn ? "50px 50px 1fr 40px 50px" : "200px 1fr 40px 70px"}
              h={5}
              color="blackAlpha.700"
            >
              <GridItem area="logo">
                <HeaderLogo />
              </GridItem>

              {isLoggedIn && (
                <GridItem area="hamburger">
                  <HeaderHamburger toggleDrawer={toggleDrawer} />
                </GridItem>
              )}

              <GridItem area="colorMode">
                <HeaderDayNight />
              </GridItem>

              {title && (
                <GridItem area="title">
                  <Text textAlign="center" fontSize="xl" fontWeight="bold">
                    {title}
                  </Text>
                </GridItem>
              )}

              <GridItem area="user">
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
