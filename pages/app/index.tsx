import {Grid} from '@chakra-ui/react'

import {Header, Collections, Nav, Snippets, Editor} from 'components'

import withAuth from 'utils/withAuth'
import {useAppContext} from 'utils/useAppContext'

function App() {
  return (
    <Grid
      bg="black"
      h="100vh"
      templateColumns="72px 1.5fr 2fr 3fr"
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
      <Editor gridArea="editor" />
    </Grid>
  )
}

export default withAuth(App)
