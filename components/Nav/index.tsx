import {Flex, Stack, Button, Avatar} from '@chakra-ui/react'

import {Search} from 'components'

export function Nav({...rest}) {
  return (
    <Flex
      as="nav"
      alignItems="center"
      justifyContent="space-between"
      borderBottom="1px"
      borderBottomColor="whiteAlpha.200"
      {...rest}
    >
      <Search />
      <Stack isInline spacing={4} alignItems="center" mr={4}>
        <Button colorScheme="whiteAlpha" bg="whiteAlpha.300">
          Create Snippet
        </Button>
        <Avatar name="Samuel Marques" size="sm" />
      </Stack>
    </Flex>
  )
}
