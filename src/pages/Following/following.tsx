import { Box } from '@chakra-ui/react'
import { SideBar } from '../../components/SideBar/sideBar'
import { AddPost } from '../../components/AddPostModal/addPost'
import { useContext } from 'react'
import { UserContext } from '../../contexts/userContext'
import { Post } from '../../components/Post/post'
import { LoadingSpinner } from '../../components/LoadingSpinner/loading'

export function FollowingPage() {
  const { posts, user, getUsers } = useContext(UserContext)

  if (!posts || !user.userPhoto || !getUsers) {
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
              idOfPost,
              role,
              timestamp,
              userName,
              userProfilePhoto,
              uid,
            }) => {
              const getUserId = getUsers.find(
                (user) => user.userName === userName,
              )
              if (user.following.find((userId) => userId === getUserId?.uid)) {
                return (
                  <Post
                    contentPost={contentPost}
                    createdAt={createdAt}
                    idOfPost={idOfPost}
                    role={role}
                    timestamp={timestamp}
                    userName={userName}
                    userProfilePhoto={userProfilePhoto}
                    key={idOfPost}
                    uid={uid}
                  />
                )
              } else {
                return null
              }
            },
          )}
        </Box>
      </Box>
    )
  }
}
