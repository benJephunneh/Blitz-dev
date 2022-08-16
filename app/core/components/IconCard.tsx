import { FC } from "react"
import { Link, RouteUrlObject } from "blitz"
import { Box, Button, Heading, Icon, Text, useColorModeValue } from "@chakra-ui/react"
import { IconType } from "react-icons"

type IconCardProps = {
  icon: IconType
  title: string
  text: string | JSX.Element
  actionLink?: RouteUrlObject
  actionText?: string
}
const IconCard: FC<IconCardProps> = ({ icon, title, text, actionLink, actionText }) => {
  return (
    <Box bg={useColorModeValue("white", "gray.800")} p={5} borderRadius="md" textAlign="center">
      <Icon as={icon} w={8} h={8} mb={2} />
      <Heading size="md" mb={2}>
        {title}
      </Heading>
      <Text opacity="0.8">{text}</Text>

      {actionLink && actionText && (
        <Link href={actionLink} passHref>
          <Button as="a" width="full" mt={5}>
            {actionText}
          </Button>
        </Link>
      )}
    </Box>
  )
}

export default IconCard
