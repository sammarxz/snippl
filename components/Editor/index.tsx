import {useEffect, useState} from 'react'
import {
  Box,
  Editable,
  EditableInput,
  EditablePreview,
  Textarea,
} from '@chakra-ui/react'

import {Code} from 'components'

import useSupabase from 'hooks/useSupabase'
import {useAppContext} from 'hooks/useAppContext'

type snippetType = {
  id: string
  title: string
  description: string
  lang: string
  code: string
  created_at: string
  updated_at: string
}

export function Editor({...rest}) {
  const {
    state: {selectedSnippet},
  } = useAppContext()
  const {supabase} = useSupabase()
  const [snippetData, setSnippetData] = useState<snippetType | null>(null)

  useEffect(() => {
    const getSnippet = async () => {
      const {data: snippet, error} = await supabase
        .from('snippet')
        .select('*')
        .eq('id', selectedSnippet)

      if (!error && snippet) {
        setSnippetData(snippet[0])
      }
    }

    getSnippet()
  }, [selectedSnippet, supabase])

  return (
    <Box as="section" px={8} py={4} overflowY="auto" {...rest}>
      {snippetData && (
        <>
          <h1>{snippetData.title}</h1>
          <Textarea
            isRequired
            variant="unstyled"
            fontFamily="mono"
            textColor="whiteAlpha.700"
            resize="vertical"
            rows={1}
            value={snippetData.description}
            placeholder="// Snippet Description"
            _placeholder={{color: 'whiteAlpha.500'}}
            my={4}
          />
          <Code code={snippetData.code} lang={snippetData.lang} />
        </>
      )}
    </Box>
  )
}
