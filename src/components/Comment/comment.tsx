import styles from './Comment.module.css'

import { ThumbsUp, Trash } from 'phosphor-react'
import { UserImage } from '../userImage/userImg'
import { useContext } from 'react'
import {
  Button,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { UserContext } from '../../contexts/userContext'
import { DeleteComment } from '../../services/acess/userAcess'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase-config'

interface commentsProps {
  createdAt: string
  userName: string
  contentComment: string
  likes: string[]
  userPhoto: string
  id: string
}

export function Comment({
  contentComment,
  createdAt,
  likes,
  userPhoto,
  userName,
  id,
}: commentsProps) {
  const { user } = useContext(UserContext)
  const { isOpen, onOpen, onClose } = useDisclosure()

  function liked() {
    if (likes.find((likeId) => likeId === user.uid) === user.uid) {
      updateDoc(doc(db, '/comments', id), {
        likedBy: likes.filter((likeId) => likeId !== user.uid),
      })
    } else {
      updateDoc(doc(db, '/comments', id), {
        likedBy: [...likes, user.uid],
      })
    }
  }

  return (
    <div className={styles.comment}>
      <div className={styles.imageNoneMediaQuery}>
        <UserImage hasBorder={false} img={userPhoto} />
      </div>
      <section className={styles.container}>
        <section className={styles.commentContent}>
          <header>
            <section className={styles.secFlex}>
              <div className={styles.imgAndProfile}>
                <div className={styles.imageMediaQuery}>
                  <UserImage hasBorder={false} img={userPhoto} />
                </div>

                <div className={styles.column}>
                  <div className={styles.userName}>
                    <strong>{userName}</strong>
                    <p>{userName === user.userName && '(você)'}</p>
                  </div>
                  <time
                    title={`Publicado em ${createdAt}`}
                    dateTime={`publicado às ${createdAt}`}
                    className={styles.date}
                  >
                    Cerca de{' '}
                    {formatDistanceToNow(new Date(createdAt), { locale: ptBR })}
                  </time>
                </div>
              </div>
              {userName === user.userName && (
                <>
                  <span className={styles.trashIcon} title="Deletar comentário">
                    <Icon as={Trash} onClick={onOpen} />
                  </span>
                  <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
                    <ModalOverlay bg="#00000099" />
                    <ModalContent
                      display="flex"
                      flexDir="column"
                      bg="var(--gray-6)"
                      textAlign="center"
                    >
                      <ModalBody mt="2rem">
                        <Text
                          fontSize="1.4rem"
                          color="var(--default)"
                          fontWeight="bold"
                          pb="1.2rem"
                        >
                          Excluir comentário
                        </Text>
                        <Text>
                          Você tem certeza que gostaria de excluir este
                          comentário?
                        </Text>
                      </ModalBody>
                      <ModalFooter
                        display="flex"
                        gap="1rem"
                        justifyContent="center"
                        mb="2rem"
                      >
                        <Button
                          onClick={onClose}
                          w="40%"
                          variant="unstyled"
                          color="var(--default)"
                          _hover={{ bg: 'var(--gray-5)' }}
                        >
                          Cancelar
                        </Button>
                        <Button
                          onClick={() => DeleteComment(id)}
                          w="40%"
                          variant="unstyled"
                          color="var(--red)"
                          _hover={{ bg: 'var(--gray-5)' }}
                        >
                          Sim, excluir
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </>
              )}
            </section>
          </header>
          <main>{contentComment}</main>
        </section>

        <footer
          onClick={liked}
          className={
            likes.find((likeId) => likeId === user.uid)
              ? `${styles.likedColor}`
              : `${styles.noLikedColor}`
          }
        >
          <span title="like no comentário">
            <Icon as={ThumbsUp} lineHeight={0} fontSize="20" />
          </span>
          <p>Aplaudir</p>
          <span className={styles.numberOfLikes}>{likes.length}</span>
        </footer>
      </section>
    </div>
  )
}
