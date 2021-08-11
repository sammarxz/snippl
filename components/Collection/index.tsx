import {memo} from 'react'
import {Stack, Box, Heading, Flex} from '@chakra-ui/react'
import {FaTimes} from 'react-icons/fa'

type CollectionProps = {
  title: string
  color: string
  isActive: boolean
  // onDelete: (title: string) => void
}

export const Collection = memo(function Collection({
  title,
  color,
  isActive,
}: CollectionProps) {
  console.log('render collection')

  return (
    <Stack
      bg={isActive ? 'whiteAlpha.50' : 'transparent'}
      transition="ease"
      transitionProperty="all"
      transitionDuration=".6s"
      px={3}
      py={2}
      borderRadius="base"
      opacity={isActive ? 1 : 0.4}
      _hover={{opacity: 1}}
    >
      <Flex alignItems="center" justifyContent="space-between">
        <Stack spacing={3} alignItems="center" isInline>
          <Box w="8px" h="8px" borderRadius="8px" bg={`${color}.400`}></Box>
          <Heading
            as="h2"
            fontSize="sm"
            fontWeight="600"
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {title}
          </Heading>
        </Stack>
        {/* <button onClick={() => onDelete(title)}>
          <FaTimes />
        </button> */}
      </Flex>
    </Stack>
  )
})
