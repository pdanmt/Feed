import { Box, Text } from '@chakra-ui/react'
import { Link, useRouteError } from 'react-router-dom'

export function ErrorPage() {
  const error = useRouteError() as Error
  return (
    <Box
      display="flex"
      textAlign="center"
      justifyContent="center"
      flexDir="column"
      minH="100vh"
    >
      <Text fontSize="1.5rem" color="var(--default)" letterSpacing="1px">
        Ops... Algo deu errado.
      </Text>
      <Text fontSize="1.1rem" pb="1rem">
        Um erro aconteceu na aplicação. Veja mais detalhes abaixo:
      </Text>
      <Text>- {error.message || JSON.stringify(error)} -</Text>
      <Text pt="1rem">
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
