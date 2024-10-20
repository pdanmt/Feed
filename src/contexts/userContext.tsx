import { createContext, ReactNode, useEffect, useState } from 'react'
import {
  GetAllUsers,
  GetComments,
  GetPosts,
  GetUser,
} from '../services/acess/userAcess'

export interface userType {
  email: string
  userName: string
  role: string
  uid: string
  userPhoto: string
  userCoverPhoto: string
  bio: string
  followedBy: string[]
  following: string[]
}

export interface postsBody {
  contentPost: string
  createdAt: string
  timestamp: Date
  userName: string
  userProfilePhoto: string
  role: string
  idOfPost: string
  uid: string
}

export interface commentsBody {
  createdAt: string
  timestamp: Date
  userName: string
  contentComment: string
  likedBy: string[]
  userPhoto: string
  postId: string
  id: string
}

interface userContextBody {
  user: userType
  getUsers: userType[]
  posts: postsBody[]
  comments: commentsBody[]
  userPhoto: string
  userCoverPhoto: string
  setUser: React.Dispatch<React.SetStateAction<userType>>
  setGetUsers: React.Dispatch<React.SetStateAction<userType[]>>
  setUserPhoto: React.Dispatch<React.SetStateAction<string>>
  setUserCoverPhoto: React.Dispatch<React.SetStateAction<string>>
  setComments: React.Dispatch<React.SetStateAction<commentsBody[]>>
}

interface UserContextProps {
  children: ReactNode
}

export const UserContext = createContext({} as userContextBody)

export function UserContextProvider({ children }: UserContextProps) {
  const [user, setUser] = useState({} as userType)
  const [getUsers, setGetUsers] = useState<userType[]>([])
  const [posts, setPosts] = useState<postsBody[]>([])
  const [comments, setComments] = useState<commentsBody[]>([])
  const [userPhoto, setUserPhoto] = useState('')
  const [userCoverPhoto, setUserCoverPhoto] = useState('')

  useEffect(() => {
    GetUser(setUser)
    GetAllUsers(setGetUsers)
    GetPosts(setPosts)
    GetComments(setComments)
  }, [])

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        posts,
        setUserPhoto,
        userPhoto,
        comments,
        setComments,
        getUsers,
        setGetUsers,
        setUserCoverPhoto,
        userCoverPhoto,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
