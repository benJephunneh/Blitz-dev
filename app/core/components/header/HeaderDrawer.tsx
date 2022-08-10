import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  useColorModeValue,
} from "@chakra-ui/react"
import { useRouter } from "blitz"
import { FC, useEffect } from "react"
import Navigation from "app/core/components/Navigation"

type HeaderDrawerProps = {
  isOpen: boolean
  onClose: () => void
}

const HeaderDrawer: FC<HeaderDrawerProps> = ({ isOpen, onClose }) => {
  const router = useRouter()
  const bg = useColorModeValue("white", "#242c3a")

  useEffect(() => {
    onClose()
  }, [router.pathname])

  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="left">
      <DrawerOverlay />
      <DrawerContent bg={bg} py={6}>
        <DrawerCloseButton zIndex={2} />
        <DrawerBody>
          <Navigation />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default HeaderDrawer
