import {useState, useEffect} from 'react'
import {motion, AnimateSharedLayout, AnimatePresence} from 'framer-motion'
import {Box, Stack, Heading, Flex, Icon} from '@chakra-ui/react'
import {GoPlus, GoCode} from 'react-icons/go'
import {v4 as uuidv4} from 'uuid'

import {Snippet} from 'components'

import useSupabase from 'hooks/useSupabase'
import {useAppContext} from 'hooks/useAppContext'

type snippetType = {
  id: string
  title: string
  description: string
  lang: string
  collection_id: string
  code?: string
  created_at: string
}

type snippetsType = snippetType[]

type newSnippetType = Omit<snippetType, 'created_at'>

export function Snippets({...rest}) {
  const {supabase} = useSupabase()
  const {state, dispatch} = useAppContext()

  useEffect(() => {
    const getSnippets = async () => {
      let {data: snippet} = await supabase
        .from('snippet')
        .select('*')
        .eq('collection_id', state.selectedCollection)
        .order('created_at', {ascending: true})

      if (!snippet) {
        return
      }

      dispatch({
        type: 'SELECT_SNIPPET',
        payload: snippet[0]?.id,
      })
      dispatch({
        type: 'SET_SNIPPETS',
        payload: snippet,
      })
    }

    getSnippets()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.selectedCollection, supabase])

  async function handleNewSnippet() {
    const newSnippetToAdd: newSnippetType = {
      id: uuidv4(),
      title: 'Snippet Title',
      description: 'Snippet Description',
      lang: 'javascript',
      code: `// what's your code?
console.log('Hello World');
      `,
      collection_id: state.selectedCollection,
    }

    const {data, error} = await supabase
      .from('snippet')
      .insert([newSnippetToAdd])

    if (!error && data) {
      const newSnippetList = [...state.snippets, ...data]

      dispatch({
        type: 'SELECT_SNIPPET',
        payload: newSnippetList[newSnippetList.length - 1].id,
      })
      dispatch({
        type: 'SET_SNIPPETS',
        payload: newSnippetList,
      })
    }
  }

  return (
    <Box
      as="aside"
      borderRight="1px"
      borderRightColor="whiteAlpha.200"
      p={5}
      overflowY="auto"
      {...rest}
    >
      <AnimateSharedLayout>
        <Stack spacing={5}>
          <Flex alignItems="center" justifyContent="space-between">
            <Heading
              fontSize="xs"
              textTransform="uppercase"
              letterSpacing="1px"
            >
              <Stack spacing="8px" isInline alignItems="center">
                <Icon as={GoCode} textColor="whiteAlpha.500" />
                <Box as="span" textColor="whiteAlpha.700">
                  Snippets
                </Box>
              </Stack>
            </Heading>
            {state.selectedCollection && (
              <button onClick={handleNewSnippet}>
                <Icon as={GoPlus} color="whiteAlpha.800" />
              </button>
            )}
          </Flex>
          <AnimatePresence initial={false}>
            <Stack spacing={1} mt={1}>
              {state.snippets && (
                <>
                  {state.snippets.map(
                    ({id, title, description, lang, created_at}) => (
                      <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        key={id}
                        layout
                      >
                        <Snippet
                          id={id}
                          title={title}
                          description={description}
                          language={lang}
                          created_at={created_at}
                          isSelected={state.selectedSnippet === id}
                        />
                      </motion.div>
                    ),
                  )}
                </>
              )}
            </Stack>
          </AnimatePresence>
        </Stack>
      </AnimateSharedLayout>
    </Box>
  )
}
