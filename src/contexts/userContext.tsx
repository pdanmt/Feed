import { createContext, ReactNode, useEffect, useState } from 'react'
import { GetComments, GetPosts, GetUser } from '../services/acess/userAcess'
import photo from '../profilePhotos.json'

export interface userType {
  email: string
  userName: string
  role: string
  uid: string
  userPhoto: string
}

export interface postsBody {
  contentPost: string
  createdAt: string
  userName: string
  userProfilePhoto: string
  role: string
  idOfPost: string
}

export interface commentsBody {
  createdAt: string
  userName: string
  contentComment: string
  likedBy: string[]
  userPhoto: string
  postId: string
  id: string
}

interface userContextBody {
  user: userType
  posts: postsBody[]
  comments: commentsBody[]
  userPhoto: string
  setUser: React.Dispatch<React.SetStateAction<userType>>
  setUserPhoto: React.Dispatch<React.SetStateAction<string>>
  setComments: React.Dispatch<React.SetStateAction<commentsBody[]>>
}

interface UserContextProps {
  children: ReactNode
}

export const UserContext = createContext({} as userContextBody)

export function UserContextProvider({ children }: UserContextProps) {
  const [user, setUser] = useState({} as userType)
  const [posts, setPosts] = useState<postsBody[]>([])
  const [comments, setComments] = useState<commentsBody[]>([])
  const [userPhoto, setUserPhoto] = useState(photo[0].userPhoto)

  useEffect(() => {
    GetUser(setUser, setUserPhoto)
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
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
