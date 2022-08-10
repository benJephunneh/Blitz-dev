import {
  Button,
  Fade,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SkeletonCircle,
  Stack,
  useToast,
} from "@chakra-ui/react"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { FaChevronDown, FaCog, FaSignOutAlt, FaUser, FaUserTie } from "react-icons/fa"
import avatar from "public/Yangshuo.jpg"
import { Link, Router, Routes, useMutation, useRouter } from "blitz"
import logoutMutation from "app/auth/mutations/logout"
import { Suspense } from "react"

const UserMenuLoader = () => (
  <Button size="sm" variant="ghost" px={1} rightIcon={<FaChevronDown />}>
    <SkeletonCircle size="6" />
  </Button>
)

const UserMenuButton = () => {
  return (
    <MenuButton
      as={Button}
      size="sm"
      variant="ghost"
      px={1}
      rightIcon={<Icon pr={1} as={FaChevronDown} />}
    >
      <Icon as={FaUserTie} w={5} h={5} />
    </MenuButton>
  )
}

const HeaderUserMenu = () => {
  const router = useRouter()
  const [logout] = useMutation(logoutMutation)
  const currentUser = useCurrentUser({ suspense: false })
  const toast = useToast()

  return (
    <Suspense fallback={<UserMenuLoader />}>
      <Menu>
        <Fade in>
          <UserMenuButton />

          <MenuList>
            <Stack spacing={2} px={2}>
              {currentUser && (
                <MenuItem
                  as="button"
                  icon={<FaUser />}
                  onClick={() =>
                    router.push(Routes.ProfilePage({ username: currentUser.username }))
                  }
                >
                  Profile
                </MenuItem>
              )}
              {/* <MenuItem
                as="button"
                icon={<FaCog />}
                onClick={() => router.push(Routes.PreferencesPage())}
              >
                Preferences
                </MenuItem> */}
              <MenuItem
                as="button"
                icon={<FaSignOutAlt />}
                onClick={() =>
                  logout().then(() =>
                    toast({
                      title: "You've been logged out",
                      status: "success",
                    })
                  )
                }
              >
                Log out
              </MenuItem>
            </Stack>
          </MenuList>
        </Fade>
      </Menu>
    </Suspense>
  )
}

export default HeaderUserMenu
