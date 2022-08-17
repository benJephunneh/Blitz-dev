import { Button, ButtonGroup, Flex, Grid, GridItem, Icon, IconButton } from "@chakra-ui/react"
import { Customer } from "@prisma/client"
import { Routes, useRouter } from "blitz"
import { FC } from "react"
import { BsFillChatLeftQuoteFill } from "react-icons/bs"
import { FaEdit } from "react-icons/fa"
import { MdMapsHomeWork } from "react-icons/md"
import { TbBackhoe, TbReceipt2 } from "react-icons/tb"

type CustomerEntryProps = {
  customer: Customer
}

const CustomerEntry: FC<CustomerEntryProps> = ({ customer }) => {
  const router = useRouter()

  return (
    <Flex p={0}>
      <Grid templateAreas={`"name buttons"`} gridTemplateColumns={"1fr 1fr"}>
        <GridItem area="name">
          <Button
            w="full"
            justifyContent="left"
            variant="outline"
            borderRadius={0}
            borderLeft={0}
            borderRight={0}
            borderTop={0}
            onClick={() => {
              router.push(Routes.ShowCustomerPage({ customerId: customer.id }))
            }}
          >{`${customer.firstname} ${customer.lastname}`}</Button>
        </GridItem>
        <GridItem area="buttons">
          <ButtonGroup isAttached>
            <IconButton
              aria-label="Edit customer"
              icon={<FaEdit />}
              color="gray"
              bgColor="transparent"
              variant="outline"
              borderRadius={0}
              borderLeft={0}
              borderRight={0}
              borderTop={0}
              onClick={() => {
                router.push(Routes.EditCustomerPage({ customerId: customer.id }))
              }}
            />
            <IconButton
              aria-label="View locations"
              icon={<MdMapsHomeWork />}
              color="teal"
              variant="outline"
              borderRadius={0}
              borderLeft={0}
              borderRight={0}
              borderTop={0}
              onClick={() => {
                router.push(Routes.LocationsPage({ customerId: customer.id }))
              }}
            />
            <IconButton
              aria-label="View jobs"
              icon={<TbBackhoe />}
              color="red"
              variant="outline"
              borderRadius={0}
              borderLeft={0}
              borderRight={0}
              borderTop={0}
              onClick={() => {
                router.push(Routes.ShowCustomerPage({ customerId: customer.id }))
              }}
            />
            <IconButton
              aria-label="View estimates"
              icon={<BsFillChatLeftQuoteFill />}
              color="blue"
              variant="outline"
              borderRadius={0}
              borderLeft={0}
              borderRight={0}
              borderTop={0}
              onClick={() => {
                router.push(Routes.ShowCustomerPage({ customerId: customer.id }))
              }}
            />
            <IconButton
              aria-label="View invoices"
              icon={<TbReceipt2 />}
              color="green"
              variant="outline"
              borderRadius={0}
              borderLeft={0}
              borderRight={0}
              borderTop={0}
              onClick={() => {
                router.push(Routes.ShowCustomerPage({ customerId: customer.id }))
              }}
            />
          </ButtonGroup>
        </GridItem>
      </Grid>
    </Flex>
  )
}

export default CustomerEntry
