import { Heading, HStack } from "@chakra-ui/react"
import { Link, Routes } from "blitz"
import LogoIcon from "../LogoIcon"

const HeaderLogo = () => {
  return (
    <Link href={Routes.Home()} passHref>
      <HStack as="a">
        <LogoIcon w={5} h={5} />
        <Heading size="md" display={{ base: "none", md: "block" }}>
          Apalachee Septic
        </Heading>
      </HStack>
    </Link>
  )
}

export default HeaderLogo
