import {
  Box,
  Stack,
  Editable,
  EditableInput,
  EditablePreview,
  Textarea,
} from '@chakra-ui/react'

export function Editor({...rest}) {
  return (
    <Box as="section" px={8} py={4} overflowY="auto" {...rest}>
      <Stack>
        <Editable
          defaultValue="Snippet Title"
          fontSize="4xl"
          fontWeight="600"
          placeholder="Snippet Title"
          w="100%"
        >
          <EditablePreview />
          <EditableInput />
        </Editable>
        <Textarea
          isFullWidth
          isRequired
          variant="unstyled"
          fontFamily="mono"
          textColor="whiteAlpha.700"
          resize="vertical"
          rows={8}
          placeholder="// Snippet Description"
          _placeholder={{color: 'whiteAlpha.500'}}
        />
      </Stack>
    </Box>
  )
}
