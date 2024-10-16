import { extendTheme } from '@chakra-ui/react'

export const customTheme = extendTheme({
  styles: {
    global: {
      ':root': {
        '--white': '#000',
        '--gray-1': '#111827',
        '--gray-2': '#f3f4f6',
        '--gray-3': '#f3f4f6',
        '--gray-4': '#b3b3b3',
        '--gray-5': '#999999',
        '--gray-6': '#808080',
        '--gray-7': '#fff',
        '--green': '#4caf50',
        '--green-2': '#76d275',
        '--green-3': '#a5d6a7',
        '--red': '#e57373',
        '--red-2': '#f44336',
      },

      '*': {
        boxSizing: 'border-box',
        margin: 0,
        padding: 0,
      },
      ':focus': {
        outline: '0.5px solid var(--green)',
      },
      body: {
        bg: 'var(--gray-7)',
        color: 'var(--gray-2)',
        WebkitFontSmoothing: 'antialiased',
      },
      'body, input, textarea, button': {
        fontFamily: "'Roboto', sans-serif",
        fontWeight: '400',
        fontSize: '1rem',
      },
    },
  },
})
