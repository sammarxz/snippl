import {useState, useEffect, useCallback} from 'react'
import {SupabaseClient} from '@supabase/supabase-js'
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

type collectionType = {
  name: string
  color: string
  isActive: boolean
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

  useEffect(() => {
    const getCollections = async () => {
      let {data: collection} = await supabase.from('collection').select('*')
      if (collection) {
        const updatedCollections = collection.map(item => {
          return {
            ...item,
            isActive: false,
          }
        })

        updatedCollections[0].isActive = true

        setCollections(updatedCollections)
        return
      }

      setCollections([])
    }

    getCollections()
  }, [supabase])

  async function handleCollectionFormSubmit(e: React.SyntheticEvent) {
    e.preventDefault()

    const colorIndex = Math.round(Math.random() * (colors.length - 1))
    const color = colors[colorIndex]
    const newCollectionToAdd = {
      name: newCollection,
      color,
      isActive: true,
    }
    const newCollectionsList = collections.map(collection => {
      collection.isActive = false
      return collection
    })

    setCollections([...newCollectionsList, newCollectionToAdd])
    await supabase.from('collection').insert([
      {
        name: newCollection,
        color,
        user_id: session?.user?.id,
      },
    ])

    setNewCollection('')
    setShowNewCollection.off()
  }

  function handleSetActiveCollection(name: string) {
    const newCollectionsList = collections.map(collection => {
      collection.isActive = false
      if (collection.name === name) {
        collection.isActive = true
      }
      return {
        ...collection,
      }
    })

    setCollections(newCollectionsList)
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
              {collections.map(({name, color, isActive}) => (
                <motion.button
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  key={name}
                  layout
                  onClick={() => handleSetActiveCollection(name)}
                >
                  <Collection title={name} color={color} isActive={isActive} />
                </motion.button>
              ))}
            </Stack>
          </AnimatePresence>
        </Stack>
      </AnimateSharedLayout>
    </Box>
  )
}
