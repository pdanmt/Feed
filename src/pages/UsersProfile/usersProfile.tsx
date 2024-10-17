import { Box, Image, Text } from '@chakra-ui/react'
import { useContext } from 'react'
import { UserContext } from '../../contexts/userContext'
import { useQuery } from '../../hooks/UseQuery/useQuery'
import { UserImage } from '../../components/userImage/userImg'
import { Post } from '../../components/Post/post'
import { LoadingSpinner } from '../../components/LoadingSpinner/loading'
import { FollowButton } from './followButton'

export function UsersProfile() {
  const { getUsers, posts, user } = useContext(UserContext)
  const queryUser = useQuery().get('user')

  if (!user.userName || !user.userPhoto || !user.role || !posts) {
    return <LoadingSpinner />
  } else {
    return (
      <Box
        w={{ sm: '95vw', md: '90vw', lg: '60vw' }}
        minH="70vh"
        m="3rem auto"
        pb="2rem"
        bg="var(--gray-5)"
        borderRadius="8px"
      >
        {getUsers.map(({ userName, bio, role, uid, userPhoto, followedBy }) => {
          if (uid.slice(0, 14) === queryUser) {
            return (
              <Box key={uid}>
                <Image
                  alt="cover user image"
                  src={userPhoto}
                  width="100%"
                  h="10rem"
                  borderRadius="8px 8px 0 0"
                  objectFit="cover"
                />

                {/* large screen */}
                <Box
                  display={{ sm: 'none', md: 'flex', lg: 'flex' }}
                  alignItems="flex-start"
                  justifyContent="space-between"
                  p="2rem"
                >
                  <Box display="flex" gap="1rem" maxW="70%">
                    <UserImage img={userPhoto} hasBorder />
                    <Box wordBreak="break-word">
                      <Text
                        fontSize="1.2rem"
                        fontWeight="700"
                        color="var(--default)"
                      >{`${userName} - ${role}`}</Text>
                      <Text>{bio}</Text>
                    </Box>
                  </Box>
                  <FollowButton followedBy={followedBy} uid={uid} />
                </Box>

                {/* small screen */}
                <Box
                  display={{ sm: 'flex', md: 'none', lg: 'none' }}
                  p="1rem"
                  flexDir="column"
                  gap="1rem"
                >
                  <Box
                    alignItems="center"
                    justifyContent="space-between"
                    display="flex"
                  >
                    <UserImage img={userPhoto} hasBorder />

                    <FollowButton followedBy={followedBy} uid={uid} />
                  </Box>
                  <Box wordBreak="break-word">
                    <Text
                      fontSize="1.2rem"
                      fontWeight="700"
                      color="var(--default)"
                    >{`${userName} - ${role}`}</Text>
                    <Text>{bio}</Text>
                  </Box>
                </Box>

                {/* posts */}
                <Box
                  display="flex"
                  flexDir="column"
                  alignItems="center"
                  justifyContent="center"
                  gap="1rem"
                >
                  <Box display="flex" w="100%">
                    <Box
                      as="span"
                      borderBottom="2px solid var(--gray-6)"
                      w={{ sm: '40%', md: '40%', lg: '100%' }}
                    />
                    <Text
                      textAlign="center"
                      pt="0.3rem"
                      fontSize="1.1rem"
                      color="var(--gray-1)"
                      border="2px solid var(--gray-6)"
                      borderBottom="none"
                      borderRadius="8px 8px 0 0"
                      w="100%"
                      letterSpacing="1px"
                    >
                      {posts.find((user) => user.uid.slice(0, 14) === queryUser)
                        ? `Posts de ${user.userName}`
                        : 'O usuário ainda não tem posts'}
                    </Text>
                    <Box
                      as="span"
                      borderBottom="2px solid var(--gray-6)"
                      w={{ sm: '40%', md: '40%', lg: '100%' }}
                    />
                  </Box>
                  <Box
                    w={{ md: '95%', lg: '70%' }}
                    display="flex"
                    flexDir="column"
                    gap="1rem"
                  >
                    {posts.map(
                      ({
                        contentPost,
                        createdAt,
                        idOfPost,
                        role,
                        userName,
                        userProfilePhoto,
                        timestamp,
                        uid,
                      }) => {
                        if (uid.slice(0, 14) === queryUser) {
                          return (
                            <Post
                              contentPost={contentPost}
                              createdAt={createdAt}
                              idOfPost={idOfPost}
                              role={role}
                              userName={userName}
                              userProfilePhoto={userProfilePhoto}
                              key={idOfPost}
                              timestamp={timestamp}
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
              </Box>
            )
          } else {
            return null
          }
        })}
      </Box>
    )
  }
}
