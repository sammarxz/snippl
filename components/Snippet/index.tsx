import {Stack, Flex, Text, Badge} from '@chakra-ui/react'
import moment from 'moment'

import {useAppContext} from 'hooks/useAppContext'

import {formatDate} from 'utils/formatDate'

import * as S from './styles'

type SnippetProps = {
  id: string
  title: string
  description: string
  created_at: string
  language: string
  isSelected?: boolean
}

export function Snippet({
  id,
  title,
  description,
  created_at,
  language,
  isSelected = false,
}: SnippetProps) {
  const {dispatch} = useAppContext()

  function setActiveSnippet(id: string) {
    dispatch({
      type: 'SELECT_SNIPPET',
      payload: id,
    })
  }

  return (
    <Stack
      bg={isSelected ? 'whiteAlpha.200' : 'transparent'}
      cursor="pointer"
      transition="ease"
      transitionProperty="all"
      transitionDuration=".6s"
      px={5}
      py={4}
      borderRadius="md"
      opacity={isSelected ? 1 : 0.4}
      _hover={{opacity: 1}}
      onClick={() => setActiveSnippet(id)}
    >
      <S.Title fontSize="lg" textColor="whiteAlpha.800">
        {title}
      </S.Title>
      <S.Description fontFamily="mono" fontSize="sm" textColor="whiteAlpha.500">
        {description}
      </S.Description>
      <Flex alignItems="center" justifyContent="space-between">
        <Badge variant="subtle" colorScheme="whiteAlpha">
          {language}
        </Badge>
        <Text fontFamily="mono" fontSize="xs" textColor="whiteAlpha.500">
          created at {moment(created_at).fromNow()}
        </Text>
      </Flex>
    </Stack>
  )
}
