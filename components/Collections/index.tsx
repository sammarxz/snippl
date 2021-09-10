import {useState, useEffect, useCallback} from 'react'
import {motion, AnimateSharedLayout, AnimatePresence} from 'framer-motion'
import {
  Box,
  Heading,
  Flex,
  Stack,
  Icon,
  Input,
  useBoolean,
} from '@chakra-ui/react'
import {IoFolder} from 'react-icons/io5'
import {GoPlus} from 'react-icons/go'

import {Collection} from 'components'

import useSupabase from 'utils/useSupabase'

import {useAppContext} from 'utils/useAppContext'

type collectionType = {
  id?: string
  name: string
  color: string
}

type collectionsType = collectionType[]

const variants = {
  open: {rotate: '0deg'},
  close: {rotate: '45deg'},
}

const colors = [
  'gray',
  'red',
  'orange',
  'yellow',
  'green',
  'teal',
  'blue',
  'cyan',
  'purple',
  'pink',
]

export function Collections({...rest}) {
  const {session, supabase} = useSupabase()
  const [showNewCollection, setShowNewCollection] = useBoolean()
  const [collections, setCollections] = useState<collectionsType | []>([])
  const [newCollection, setNewCollection] = useState('')

  const {
    state: {selectedCollection},
    dispatch,
  } = useAppContext()

  useEffect(() => {
    const getCollections = async () => {
      let {data: collection} = await supabase
        .from('collection')
        .select('*')
        .eq('user_id', session?.user?.id)

      if (!collection) {
        setCollections([])
        return
      }

      setCollections(collection)
      dispatch({
        type: 'SELECT_COLLECTION',
        payload: collection[0].id,
      })
    }

    getCollections()
  }, [supabase, session, dispatch])

  async function handleCollectionFormSubmit(e: React.SyntheticEvent) {
    e.preventDefault()

    const colorIndex = Math.round(Math.random() * (colors.length - 1))
    const color = colors[colorIndex]

    const newCollectionToAdd = {
      name: newCollection,
      color,
    }

    const newCollectionList = [...collections, newCollectionToAdd]

    setCollections(newCollectionList)

    setNewCollection('')
    setShowNewCollection.off()

    await supabase.from('collection').insert([
      {
        name: newCollection,
        color,
        user_id: session?.user?.id,
      },
    ])
  }

  function handleSetActiveCollection(id: string | undefined) {
    if (!id) return
    dispatch({
      type: 'SELECT_COLLECTION',
      payload: id,
    })
  }

  // function handleDeleteCollection(title: string) {
  //   // const newCollectionsList = collections.filter(
  //   //   collection => collection.title !== title,
  //   // )
  //   // console.log(title)
  //   // console.log(newCollectionsList)
  //   setCollections(state =>
  //     state.filter(collection => collection.title !== title),
  //   )
  //   console.log(collections)
  // }

  return (
    <Box
      as="aside"
      borderRight="1px"
      bg="whiteAlpha.100"
      borderRightColor="whiteAlpha.200"
      px={5}
      py={6}
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
                <Icon as={IoFolder} textColor="whiteAlpha.500" />
                <Box as="span" textColor="whiteAlpha.700">
                  Collections
                </Box>
              </Stack>
            </Heading>
            <motion.button
              onClick={setShowNewCollection.toggle}
              variants={variants}
              animate={showNewCollection ? 'close' : 'open'}
              layout
              style={{padding: 0}}
            >
              <Icon as={GoPlus} color="whiteAlpha.800" />
            </motion.button>
          </Flex>
          <AnimatePresence>
            {showNewCollection && (
              <motion.form
                onSubmit={handleCollectionFormSubmit}
                initial={{opacity: 0}}
                animate={{opacity: 1, transition: {delay: 0.1}}}
                exit={{opacity: 0}}
                layout
              >
                <Input
                  type="text"
                  value={newCollection}
                  size="sm"
                  variant="unstyled"
                  bg="whiteAlpha.200"
                  _placeholder={{color: 'whiteAlpha.400'}}
                  py={1}
                  px={3}
                  borderRadius="base"
                  placeholder="Collection Title"
                  onChange={e => setNewCollection(e.target.value)}
                  autoFocus
                />
              </motion.form>
            )}
          </AnimatePresence>
          <AnimatePresence initial={false}>
            <Stack spacing={1} mt={1}>
              {collections && (
                <>
                  {collections.map(({id, name, color}, index) => (
                    <motion.button
                      initial={{opacity: 0}}
                      animate={{opacity: 1}}
                      key={name}
                      layout
                      onClick={() => handleSetActiveCollection(id)}
                    >
                      <Collection
                        name={name}
                        color={color}
                        isActive={selectedCollection === id}
                      />
                    </motion.button>
                  ))}
                </>
              )}
            </Stack>
          </AnimatePresence>
        </Stack>
      </AnimateSharedLayout>
    </Box>
  )
}
