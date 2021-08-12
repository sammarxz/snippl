import type {AppProps} from 'next/app'
import Head from 'next/head'
import {ChakraProvider, Box} from '@chakra-ui/react'
import {Provider as NextAuthProvider} from 'next-auth/client'

import {theme} from '../styles/theme'

import 'styles/highlight.css'

function App({Component, pageProps}: AppProps) {
  return (
    <>
      <Head>
        <title>Snippl - Code Snippet Library for free</title>
      </Head>
      <NextAuthProvider session={pageProps.session}>
        <ChakraProvider theme={theme}>
          <Box bg="black" color="whiteAlpha.700">
            <Component {...pageProps} />
          </Box>
        </ChakraProvider>
      </NextAuthProvider>
    </>
  )
}
export default App
