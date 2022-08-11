import {
  Avatar,
  Button,
  Fade,
  VStack,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SkeletonCircle,
  Text,
  useToast,
  HStack,
  Stack,
} from "@chakra-ui/react"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { FaChevronDown, FaCog, FaSignOutAlt, FaUser, FaUserTie } from "react-icons/fa"
import { SiSuperuser } from "react-icons/si"
import { GiExitDoor } from "react-icons/gi"
import avatar from "public/Yangshuo.jpg"
import { Link, Router, Routes, useMutation, useRouter } from "blitz"
import logoutMutation from "app/auth/mutations/logout"
import { Suspense } from "react"
import { FcServices } from "react-icons/fc"

const UserMenuLoader = () => (
  <Button size="sm" variant="ghost" px={1}>
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
        <Icon as={FaUserTie} w={5} h={5} />
        {/* <Avatar size="xs" src="public/Yangshuo.jpg" /> */}
      </MenuButton>
    </Fade>
  )
}

const HeaderUserMenu = () => {
  const router = useRouter()
  const [logout] = useMutation(logoutMutation)
  const currentUser = useCurrentUser({ suspense: false })
  const toast = useToast()

  return (
    <Suspense fallback={<UserMenuLoader />}>
      <Menu autoSelect={false}>
        <UserMenuButton />

        <MenuList>
          <Stack spacing={2} px={2}>
            {currentUser && (
              <Link href={Routes.ProfilePage({ username: currentUser.username })} passHref>
                <MenuItem as="a" icon={<FcServices />}>
                  Profile
                </MenuItem>
              </Link>
            )}
            <Link href={Routes.Home()}>
              <Button
                as="a"
                size="sm"
                rightIcon={<GiExitDoor />}
                onClick={() =>
                  logout()
                    .then(() => toast({ title: "You've been logged out.", status: "success" }))
                    .then(() => router.push(Routes.Home()))
                }
              >
                Log out
              </Button>
            </Link>
          </Stack>
        </MenuList>
      </Menu>
    </Suspense>
  )
}

export default HeaderUserMenu
