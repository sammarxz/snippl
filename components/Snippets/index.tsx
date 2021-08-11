import {motion} from 'framer-motion'
import {Box, Stack, Heading, Flex, Icon} from '@chakra-ui/react'
import {GoPlus, GoCode} from 'react-icons/go'

import {Snippet} from 'components'

export function Snippets({...rest}) {
  return (
    <Box
      as="aside"
      borderRight="1px"
      borderRightColor="whiteAlpha.200"
      px={5}
      py={6}
      {...rest}
    >
      <Stack spacing={1}>
        <Snippet
          title="Start new API Project"
          description="Let me show you around to get you started with Code Snippets"
          language="JavaScript"
          created_at="05 May, 2020"
          isSelected
        />
        <Snippet
          title="Start new API Project"
          description="Let me show you around to get you started with Code Snippets"
          language="JavaScript"
          created_at="05 May, 2020"
        />
        <Snippet
          title="Start new API Project"
          description="Let me show you around to get you started with Code Snippets"
          language="JavaScript"
          created_at="05 May, 2020"
        />
      </Stack>
    </Box>
  )
}
