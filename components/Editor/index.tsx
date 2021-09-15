import {useEffect, useState} from 'react'
import {
  Box,
  Input,
  Textarea,
  Flex,
  Text,
  Stack,
  IconButton,
} from '@chakra-ui/react'
import {FaTrash} from 'react-icons/fa'

import {Code} from 'components'

import useSupabase from 'hooks/useSupabase'
import {useAppContext} from 'hooks/useAppContext'
import {useAutosave} from 'hooks/useAutosave'

import {formatDate} from 'utils/formatDate'

import {SnippetType} from 'context/appContext'

export function Editor({...rest}) {
  const {
    state: {selectedSnippet},
    dispatch
  } = useAppContext()
  const {supabase} = useSupabase()

  const [snippetData, setSnippetData] = useAutosave<SnippetType | null>(null)

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
        [type]: value
      }
      setSnippetData(updatedSnippet)
      dispatch({
        type: 'SET_SNIPPET',
        payload: updatedSnippet
      })
    }
  }

  return (
    <Box as="section" px={8} py={5} overflowY="auto" {...rest}>
      {snippetData && selectedSnippet && (
        <>
          <Flex align="center" justify="space-between">
            <Stack spacing={1} flex={1}>
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
                {formatDate(snippetData.updated_at, 'relative')}
              </Text>
            </Stack>
            <IconButton
              colorScheme="red"
              bg="red.300"
              _hover={{bg: 'red.500'}}
              aria-label="Delete Snippet"
              size="sm"
              icon={<FaTrash />}
            />
          </Flex>
          <Textarea
            isRequired
            variant="unstyled"
            fontFamily="mono"
            textColor="whiteAlpha.700"
            resize="vertical"
            rows={2}
            value={snippetData.description}
            onChange={(e) => handleChange(e.target.value, 'description')}
            placeholder="// Snippet Description"
            _placeholder={{color: 'whiteAlpha.500'}}
            my={4}
          />
          <Code onChange={handleChange} />
        </>
      )}
    </Box>
  )
}
