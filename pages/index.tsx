import {useEffect, useState} from 'react'
import {Session, SupabaseClient} from '@supabase/supabase-js'
import Image from 'next/image'
import Link from 'next/link'
import {
  Container,
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
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
            <Menu matchWidth placement="bottom-end">
              <MenuButton>
                <Box as="span" mr={4}>
                  Hello,{' '}
                  <Box as="span" color="white" fontWeight="semibold">
                    {session?.user?.user_metadata.user_name}
                  </Box>
                </Box>
                <Avatar
                  name={session?.user?.user_metadata.user_name}
                  src={session?.user?.user_metadata.avatar_url}
                  size="sm"
                />
              </MenuButton>
              <MenuList bg="whiteAlpha.100" borderColor="whiteAlpha.200">
                <MenuItem
                  textColor="whiteAlpha.600"
                  _hover={{
                    backgroundColor: 'transparent',
                    color: 'whiteAlpha.700',
                  }}
                  _focus={{backgroundColor: 'transparent'}}
                  onClick={logOut}
                >
                  Sign Out
                </MenuItem>
              </MenuList>
            </Menu>
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
          bg="purple.300"
          borderTopLeftRadius="3xl"
          borderTopRightRadius="3xl"
        ></Box>
      </Container>
    </>
  )
}
