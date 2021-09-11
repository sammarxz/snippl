import {Grid} from '@chakra-ui/react'

import {Header, Collections, Snippets, Editor} from 'components'

import withAuth from 'utils/withAuth'

function App() {
  return (
    <Grid
      h="100vh"
      templateColumns="55px 1.5fr 1.8fr 3fr"
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
