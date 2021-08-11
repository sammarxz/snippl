import Link from 'next/link'
import {Box, Flex, Icon, Avatar} from '@chakra-ui/react'
import {FiBox} from 'react-icons/fi'

export function Nav({...rest}) {
  return (
    <Box
      as="nav"
      bg="whiteAlpha.50"
      borderRight="1px"
      borderRightColor="whiteAlpha.200"
      w={16}
      h="100vh"
      position="relative"
      {...rest}
    >
      <Flex mt={1} h="16" alignItems="center" mx="auto" justifyContent="center">
        <Link href="/">
          <a>
            <Icon as={FiBox} w={8} h={8} />
          </a>
        </Link>
      </Flex>
      <Box position="absolute" left="0" right="0" bottom="6" textAlign="center">
        <Avatar size="sm" name="Sam Marxz" />
      </Box>
    </Box>
  )
}
