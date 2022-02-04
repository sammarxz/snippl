import {
  Stack,
  Flex,
  Text,
  Badge,
  IconButton,
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

import {FaTrash} from 'react-icons/fa'
import moment from 'moment'

import {useAppContext} from 'hooks/useAppContext'
import useSupabase from 'hooks/useSupabase'

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
  const {supabase} = useSupabase()
  const {
    state: {
      snippets,
    }, dispatch
  } = useAppContext()
  const {isOpen, onOpen, onClose} = useDisclosure()

  function setActiveSnippet(id: string) {
    dispatch({
      type: 'SELECT_SNIPPET',
      payload: id,
    })
  }

  async function handleDeleteSnippet(snippetId:string) {
    const { data, error } = await supabase
      .from('snippet')
      .delete()
      .eq('id', snippetId)

    if (!error) {
      const updatedSnippets = snippets.filter(snippet => snippet.id !== snippetId)
      dispatch({
        type: 'SET_SNIPPETS',
        payload: updatedSnippets
      })
      if (updatedSnippets.length > 0) {
        dispatch({
          type: 'SELECT_SNIPPET',
          payload: updatedSnippets[0].id
        })
        dispatch({
          type: 'SET_SNIPPET',
          payload: updatedSnippets[0]
        })
      } else {
        dispatch({
          type: 'SELECT_SNIPPET',
          payload: ''
        })
        // dispatch({
        //   type: 'SET_SNIPPET',
        //   payload: ''
        // })
      }

      onClose()
    }
  }

  return (
    <S.Wrapper>
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
        <Flex as="header" alignItems="center" justifyContent="space-between">
          <S.Title fontSize="lg" textColor="whiteAlpha.800">
            {title}
          </S.Title>
          <IconButton
            colorScheme="whiteAlpha"
            bg="transparent"
            color="whiteAlpha.600"
            _hover={{bg: 'whiteAlpha.300'}}
            aria-label="Delete Snippet"
            size="xs"
            icon={<FaTrash />}
            onClick={onOpen}
          />
        </Flex>
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
      <Modal variant="dark" isOpen={isOpen} onClose={onClose} size="xs">
          <ModalOverlay />
          <ModalContent bg="modalBG" textColor="whiteAlpha.600">
            <ModalHeader>Confirm Delete</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>
                Are you sure you would like to delete snippet{' '}
                <strong>{title}</strong>?
              </Text>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="whiteAlpha" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={() => handleDeleteSnippet(id)}>
                Delete
              </Button>
            </ModalFooter>
          </ModalContent>
      </Modal>
    </S.Wrapper>
  )
}
