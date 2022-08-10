import { Heading, HStack } from "@chakra-ui/react"
import { Link, Routes } from "blitz"
import Logo from "../Logo"
import LogoIcon from "../LogoIcon"

const HeaderLogo = () => {
  return (
    <Link href={Routes.Home()} passHref>
      <a>
        <LogoIcon />
      </a>
    </Link>
  )
}

export default HeaderLogo
