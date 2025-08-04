import { SideBar } from '../../components/SideBar/sideBar'
import { Post } from '../../components/Post/post'
import { AddPost } from '../../components/AddPostModal/addPost'
import { Box } from '@chakra-ui/react'
import { useContext } from 'react'
import { UserContext } from '../../contexts/userContext'
import { LoadingSpinner } from '../../components/LoadingSpinner/loading'

export function Home() {
  const { posts, user } = useContext(UserContext)

  if (!user.userName || !user.userPhoto || !user.role || !posts) {
    return <LoadingSpinner />
  } else {
    return (
      <Box
        display={{ sm: 'flex', md: 'grid', lg: 'grid' }}
        flexDir="column"
        alignItems={{ sm: 'center', md: 'flex-start', lg: 'flex-start' }}
        gridTemplateColumns="256px 1fr"
        m="2rem auto"
        maxW="70rem"
        p="0 1rem"
        gap="2rem"
      >
        <Box display="flex" flexDir="column" gap="1rem">
          <SideBar />
          <AddPost />
        </Box>
        <Box display="flex" flexDir="column" alignItems="center" gap="30px">
          {posts.map(
            ({
              contentPost,
              createdAt,
              role,
              userName,
              idOfPost,
              userProfilePhoto,
              timestamp,
              uid,
            }) => (
              <Post
                key={idOfPost}
                contentPost={contentPost}
                createdAt={createdAt}
                role={role}
                userName={userName}
                userProfilePhoto={userProfilePhoto}
                idOfPost={idOfPost}
                timestamp={timestamp}
                uid={uid}
              />
            ),
          )}
        </Box>
      </Box>
    )
  }
}
