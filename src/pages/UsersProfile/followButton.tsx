import { Button } from '@chakra-ui/react'
import { useContext } from 'react'
import { UserContext } from '../../contexts/userContext'
import { FollowOrUnfollowUser } from '../../services/actions/actions'
import { useMutation } from 'react-query'

interface FollowButtonProps {
  uid?: string
  followedBy?: string[]
}

export function FollowButton({ uid, followedBy }: FollowButtonProps) {
  const { user, setUser } = useContext(UserContext)

  const { mutateAsync: followOrUnfollowUserFn, isLoading } = useMutation({
    mutationFn: FollowOrUnfollowUser,
    onError(error) {
      console.error(`Algo deu errado. Erro: ${error}`)
    },
  })
  return (
    <Button
      bg="transparent"
      color="var(--green)"
      border="1px solid var(--green)"
      isDisabled={isLoading}
      _hover={{
        transition: '0.2s',
        bg: 'var(--green)',
        color: 'var(--default)',
      }}
      onClick={() =>
        uid &&
        followedBy &&
        followOrUnfollowUserFn({
          uidToFollow: uid,
          followedBy,
          setUser,
          userFollowing: user.following,
          userUid: user.uid,
        })
      }
    >
      {uid && user.following.find((userFollowed) => userFollowed === uid)
        ? 'Seguindo'
        : 'Seguir'}
    </Button>
  )
}
