import Image from 'next/image'
import {
  Box, 
  Stack, 
  Avatar, 
  Menu, 
  MenuButton, 
  MenuList, 
  MenuItem,
  Flex,
  Icon,
} from '@chakra-ui/react'
import {CgLogOut} from 'react-icons/cg'

import useSupabase from 'hooks/useSupabase'
import React from 'react'

export function Header({...rest}) {
  const {session, supabase} = useSupabase()
  let user

  if (session) {
    user = session.user?.user_metadata
  }

  const logOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <Box
      as="header"
      borderRight="1px"
      borderRightColor="whiteAlpha.200"
      position="relative"
      {...rest}
    >
      <Stack spacing={6} mt={4} alignItems="center" mx="auto" justifyContent="center">
        <Image
          src="/img/logo-symbol.svg"
          alt="Logo Snippl"
          width={26}
          height={26}
        />
        {user && (
          <Menu matchWidth placement="bottom-end">
              <MenuButton zIndex={99}>
                <Avatar
                  name={user.user_name}
                  src={user.avatar_url}
                  size="sm"
                />
              </MenuButton>
              <MenuList bg="modalBG" borderColor="whiteAlpha.200" zIndex={99}>
                <MenuItem
                  textColor="red.300"
                  _hover={{
                    backgroundColor: 'transparent',
                    color: 'red.400',
                  }}
                  _focus={{backgroundColor: 'transparent'}}
                  onClick={logOut}
                >
                  <Flex alignItems="center">
                    <Icon as={CgLogOut} fontSize="xl" mr={1} />
                    <Box as="span">
                      Sign Out
                    </Box>
                  </Flex>
                </MenuItem>
              </MenuList>
            </Menu>
        )}
      </Stack>
    </Box>
  )
}
