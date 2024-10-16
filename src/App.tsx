import { RouterProvider } from 'react-router-dom'
import { AppRoutes } from './routes'
import { Toaster } from 'sonner'
import { UserContextProvider } from './contexts/userContext'
import { ChakraProvider } from '@chakra-ui/react'
import { customTheme } from './themes/darkTheme'
import { QueryClient, QueryClientProvider } from 'react-query'

export function App() {
  const queryClient = new QueryClient()

  return (
    <ChakraProvider theme={customTheme}>
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <Toaster richColors />
          <RouterProvider router={AppRoutes} />
        </UserContextProvider>
      </QueryClientProvider>
    </ChakraProvider>
  )
}
