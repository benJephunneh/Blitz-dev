import { useSession } from "blitz"
import { useState } from "react"
import HeaderDrawer from "./HeaderDrawer"

const Header = () => {
  const session = useSession({ suspense: false })
  const [drawerIsOpen, setDrawerIsOpen] = useState(false)
  const toggleDrawer = () => setDrawerIsOpen((state) => !state)

  const isLoggedIn = !!session.userId
  const isLoggedOut = !session.userId && !session.isLoading

  return (
    <>
      <HeaderDrawer isOpen={drawerIsOpen} onClose={() => setDrawerIsOpen(false) />
    </>
  )
}

export default Header
