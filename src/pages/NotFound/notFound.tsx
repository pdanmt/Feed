import { Box, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <Box
      display="flex"
      textAlign="center"
      justifyContent="center"
      flexDir="column"
      minH="100vh"
    >
      <Text fontSize="1.5rem" color="var(--default)" letterSpacing="1px">
        Página não encontrada.
      </Text>
      <Text>
        Voltar para o{' '}
        <Text
          as={Link}
          to="/"
          color="var(--green-2)"
          transition="0.2s"
          _hover={{ color: 'var(--green-3)' }}
          fontSize="1.1rem"
        >
          feed
        </Text>
      </Text>
    </Box>
  )
}
