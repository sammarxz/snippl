import {useEffect} from 'react'
import {Grid} from '@chakra-ui/react'

import {Header, Collections, Snippets, Editor} from 'components'

import withAuth from 'utils/withAuth'
import useSupabase from 'utils/useSupabase'

type AppProps = {
  snippetId?: string
}

export async function getStaticPaths() {
  return {paths: [], fallback: true}
}

export async function getStaticProps({params}: {params: {uuid: string}}) {
  const {uuid} = params

  if (uuid) {
    return {
      props: {
        snippetId: uuid,
      },
    }
  }

  return {
    props: {},
  }
}

function App({snippetId}: AppProps) {
  console.log(snippetId)

  return (
    <Grid
      h="100vh"
      templateColumns="55px 1.5fr 2fr 3fr"
      templateAreas={`
       "header collections snippets editor"
      `}
      position="fixed"
      left={0}
      right={0}
      top={0}
      bottom={0}
    >
      <Header gridArea="header" />
      <Collections gridArea="collections" />
      <Snippets gridArea="snippets" />
      {snippetId && <Editor gridArea="editor" />}
    </Grid>
  )
}

export default withAuth(App)
