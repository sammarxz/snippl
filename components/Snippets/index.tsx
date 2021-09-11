import {useState, useEffect} from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {motion, AnimateSharedLayout, AnimatePresence} from 'framer-motion'
import {Box, Stack, Heading, Flex, Icon} from '@chakra-ui/react'
import {GoPlus, GoCode} from 'react-icons/go'

import {Snippet} from 'components'

import useSupabase from 'utils/useSupabase'
import {useAppContext} from 'utils/useAppContext'

type snippetType = {
  id: string
  title: string
  description: string
  lang: string
  collection_id: string
  created_at: string
}

type snippetsType = snippetType[]

export function Snippets({...rest}) {
  const {supabase} = useSupabase()
  const {state} = useAppContext()
  const Router = useRouter()
  const [snippets, setSnippets] = useState<snippetsType | []>([])

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

      if (snippet.length > 0) {
        Router.push(`/app/${snippet[0]?.id}`)
      } else {
        Router.push(`/app`)
      }

      // const updatedCollections = snippet.map(item => {
      //   return {
      //     ...item,
      //     isEditing: false,
      //   }
      // })

      setSnippets(snippet)

      // dispatch({
      //   type: 'SELECT_COLLECTION',
      //   payload: collection[0].id,
      // })
    }

    getSnippets()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.selectedCollection, supabase])

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
            <button>
              <Icon as={GoPlus} color="whiteAlpha.800" />
            </button>
          </Flex>
          <AnimatePresence initial={false}>
            <Stack spacing={1} mt={1}>
              {snippets && (
                <>
                  {snippets.map(
                    ({id, title, description, lang, created_at}) => (
                      <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        key={id}
                        layout
                      >
                        <Link href={`/app/${id}`} prefetch shallow>
                          <a>
                            <Snippet
                              title={title}
                              description={description}
                              language={lang}
                              created_at={created_at}
                              isSelected
                            />
                          </a>
                        </Link>
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
