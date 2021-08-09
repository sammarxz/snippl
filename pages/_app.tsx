import type {AppProps} from 'next/app'
import Head from 'next/head'
import {ChakraProvider, Box} from '@chakra-ui/react'

import {theme} from '../styles/theme'

function App({Component, pageProps}: AppProps) {
  return (
    <>
      <Head>
        <title>CodeSnippets</title>
      </Head>
      <ChakraProvider theme={theme}>
        <Box bg="gray.900" color="gray.500" h="100vh">
          <Component {...pageProps} />
        </Box>
      </ChakraProvider>
    </>
  )
}
export default App
