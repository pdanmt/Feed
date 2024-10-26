import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Icon,
  useDisclosure,
} from '@chakra-ui/react'
import { DeleteComment, DeletePost } from '../../services/acess/userAcess'
import { Trash } from 'phosphor-react'
import { useContext } from 'react'
import { UserContext } from '../../contexts/userContext'

interface DeleteCommentOrPostModalProps {
  id: string
  deletePost?: boolean
}

export function DeleteCommentOrPostModal({
  id,
  deletePost,
}: DeleteCommentOrPostModalProps) {
  const { setPosts } = useContext(UserContext)
  const { isOpen, onClose, onOpen } = useDisclosure()

  function deleteFn() {
    if (deletePost) {
      DeletePost(id)
      setPosts((prev) => prev.filter((post) => post.idOfPost !== id))
    } else {
      DeleteComment(id)
    }
  }

  return (
    <>
      <Button
        as="span"
        title="Deletar comentário"
        variant="unstyled"
        color="var(--gray-3)"
        cursor="pointer"
        transition="0.2s"
        _hover={{ color: 'var(--red)' }}
      >
        <Icon as={Trash} onClick={onOpen} fontSize={20} lineHeight={0} />
      </Button>
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
              Você tem certeza que gostaria de excluir este comentário?
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
              onClick={() => deleteFn()}
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
  )
}
