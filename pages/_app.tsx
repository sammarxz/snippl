import type {AppProps} from 'next/app'
import Head from 'next/head'
import {ChakraProvider} from '@chakra-ui/react'

import {AppProvider} from 'context/appContext'

import useSupabase from 'hooks/useSupabase'

import {theme} from '../styles/theme'

import 'styles/highlight.css'
import 'styles/scrollbar.css'

function App({Component, pageProps}: AppProps) {
  const {session, supabase} = useSupabase()

  return (
    <>
      <Head>
        <title>Snippl - Code Snippet Library for free</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
      </Head>
      <AppProvider>
        <ChakraProvider theme={theme}>
          <Component session={session} supabase={supabase} {...pageProps} />
        </ChakraProvider>
      </AppProvider>
    </>
  )
}
export default App
