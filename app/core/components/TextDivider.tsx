import { FC } from "react"
import type { StackProps } from "@chakra-ui/react"
import { Divider, HStack, Text } from "@chakra-ui/react"

const TextDivider: FC<StackProps> = ({ children, ...props }) => (
  <HStack align="center" {...props}>
    <Divider />
    <Text fontSize="sm" color="gray.500" textTransform="uppercase" fontWeight="semibold">
      {children}
    </Text>
    <Divider />
  </HStack>
)

export default TextDivider
