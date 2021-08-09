import Link from 'next/link'
import {Box, Flex, Icon, Avatar} from '@chakra-ui/react'
import {FiBox} from 'react-icons/fi'

export function Nav({...rest}) {
  return (
    <Box
      as="nav"
      bg="whiteAlpha.200"
      borderRight="2px"
      borderRightColor="black"
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
        <Avatar size="sm" name="Sam Marxz" src="https://bit.ly/sage-adebayo" />
      </Box>
    </Box>
  )
}