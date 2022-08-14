import { Button, Flex, Heading, Image, Stack, Text, useBreakpointValue } from "@chakra-ui/react"
import { BlitzLayout } from "blitz"
import { ReactNode } from "react"

function Splitscreen(
  title: string,
  subtitle: string,
  text: string,
  imageSrc: string,
  children?: ReactNode
) {
  return (
    <Stack minH="100vh" direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align="center" justify="center">
        <Stack spacing={6} w="full" maxW="lg">
          <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
            <Text
              as="span"
              position="relative"
              _after={{
                content: "''",
                width: "full",
                height: useBreakpointValue({ base: "20%", md: "30%" }),
                position: "absolute",
                bottom: 1,
                left: 0,
                bg: "blue.400",
                zIndex: -1,
              }}
            >
              {title}
            </Text>
            <br />{" "}
            <Text color="blue.400" as="span">
              {subtitle}
            </Text>
          </Heading>

          <Text fontSize={{ base: "md", lg: "lg" }} color="gray.500">
            {text}
          </Text>

          <Stack direction={{ base: "column", md: "row" }} spacing={4}>
            {children /* these are buttons */}
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image alt="ABST background" objectFit="cover" src={imageSrc} />
      </Flex>
    </Stack>
  )
}

export default Splitscreen
