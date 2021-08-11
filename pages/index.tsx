import {Flex, Heading, Box} from '@chakra-ui/react'

import {Nav, Collections, Snippets, CodeEditor} from 'components'

export default function Home() {
  return (
    <Flex>
      <Nav />
      <Collections />
      <Snippets />
      <CodeEditor />
    </Flex>
  )
}
