import {Box, Flex} from '@chakra-ui/react'

export function Nav({...rest}) {
  return (
    <Box
      as="nav"
      bg="gray.800"
      borderRight="1px"
      borderRightColor="gray.900"
      w={16}
      h="100vh"
      {...rest}
    >
      <Flex
        h="20"
        alignItems="center"
        mx="8"
        justifyContent="space-between"
      ></Flex>
    </Box>
  )
}
