import {memo} from 'react'
import {Stack, Box, Heading} from '@chakra-ui/react'

type CollectionProps = {
  title: string
  color: string
  isActive: boolean
}

export const Collection = memo(function Collection({
  title,
  color,
  isActive,
}: CollectionProps) {
  return (
    <Stack
      spacing={3}
      alignItems="center"
      bg={isActive ? 'blackAlpha.700' : 'transparent'}
      textColor={isActive ? 'whiteAlpha.800' : 'whiteAlpha.500'}
      transition="ease"
      transitionProperty="background"
      transitionDuration=".6s"
      px={3}
      py={2}
      borderRadius="base"
      isInline
    >
      <Box w="8px" h="8px" borderRadius="8px" bg={`${color}.400`}></Box>
      <Heading as="h2" fontSize="sm" fontWeight="600">
        {title}
      </Heading>
    </Stack>
  )
})
