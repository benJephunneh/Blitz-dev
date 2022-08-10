import { BlitzLayout, Link, Routes } from "blitz"
import { Box, Button, Flex, Heading, Stack, Text, useColorModeValue } from "@chakra-ui/react"
import { ReactNode } from "react"

type BoxLayoutProps = {
  title: string
  description: string
  children?: ReactNode
}

const BoxLayout: BlitzLayout<BoxLayoutProps> = ({ title, description, children }) => {
  const background = useColorModeValue("gray.100", "gray.900")
  const boxBackground = useColorModeValue("white", "gray.700")

  return (
    <>
      <Flex
        w="100%"
        minH="100vh"
        align="center"
        justify="center"
        direction="column"
        bg={background}
      >
        <Box
          as="main"
          w={{ base: "100%", md: "500px" }}
          minH={{ base: "100vh", md: "auto" }}
          my={{ base: "0", md: 12 }}
          p={10}
          maxW="100%"
          position="relative"
          bg={boxBackground}
          borderRadius={{ base: 0, md: "xl" }}
          textAlign="center"
        >
          <Box as="header" mb={8}>
            <Heading mb={3}>{title}</Heading>
            <Text fontSize="lg" color="gray.400">
              {description}
            </Text>
          </Box>

          <Stack spacing={4}>
            {children}
            <Link href={Routes.Home()} passHref>
              <Button as="a" size="lg" w="full">
                Return home
              </Button>
            </Link>
          </Stack>
        </Box>
      </Flex>
    </>
  )
}

export default BoxLayout
