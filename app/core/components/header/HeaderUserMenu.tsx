import {
  Avatar,
  Button,
  Fade,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SkeletonCircle,
  useToast,
} from "@chakra-ui/react"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { FaChevronDown, FaCog, FaSignOutAlt, FaUser } from "react-icons/fa"
import avatar from "public/Yangshuo.jpg"
import { Link, Routes, useMutation } from "blitz"
import logoutMutation from "app/auth/mutations/logout"
import { Suspense } from "react"

const UserMenuLoader = () => (
  <Button size="sm" variant="ghost" px={1} rightIcon={<FaChevronDown />}>
    <SkeletonCircle size="6" />
  </Button>
)

const UserMenuButton = () => {
  return (
    <Fade in>
      <MenuButton
        as={Button}
        size="sm"
        variant="ghost"
        px={1}
        rightIcon={<Icon pr={1} as={FaChevronDown} />}
      >
        <Avatar size="xs" src="public/Yangshuo.jpg" />
      </MenuButton>
    </Fade>
  )
}

const HeaderUserMenu = () => {
  const [logout] = useMutation(logoutMutation)
  const currentUser = useCurrentUser({ suspense: false })
  const toast = useToast()

  return (
    <Suspense fallback={<UserMenuLoader />}>
      <Menu>
        <UserMenuButton />

        <MenuList>
          {currentUser && (
            <Link href={Routes.ProfilePage({ username: currentUser.username })} passHref>
              <MenuItem as="a" icon={<FaUser />}>
                My profile
              </MenuItem>
            </Link>
          )}
          <MenuItem
            as="button"
            onClick={() =>
              logout().then(() =>
                toast({
                  title: "You've been logged out",
                  status: "success",
                })
              )
            }
            icon={<FaSignOutAlt />}
          >
            Log out
          </MenuItem>
        </MenuList>
      </Menu>
    </Suspense>
  )
}

export default HeaderUserMenu
