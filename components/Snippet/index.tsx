import {Stack, Flex, Heading, Text, Badge} from '@chakra-ui/react'

import {formatDate} from 'utils/formatDate'

type SnippetProps = {
  title: string
  description: string
  created_at: string
  language: string
  isSelected?: boolean
}

export function Snippet({
  title,
  description,
  created_at,
  language,
  isSelected = false,
}: SnippetProps) {
  return (
    <Stack
      bg={isSelected ? 'whiteAlpha.200' : 'transparent'}
      transition="ease"
      transitionProperty="all"
      transitionDuration=".6s"
      px={5}
      py={4}
      borderRadius="md"
      opacity={isSelected ? 1 : 0.4}
      _hover={{opacity: 1}}
    >
      <Heading fontSize="lg" textColor="whiteAlpha.800">
        {title}
      </Heading>
      <Text fontFamily="mono" fontSize="sm" textColor="whiteAlpha.500">
        {description}
      </Text>
      <Flex alignItems="center" justifyContent="space-between">
        <Badge variant="subtle" colorScheme="whiteAlpha">
          {language}
        </Badge>
        <Text fontFamily="mono" fontSize="xs" textColor="whiteAlpha.500">
          {formatDate(created_at, 'relative')}
        </Text>
      </Flex>
    </Stack>
  )
}
