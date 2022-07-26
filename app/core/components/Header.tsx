import { Link, useRouter } from "blitz"
import { useEffect, useState } from "react"
import { useIsDesktop } from "../hooks/useIsDesktop"
import { Image } from "blitz"
import Banner from "./Banner"
import abstIcon from "../../../public/abst icon.png"

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
      <Image src={abstIcon} alt="ABST icon" />
      {bannerMsg && <Banner message={bannerMsg} hasLightBg={hasLightBg} className="pt-0" />}
      <nav className={`${stickyBgClass ? "sticky top-0 z-50" : ""}`}>
        <div className={`flex items-center justify-between lg:mt-4 ${className} ${stickyBgClass}`}>
          <div className="pr-8 xl:pr-12 lg:-mt-3">
            <Link href="/">
              <a className="w-10 overflow-hidden md:w-auto">
                <span className="sr-only">ABST home</span>
              </a>
            </Link>
          </div>
        </div>
      </nav>
    </>
  )
}

export { Header }
