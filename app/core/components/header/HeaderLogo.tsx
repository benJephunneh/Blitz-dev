import { Heading, HStack, Text } from "@chakra-ui/react"
import { Link, Routes, useSession } from "blitz"
import Logo from "../Logo"
import LogoIcon from "../LogoIcon"

const HeaderLogo = () => {
  const session = useSession({ suspense: false })
  const isLoggedOut = !session.userId && !session.isLoading

  return (
    <HStack>
      <Link href={Routes.Home()} passHref>
        <LogoIcon as="a" boxSize={10} />
      </Link>
      {isLoggedOut && (
        <Link href="tel:+18508772824">
          <a>
            <strong>1-850-877-2824</strong>
          </a>
        </Link>
      )}
    </HStack>
  )
}

export default HeaderLogo
