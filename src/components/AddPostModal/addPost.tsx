import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { doc } from 'firebase/firestore'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { db } from '../../firebase-config'
import { useContext } from 'react'
import { UserContext } from '../../contexts/userContext'
import { ModalFooterComponent } from '../ModalFooter/modalFooter'
import { AddPostAction } from '../../services/actions/actions'

export function AddPost() {
  const { user } = useContext(UserContext)
  const { isOpen, onClose, onOpen } = useDisclosure()

  const addPostSchema = z.object({
    contentPost: z.string(),
  })

  type addPostType = z.infer<typeof addPostSchema>

  const { handleSubmit, register, reset } = useForm<addPostType>({
    resolver: zodResolver(addPostSchema),
  })

  async function addPost({ contentPost }: addPostType) {
    const userRef = doc(db, 'users', user.uid)
    const createdAt = String(new Date())

    await AddPostAction({ contentPost, createdAt, userRef })

    reset()
    onClose()
  }

  return (
    <>
      <Button
        bg="var(--green)"
        color="var(--white)"
        fontWeight="400"
        _hover={{ transition: '0.2s', filter: 'brightness(1.2)' }}
        onClick={onOpen}
      >
        Adicionar post
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
        <ModalOverlay />
        <ModalContent bg="var(--gray-6)">
          <ModalCloseButton />
          <ModalHeader>Adicione um post</ModalHeader>
          <form onSubmit={handleSubmit(addPost)}>
            <ModalBody>
              <Textarea
                placeholder="Digite o conteúdo do post"
                variant="unstyled"
                border="1px solid var(--gray-3)"
                p="0.5rem"
                {...register('contentPost')}
              />
            </ModalBody>
            <ModalFooterComponent
              onClose={onClose}
              closeBtnText="Cancelar"
              saveBtnText="Adicionar"
            />
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}
