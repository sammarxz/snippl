import {useEffect, useState} from 'react'
import Head from 'next/head'
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

import * as S from 'styles/home'

type HomeProps = {
  session: Session
  supabase: SupabaseClient
}

export default function Home({session, supabase}: HomeProps) {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    setLoggedIn(!!session)
  }, [session])

  return (
    <>
      <Head>
        <meta name="description" content="Code faster with a snippet library."/>
        <meta property="og:title" content="Snippl - Code Snippets Library for free" />
        <meta property="og:description" content="Code faster with a snippet library." />
        <meta property="og:image" content="https://snippl.vercel.app/thumbnail.png" />
        <meta property="og:url" content="https://snippl.vercel.app/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:site_name" content="Snippl - Code Snippets Library for free" />
        <meta name="twitter:image:alt" content="Code faster with a snippet library." />
      </Head>
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
                bg="green.300"
                _hover={{bg: "green.400"}}
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
          h="55vh"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          spacing={4}
          mb={4}
        >
          <Heading fontSize={["3xl", "5xl", "7xl"]} textColor="whiteAlpha.900">
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
      <S.Preview maxW="container.lg">
        <Image 
          src="/img/preview.png"
          alt="Snippl webapp preview"
          width={1832}
          height={738}
        />
      </S.Preview>
    </>
  )
}
