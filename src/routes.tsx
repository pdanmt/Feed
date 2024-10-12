import { createBrowserRouter } from 'react-router-dom'
import { PageBase } from './pages/PageBase/pageBase'
import { Home } from './pages/Home/homeIndex'
import { AuthPage } from './pages/Auth/auth'
import { SignIn } from './pages/Auth/signIn'
import { SignUp } from './pages/Auth/signUp'

export const AppRoutes = createBrowserRouter([
    {
        path: '/',
        element: <PageBase />,
        children: [
            {
                path: '/',
                element: <Home />
            }
        ]
    },
    {
        path: '/',
        element: <AuthPage />,
        children: [
            {
                path: '/sign-in',
                element: <SignIn />
            },
            {
                path: '/sign-up',
                element: <SignUp />
            }
        ]
    }
])