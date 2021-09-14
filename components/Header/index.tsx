import Image from 'next/image'
import {Box, Flex} from '@chakra-ui/react'

export function Header({...rest}) {
  return (
    <Box
      as="header"
      borderRight="1px"
      borderRightColor="whiteAlpha.200"
      position="relative"
      {...rest}
    >
      <Flex h={12} mt={2} alignItems="center" mx="auto" justifyContent="center">
        <Image
          src="/img/logo-symbol.svg"
          alt="Logo Snippl"
          width={28}
          height={28}
        />
      </Flex>
    </Box>
  )
}
