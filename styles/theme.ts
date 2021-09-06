import {extendTheme} from '@chakra-ui/react'

export const theme = extendTheme({
  fonts: {
    heading: 'IBM Plex Sans, system-ui, sans-serif',
    body: 'IBM Plex Sans, system-ui, sans-serif',
    mono: 'IBM Plex Mono, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  },
  colors: {
    brand: {
      50: '#e2e7fc',
      100: '#b4c1f8',
      200: '#9cadf6',
      300: '#859af4',
      400: '#6e87f1',
      500: 'rgba(63, 96, 237, 1)',
      600: '#153ce4',
      700: '#1336cc',
      800: '#1130b5',
      900: '#0d2486',
    },
    bg: {
      900: '#101224',
    },
  },
})
