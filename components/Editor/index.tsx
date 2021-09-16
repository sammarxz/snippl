import {useEffect} from 'react'
import {
  Box,
  Input,
  Textarea,
  Flex,
  Text,
  Stack,
  IconButton,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react'
import {FaTrash} from 'react-icons/fa'
import moment from 'moment'

import {Code} from 'components'

import useSupabase from 'hooks/useSupabase'
import {useAppContext} from 'hooks/useAppContext'
import {useAutosave} from 'hooks/useAutosave'

import {SnippetType} from 'context/appContext'

export function Editor({...rest}) {
  const {
    state: {selectedSnippet, snippets},
    dispatch
  } = useAppContext()
  const {supabase} = useSupabase()
  const [snippetData, setSnippetData] = useAutosave<SnippetType | null>(null)
  const {isOpen, onOpen, onClose} = useDisclosure()

  useEffect(() => {
    const getSnippet = async () => {
      if (selectedSnippet) {
        const {data: snippet} = await supabase
          .from('snippet')
          .select('*')
          .eq('id', selectedSnippet)
  
        if (snippet) {
          setSnippetData(snippet[0])
          dispatch({
            type: 'SET_SNIPPET',
            payload: snippet[0]
          })
        }
      }
    }

    getSnippet()
  }, [selectedSnippet, supabase, dispatch, setSnippetData])

  function handleChange(value:string, type:keyof SnippetType) {
    if (snippetData && type) {
      const updatedSnippet = {
        ...snippetData,
        [type]: value,
        updated_at: new Date()
      }

      updateSnippets(updatedSnippet)
      setSnippetData(updatedSnippet)
      dispatch({
        type: 'SET_SNIPPET',
        payload: updatedSnippet
      })
      // dispatch({
      //   type: 'SET_SNIPPETS',
      //   payload: updatedSnippets
      // })
    }
  }

  function updateSnippets(updatedSnippet:SnippetType) {
    let updatedSnippets = snippets
    if (snippetData) {
      const snippetToUpdateIndex = updatedSnippets.findIndex(snippet => 
        snippet.id === snippetData.id
      )
      updatedSnippets[snippetToUpdateIndex] = updatedSnippet
    }
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
    <Box as="section" px={8} py={5} overflowY="auto" {...rest}>
      {snippetData && selectedSnippet && (
        <>
          <Flex align="center" justify="space-between">
            <Stack spacing={0} flex={1}>
              <Input 
                variant="unstyled" 
                size="lg"
                isFullWidth
                fontSize="xl" 
                color="whiteAlpha.900" 
                fontWeight="bold" 
                value={snippetData.title}
                placeholder="Snippet Title"
                onChange={(e) => handleChange(e.target.value, 'title')}
                autoFocus
              />
              <Text fontSize="sm">
                last modification: 
                {moment(snippetData.updated_at).fromNow()}
              </Text>
            </Stack>
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
          <Textarea
            isRequired
            variant="unstyled"
            fontFamily="mono"
            textColor="whiteAlpha.700"
            resize="vertical"
            value={snippetData.description}
            onChange={(e) => handleChange(e.target.value, 'description')}
            placeholder="// Snippet Description"
            _placeholder={{color: 'whiteAlpha.500'}}
            my={4}
          />
          <Code onChange={handleChange} />
          <Modal variant="dark" isOpen={isOpen} onClose={onClose} size="xs">
            <ModalOverlay />
            <ModalContent bg="modalBG" textColor="whiteAlpha.600">
              <ModalHeader>Confirm Delete</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>
                  Are you sure you would like to delete snippet{' '}
                  <strong>{snippetData.title}</strong>?
                </Text>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="whiteAlpha" mr={3} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme="red" onClick={() => handleDeleteSnippet(snippetData.id)}>
                  Delete
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </Box>
  )
}
