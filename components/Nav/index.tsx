import {Flex, Stack, Button, Avatar} from '@chakra-ui/react'

import {Search} from 'components'

export function Nav({...rest}) {
  return (
    <Flex
      as="nav"
      alignItems="center"
      justifyContent="space-between"
      borderBottom="1px"
      {...rest}
    >
      <Search />
      <Stack isInline spacing={4} alignItems="center" mr={4}>
        <Button colorScheme="whiteAlpha" bg="whiteAlpha.300" size="sm">
          Create Snippet
        </Button>
      </Stack>
    </Flex>
  )
}
