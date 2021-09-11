import {extendTheme} from '@chakra-ui/react'

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'blackAlpha.900',
        color: 'whiteAlpha.700',
      },
    },
  },
  fonts: {
    heading: 'IBM Plex Sans, system-ui, sans-serif',
    body: 'IBM Plex Sans, system-ui, sans-serif',
    mono: 'IBM Plex Mono, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  },
  components: {
    Modal: {
      defaultProps: {
        colorScheme: 'dark',
      },
      variants: {
        dark: {
          bg: 'black',
          color: 'white',
        },
      },
    },
  },
})
