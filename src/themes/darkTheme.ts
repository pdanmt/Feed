import { extendTheme } from '@chakra-ui/react'

export const customTheme = extendTheme({
  styles: {
    global: {
      ':root': {
        '--default': '#fff',
        '--gray-1': '#e1e1e6',
        '--gray-2': '#c4c4cc',
        '--gray-3': '#8d8d99',
        '--gray-4': '#323238',
        '--gray-5': '#29292e',
        '--gray-6': '#202024',
        '--gray-7': '#121214',
        '--green': '#00875f',
        '--green-2': '#1c8701',
        '--green-3': '#6bd14f',
        '--red': '#F75A68',
        '--red-2': '#c61a09',
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
  breakpoints: {
    sm: '200px',
    md: '830px',
    lg: '1200px',
  },
})
