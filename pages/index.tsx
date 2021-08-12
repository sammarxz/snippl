import Image from 'next/image'
import Link from 'next/link'
import {
  Container,
  Box,
  Flex,
  Button,
  Stack,
  Heading,
  Text,
} from '@chakra-ui/react'
import {FaGithub} from 'react-icons/fa'

export default function Home() {
  return (
    <>
      <Container maxW="container.md">
        <Flex
          as="nav"
          py={8}
          alignItems="center"
          justifyContent="space-between"
        >
          <Link href="">
            <a>
              <Image
                src="/img/logo.svg"
                alt="Logo Snippl"
                width={102}
                height={25}
              />
            </a>
          </Link>
          <Button
            colorScheme="purple"
            bg="purple.300"
            textColor="blackAlpha.900"
            leftIcon={<FaGithub />}
          >
            Sign in with Github
          </Button>
        </Flex>
        <Stack
          as="header"
          h="60vh"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          spacing={4}
          mb={4}
        >
          <Heading fontSize="7xl" textColor="whiteAlpha.900">
            Code faster with a snippet library.
          </Heading>
          <Text textColor="whiteAlpha.600" fontSize="lg" maxW={600}>
            <Box as="span" textColor="whiteAlpha.900" fontWeight="bold">
              Snippl
            </Box>{' '}
            helps you create your personal code library, keeps everything
            organized, and always at the ready for use.
          </Text>
        </Stack>
      </Container>
      <Container maxW="container.lg">
        <Box
          w="100%"
          h={40}
          bg="purple.300"
          borderTopLeftRadius="3xl"
          borderTopRightRadius="3xl"
        ></Box>
      </Container>
    </>
  )
}
