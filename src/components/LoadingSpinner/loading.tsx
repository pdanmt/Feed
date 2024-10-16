import { Box } from '@chakra-ui/react'
import { OrbitProgress } from 'react-loading-indicators'

export function LoadingSpinner() {
  return (
    <Box
      display="flex"
      h="91vh"
      w="100%"
      justifyContent="center"
      alignItems="center"
    >
      <OrbitProgress color="var(--gray-2)" size="small" />
    </Box>
  )
}
