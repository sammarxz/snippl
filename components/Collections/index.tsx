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

type collectionType = {
  title: string
  color: string
  isActive: boolean
}

type collectionsType = collectionType[]

const variants = {
  open: {rotate: '0deg'},
  close: {rotate: '45deg'},
}

export function Collections({...rest}) {
  const [collections, setCollections] = useState<collectionsType | []>([])
  const [newCollection, setNewCollection] = useState('')
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
  const [showNewCollection, setShowNewCollection] = useBoolean()

  useEffect(() => {
    const collectionsList = [
      {
        title: 'Getting Started',
        color: 'green',
        isActive: true,
      },
      {
        title: 'Elixir',
        color: 'purple',
        isActive: false,
      },
      {
        title: 'Docker',
        color: 'cyan',
        isActive: false,
      },
    ]
    setCollections(collectionsList)
  }, [])

  function handleCollectionFormSubmit(e: React.SyntheticEvent) {
    e.preventDefault()
    const colorIndex = Math.round(Math.random() * (colors.length - 1))
    const color = colors[colorIndex]
    const newCollectionToAdd = {
      title: newCollection,
      color,
      isActive: true,
    }
    const newCollectionsList = collections.map(collection => {
      collection.isActive = false
      return collection
    })

    setCollections([...newCollectionsList, newCollectionToAdd])
    setNewCollection('')
    setShowNewCollection.off()
  }

  function handleSetActiveCollection(title: string) {
    const newCollectionsList = collections.map(collection => {
      collection.isActive = false
      if (collection.title === title) {
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
                  mt={1}
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
              {collections.map(({title, color, isActive}) => (
                <motion.button
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  key={title}
                  layout
                  onClick={() => handleSetActiveCollection(title)}
                >
                  <Collection title={title} color={color} isActive={isActive} />
                </motion.button>
              ))}
            </Stack>
          </AnimatePresence>
        </Stack>
      </AnimateSharedLayout>
    </Box>
  )
}
