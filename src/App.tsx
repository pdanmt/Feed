import { RouterProvider } from 'react-router-dom'
import { AppRoutes } from './routes'
import { Toaster } from 'sonner'
import { UserContextProvider } from './contexts/userContext'
import { ChakraProvider } from '@chakra-ui/react'
import { customTheme } from './styles'

export function App() {
  return (
    <ChakraProvider theme={customTheme}>
      <UserContextProvider>
        <Toaster richColors />
        <RouterProvider router={AppRoutes} />
      </UserContextProvider>
    </ChakraProvider>
  )
}
