import styles from './Home.module.css'

import { SideBar } from '../../components/SideBar/sideBar'
import { Post } from '../../components/Post/post'
import { AddPost } from '../../components/AddPostModal/addPost'
import { Box } from '@chakra-ui/react'
import { useContext } from 'react'
import { UserContext } from '../../contexts/userContext'

export function Home() {
  const { posts } = useContext(UserContext)

  return (
    <div className={styles.home}>
      <Box display="flex" flexDir="column" gap="1rem">
        <SideBar />
        <AddPost />
      </Box>
      <main>
        {posts.map(
          ({
            contentPost,
            createdAt,
            role,
            userName,
            idOfPost,
            userProfilePhoto,
          }) => (
            <Post
              key={idOfPost}
              contentPost={contentPost}
              createdAt={createdAt}
              role={role}
              userName={userName}
              userProfilePhoto={userProfilePhoto}
              idOfPost={idOfPost}
            />
          ),
        )}
      </main>
    </div>
  )
}
