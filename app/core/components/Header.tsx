import { Link, useRouter } from "blitz"
import { useEffect, useState } from "react"
import { useIsDesktop } from "../hooks/useIsDesktop"
import { FiArrowUpRight } from "react-icons/fi"
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"
import Banner from "./Banner"
import Logo from "./Logo"
import { NavLink } from "./NavLink"
import { Search } from "./Search"

const bannerMsg = <div>Enjoy Apalachee Septic&#39;s new website!</div>

const Header = ({ className = "", hasLightBg, stickyBgClass, onNavToggle }) => {
  const router = useRouter()
  const isDesktop = useIsDesktop()
  let [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!isOpen) return
    function handleRouteChange() {
      setIsOpen(false)
    }
    router.events.on("routeChangeComplete", handleRouteChange)
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange)
    }
  }, [isOpen, router.events])

  const onToggle = () => {
    const newValue = !isOpen
    setIsOpen(newValue)
    onNavToggle(newValue)
  }

  const menuLinks = [
    {
      name: "Services",
      href: isDesktop ? "/services/request" : "/services",
    },
    {
      name: "Contact",
      href: "/contact",
    },
    {
      name: "About",
      href: "/about",
    },
  ]

  return (
    <>
      {bannerMsg && <Banner message={bannerMsg} hasLightBg={hasLightBg} className="pt-0" />}
      <nav className={`${stickyBgClass ? "sticky top-0 z-10" : ""}`}>
        <div className={`flex items-center justify-between lg:mt-4 ${className} ${stickyBgClass}`}>
          <div className="pr-8 xl:pr-12 lg:-mt-3">
            <Link href="/">
              <a className="w-10 overflow-hidden md:w-auto">
                <span className="sr-only">ABST home</span>
                <Logo className="w-auto h-12 py-2 fill-current inline" />
              </a>
            </Link>
          </div>
          <div className="flex-1 hidden space-x-4 xl:space-x-6 text-base lg:flex">
            {menuLinks.map((link) => {
              const external = link.href.startsWith("http")
              const props = external ? { target: "_blank", rel: "noopener noreferrer" } : {}
              return (
                <NavLink href={link.href} key={link.href + link.name} {...props}>
                  {link.name}
                  {external && (
                    <FiArrowUpRight size="0.65rem" className="opacity-40 absolute top-2 right-0" />
                  )}
                </NavLink>
              )
            })}
          </div>
          <div className="flex lg:text-base xl:space-x-4">
            <button className="p-2 transition-opacity rounded-md lg:hidden focus:ring-2 focus:outline-none focus:ring-inset focus:ring-white">
              {isOpen ? <AiOutlineClose size="1.375rem" /> : <AiOutlineMenu size="1.375rem" />}
            </button>
          </div>
        </div>
      </nav>
    </>
  )
}

export { Header }
