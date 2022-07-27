import { Image, Link, useRouter } from "blitz"
import { useEffect, useState } from "react"
import { useIsDesktop } from "../hooks/useIsDesktop"
import { FiArrowUpRight } from "react-icons/fi"
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"
import Banner from "./Banner"
import { NavLink } from "./NavLink"
import abstIcon from "public/abst icon.png"

const Header = ({ bannerMsg, className = "" }) => {
  return (
    <>
      {bannerMsg && <Banner message={bannerMsg} className={className} />}
      <div>
        <Link href="/">
          <a>
            <Image src={abstIcon} alt="ABST" />
          </a>
        </Link>
      </div>
    </>
  )
}

export { Header }
