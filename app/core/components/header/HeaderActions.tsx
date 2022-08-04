import {
  Box,
  HStack,
  Icon,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  useColorMode,
} from "@chakra-ui/react"
import { FC, useState } from "react"
import { FaBars, FaBuffer, FaGrav, FaMoon, FaSun, FaUsers } from "react-icons/fa"
import HeaderIconButton from "./HeaderIconButton"

type HeaderActionProps = {
  toggleDrawer: () => void
}

const HeaderActions: FC<HeaderActionProps> = ({ toggleDrawer }) => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <HStack spacing={1}>
      <HeaderIconButton
        label="Open menu"
        onClick={toggleDrawer}
        icon={<Icon as={FaBuffer} w={5} h={5} />}
      />
      <HeaderIconButton
        label={colorMode === "dark" ? "Day hike" : "Night hike"}
        onClick={toggleColorMode}
        icon={<Icon as={colorMode === "dark" ? FaSun : FaMoon} w={5} h={5} />}
      />
      <Popover placement="bottom-start">
        <PopoverTrigger>
          <HeaderIconButton label="asdf" icon={<Icon as={FaUsers} w={5} h={5} />} />
        </PopoverTrigger>
        <PopoverContent role="tooltip" mt={10}>
          <PopoverBody textColor="purple" outlineColor="black">
            asdf
          </PopoverBody>
        </PopoverContent>
      </Popover>

      <HeaderIconButton
        label="Customer menu"
        icon={<Icon as={FaGrav} w={5} h={5} /> /* Or FaJenkins */}
      />
      <Popover placement="bottom">
        <PopoverTrigger>
          {/* <Box tabIndex="0" role="button" p={5} w="120px" bg="gray.300" children="Click" /> */}
          <Icon aria-label="customerButton" as={FaGrav} role="button" />
        </PopoverTrigger>
        <PopoverContent bg="tomato" color="white">
          <PopoverHeader fontWeight="semibold">Customization</PopoverHeader>
          <PopoverArrow bg="pink.500" />
          <PopoverCloseButton bg="purple.500" />
          <PopoverBody>Apalachee Septic</PopoverBody>
        </PopoverContent>
      </Popover>
      {/*
        Customers drop down, icon: FaUsers
        Locations drop down, icon: FaPeriscope, FaMapMarked[Alt], FaMapSigns, FaRoute (share location)
        Jobs drop down, icon: FaHammer, FaHardHat, FaPeopleCarry, FaSnowPlow, FaTractor, GiFarmTractor, TbBackhoe
        Inventory icon: FaWarehouse
        Tasks icon: FaTasks
        Invoices drop down, icon: FaBalanceScale[_/Left/Right], FaDonate, FaFileInvoiceDollar, FaMoneyBillAlt, FaReceipt, FaWallet
        Estimates drop down, icon: FaFileAlt, FaFileInvoice
        Preferences icon: FaWhmcs
        Common docs icon: FaWpforms
        Email icon: FaEnvelopeOpenText
        User icon: FaRegIdBadge, FaIdBadge, FaRegIdCard, FaIdCard
        Phone icon: FaMobileAlt
        Save icon: FaSave
        Tagging icon: FaTag[s]
      */}
    </HStack>
  )
}

export default HeaderActions
