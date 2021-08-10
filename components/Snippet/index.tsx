import {Stack, Flex, Heading, Text, Badge} from '@chakra-ui/react'

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
      bg={isSelected ? 'blackAlpha.700' : 'transparent'}
      transition="ease"
      transitionProperty="background"
      transitionDuration=".6s"
      px={5}
      py={4}
      borderRadius="md"
      opacity={isSelected ? 1 : 0.4}
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
          {created_at}
        </Text>
      </Flex>
    </Stack>
  )
}
