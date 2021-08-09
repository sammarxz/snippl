import {Flex, Heading, Box} from '@chakra-ui/react'

import {Nav, Collections} from 'components'

export default function Home() {
  return (
    <Flex>
      <Nav />
      <Collections />
      <Box></Box>
    </Flex>
  )
}
