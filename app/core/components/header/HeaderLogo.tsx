import { Heading, HStack } from "@chakra-ui/react"
import { Link, Routes } from "blitz"
import { Suspense } from "react"
import LogoIcon from "../LogoIcon"

const HeaderLogo = () => {
  return (
    <Suspense>
      <Link href={Routes.Home()} passHref>
        <HStack as="a">
          <LogoIcon w={10} h="auto" />
          <Heading size="md" display={{ base: "none", md: "block" }}>
            Apalachee Septic
          </Heading>
        </HStack>
      </Link>
    </Suspense>
  )
}

export default HeaderLogo
