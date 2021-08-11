import Link from 'next/link'
import {Box, Flex, Icon} from '@chakra-ui/react'
import {FiBox} from 'react-icons/fi'

export function Header({...rest}) {
  return (
    <Box
      as="header"
      borderRight="1px"
      borderRightColor="whiteAlpha.200"
      position="relative"
      {...rest}
    >
      <Flex h={16} mt={1} alignItems="center" mx="auto" justifyContent="center">
        <Link href="/">
          <a>
            <Icon as={FiBox} w={8} h={8} />
          </a>
        </Link>
      </Flex>
    </Box>
  )
}
