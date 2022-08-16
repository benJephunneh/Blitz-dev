import { HStack, Stack, Text } from "@chakra-ui/layout"
import { Box, Heading, Icon, useColorModeValue } from "@chakra-ui/react"
// import { Icon } from '@chakra-ui/icon'
import { Link, Routes, RouteUrlObject, useRouter } from "blitz"
import { FC, ReactNode } from "react"
import { IconType } from "react-icons"
import {
  FcAssistant,
  FcCalendar,
  FcConferenceCall,
  FcGlobe,
  FcHome,
  FcMoneyTransfer,
  FcPieChart,
  FcPlanner,
  FcRuler,
  FcShipped,
} from "react-icons/fc"

type NavigationItemProps = {
  route: RouteUrlObject
  icon: IconType
  children?: ReactNode
}

const NavigationItem: FC<NavigationItemProps> = ({ route, icon, children }) => {
  const router = useRouter()
  const isActive = router.pathname === route.pathname

  const bgColor = useColorModeValue("gray.50", "gray.700")
  const activeBgColor = useColorModeValue("gray.50", "gray.900")
  const activeColor = useColorModeValue("blue.400", "cyan.400")

  return (
    <Link href={route} passHref>
      <HStack
        as="a"
        bg={isActive ? activeBgColor : "transparent"}
        _hover={{ bg: isActive ? activeBgColor : bgColor }}
        borderRadius="md"
        py={2}
        px={3}
      >
        <Icon as={icon} w={5} h={5} mr={1} />
        <Text color={isActive ? activeColor : ""} fontWeight="bold">
          {children}
        </Text>
      </HStack>
    </Link>
  )
}

type NavigationExternalItemProps = {
  children: ReactNode
  href: string
  icon: IconType
}

const NavigationExternalItem: FC<NavigationExternalItemProps> = ({ children, icon, href }) => {
  const bgColor = useColorModeValue("gray.50", "gray.700")

  return (
    <HStack
      as="a"
      href={href}
      _hover={{ bg: bgColor }}
      borderRadius="md"
      display="flex"
      alignItems="center"
      py={2}
      px={3}
    >
      <Icon as={icon} w={5} h={5} mr={1} />
      <Text fontWeight="bold">{children}</Text>
    </HStack>
  )
}

const NavigationSection: FC<{ title?: string; children: ReactNode }> = ({ title, children }) => {
  return (
    <Stack as="section" spacing={2}>
      {title && (
        <Heading fontSize="xs" pl={3} textTransform="uppercase" pb={2} color="gray.500">
          {title}
        </Heading>
      )}

      {children}
    </Stack>
  )
}

const Navigation = () => {
  return (
    <Box as="aside">
      <Stack as="aside" spacing={4}>
        <NavigationSection>
          <NavigationItem route={Routes.Home()} icon={FcHome}>
            Home
          </NavigationItem>
        </NavigationSection>
        <NavigationSection>
          <NavigationItem route={Routes.CustomersPage()} icon={FcConferenceCall}>
            Customers
          </NavigationItem>
        </NavigationSection>
        <NavigationSection>
          <NavigationItem route={Routes.Home()} icon={FcGlobe}>
            Locations
          </NavigationItem>
        </NavigationSection>
        <NavigationSection>
          <NavigationItem route={Routes.Home()} icon={FcRuler}>
            Estimates
          </NavigationItem>
        </NavigationSection>
        <NavigationSection>
          <NavigationItem route={Routes.Home()} icon={FcMoneyTransfer}>
            Invoices
          </NavigationItem>
        </NavigationSection>
        <NavigationSection>
          <NavigationItem route={Routes.Home()} icon={FcShipped}>
            Inventory
          </NavigationItem>
        </NavigationSection>
        <NavigationSection>
          <NavigationItem route={Routes.Home()} icon={FcPlanner}>
            Schedule
          </NavigationItem>
        </NavigationSection>
      </Stack>
    </Box>
  )
}

export default Navigation
