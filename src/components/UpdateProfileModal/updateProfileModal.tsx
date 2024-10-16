import {
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react'
import { PencilSimpleLine } from 'phosphor-react'
import styles from '../SideBar/SideBar.module.css'
import { useContext } from 'react'
import { UserContext } from '../../contexts/userContext'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ModalFooterComponent } from '../ModalFooter/modalFooter'
import { UpdateProfileAction } from '../../services/actions/actions'
import { CustomizedToast } from '../Toast/customizedToast'

export function UpdateProfileModal() {
  const { user, setUser, getUsers } = useContext(UserContext)
  const { isOpen, onClose, onOpen } = useDisclosure()

  const updateProfileSchema = z.object({
    userName: z.string(),
    role: z.string(),
    bio: z.string(),
  })

  type updateProfileType = z.infer<typeof updateProfileSchema>

  const { handleSubmit, register } = useForm<updateProfileType>({
    resolver: zodResolver(updateProfileSchema),
  })

  async function updateUserProfile({ role, userName, bio }: updateProfileType) {
    if (
      getUsers.find((user) => user.userName !== userName) ||
      user.userName === userName
    ) {
      UpdateProfileAction({ role, setUser, uid: user.uid, userName, bio })
    } else {
      CustomizedToast({
        isSucess: false,
        text: 'O nome de usuário já está sendo usado.',
      })
    }
  }

  return (
    <>
      <button onClick={onOpen} className={styles.openModalBtn}>
        <PencilSimpleLine size={20} /> Editar seu perfil
      </button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay bg="#00000090" />
        <ModalContent bg="var(--gray-6)" boxShadow="0 0 35px var(--gray-6)">
          <ModalCloseButton />
          <ModalHeader>Atualize o seu perfil</ModalHeader>
          <form onSubmit={handleSubmit(updateUserProfile)}>
            <ModalBody
              display="flex"
              flexDir="column"
              gap="1rem"
              alignItems="center"
            >
              <Input
                variant="unstyled"
                border="1px solid var(--gray-3)"
                padding="0.5rem"
                fontSize="1.1rem"
                defaultValue={user.userName}
                {...register('userName')}
                pattern="[a-zA-Z0-9-_]+"
                type="text"
                maxLength={20}
                isRequired
              />
              <Input
                variant="unstyled"
                border="1px solid var(--gray-3)"
                padding="0.5rem"
                fontSize="1.1rem"
                defaultValue={user.role}
                {...register('role', { required: 'O cargo é obrigatório' })}
                maxLength={20}
                isRequired
              />
              <Textarea
                resize="none"
                variant="unstyled"
                border="1px solid var(--gray-3)"
                padding="0.5rem"
                fontSize="1.1rem"
                defaultValue={user.bio}
                {...register('bio')}
                required
                maxLength={240}
              />
            </ModalBody>
            <ModalFooterComponent
              onClose={onClose}
              closeBtnText="Fechar"
              saveBtnText="Salvar"
            />
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}
