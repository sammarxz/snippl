import {useEffect, useState} from 'react'
import {Session, SupabaseClient} from '@supabase/supabase-js'
import Image from 'next/image'
import Link from 'next/link'
import {GrFormNextLink} from 'react-icons/gr'
import {
  Container,
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Button
} from '@chakra-ui/react'

import {Auth} from 'components'

type HomeProps = {
  session: Session
  supabase: SupabaseClient
}

export default function Home({session, supabase}: HomeProps) {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    setLoggedIn(!!session)
  }, [session])

  const logOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <>
      <Container maxW="container.md" fontFamily="body">
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
          {loggedIn ? (
            <Link href="/app" passHref>
              <Button 
                colorScheme="green"
                bg="green.200"
                _hover={{bg: "green.300"}}
                textColor="blackAlpha.900"
                rightIcon={<GrFormNextLink />}
              >
                Go to App
              </Button>
            </Link>
          ) : (
            <Auth supabase={supabase} />
          )}
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
          bg="green.200"
          borderTopLeftRadius="3xl"
          borderTopRightRadius="3xl"
        ></Box>
      </Container>
    </>
  )
}
