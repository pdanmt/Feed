import { createBrowserRouter } from 'react-router-dom'
import { PageBase } from './pages/PageBase/pageBase'
import { Home } from './pages/Home/homeIndex'
import { AuthPage } from './pages/Auth/auth'
import { SignIn } from './pages/Auth/signIn'
import { SignUp } from './pages/Auth/signUp'
import { UsersProfile } from './pages/UsersProfile/usersProfile'
import { NotFound } from './pages/NotFound/notFound'
import { ErrorPage } from './pages/Error/errorPage'
import { FollowingPage } from './pages/Following/following'

export const AppRoutes = createBrowserRouter([
  {
    path: '/',
    element: <PageBase />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/user-profile?',
        element: <UsersProfile />,
      },
      {
        path: '/following',
        element: <FollowingPage />,
      },
    ],
  },
  {
    path: '/',
    element: <AuthPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/sign-in',
        element: <SignIn />,
      },
      {
        path: '/sign-up',
        element: <SignUp />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])
