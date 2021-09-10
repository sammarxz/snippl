import type {AppProps} from 'next/app'
import Head from 'next/head'
import {ChakraProvider, Box} from '@chakra-ui/react'

import {AppProvider} from 'context/appContext'

import useSupabase from 'utils/useSupabase'

import {theme} from '../styles/theme'

import 'styles/highlight.css'

function App({Component, pageProps}: AppProps) {
  const {session, supabase} = useSupabase()

  return (
    <>
      <Head>
        <title>Snippl - Code Snippet Library for free</title>
      </Head>
      <AppProvider>
        <ChakraProvider theme={theme}>
          <Box bg="black" color="whiteAlpha.700">
            <Component session={session} supabase={supabase} {...pageProps} />
          </Box>
        </ChakraProvider>
      </AppProvider>
    </>
  )
}
export default App
