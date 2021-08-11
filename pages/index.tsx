import {Grid, Heading, Box} from '@chakra-ui/react'

import {Header, Collections, Nav, Snippets, CodeEditor} from 'components'

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
    >
      <Header gridArea="header" />
      <Collections gridArea="collections" />
      <Nav gridArea="nav" />
      <Snippets gridArea="snippets" />
      <CodeEditor gridArea="editor" />
    </Grid>
  )
}
