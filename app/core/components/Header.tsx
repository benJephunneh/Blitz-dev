import { useRouter } from "blitz"
import { useEffect, useState } from "react"
import { useIsDesktop } from "../hooks/useIsDesktop"

const bannerMsg = <div>Enjoy Apalachee Septic&#39s new website!</div>

const Header = ({ className = "", hasLightBg, stickyBgClass, hasFade, onNavToggle }) => {
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
}
