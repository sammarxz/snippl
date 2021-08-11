import {Grid} from '@chakra-ui/react'

import {Header, Collections, Nav, Snippets, Editor} from 'components'

export default function Home() {
  return (
    <Grid
      h="100vh"
      templateColumns="72px 1.5fr 2fr 3fr"
      gridTemplateRows="72px auto"
      templateAreas={`
       "header collections nav nav"
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
      <Nav gridArea="nav" />
      <Snippets gridArea="snippets" />
      <Editor gridArea="editor" />
    </Grid>
  )
}
