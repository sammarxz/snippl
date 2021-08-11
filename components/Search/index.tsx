import {
  Stack,
  InputGroup,
  InputLeftElement,
  Input,
  Icon,
} from '@chakra-ui/react'
import {BiSearch} from 'react-icons/bi'

export function Search() {
  return (
    <Stack spacing={4} width="100%">
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          // eslint-disable-next-line react/no-children-prop
          children={<Icon as={BiSearch} fontSize="xl" color="whiteAlpha.400" />}
          my={4}
          mx={3}
        />
        <Input
          type="text"
          placeholder="Search Snippet (Ctrl+k)"
          variant="unstyled"
          p={6}
          ml={8}
          _placeholder={{color: 'whiteAlpha.500'}}
        />
      </InputGroup>
    </Stack>
  )
}
