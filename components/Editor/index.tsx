import {useState} from 'react'
import {
  Box,
  Editable,
  EditableInput,
  EditablePreview,
  Textarea,
} from '@chakra-ui/react'

import {Code} from 'components'

export function Editor({...rest}) {
  return (
    <Box as="section" px={8} py={4} overflowY="auto" {...rest}>
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
        isRequired
        variant="unstyled"
        fontFamily="mono"
        textColor="whiteAlpha.700"
        resize="vertical"
        rows={1}
        placeholder="// Snippet Description"
        _placeholder={{color: 'whiteAlpha.500'}}
        my={4}
      />
      <Code />
    </Box>
  )
}
