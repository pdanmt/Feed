import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import { PencilSimpleLine } from 'phosphor-react'
import styles from '../SideBar/SideBar.module.css'
import { useContext } from 'react'
import { UserContext } from '../../contexts/userContext'
import { UpdateProfileTextArea } from '../UpadateProfileTextArea/textarea'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ModalFooterComponent } from '../ModalFooter/modalFooter'
import { UpdateProfileAction } from '../../services/actions/actions'

export function UpdateProfileModal() {
  const { user, setUser } = useContext(UserContext)
  const { isOpen, onClose, onOpen } = useDisclosure()

  const updateProfileSchema = z.object({
    userName: z.string(),
    role: z.string(),
  })

  type updateProfileType = z.infer<typeof updateProfileSchema>

  const updateProfileForm = useForm<updateProfileType>({
    resolver: zodResolver(updateProfileSchema),
  })

  const { handleSubmit } = updateProfileForm

  async function updateUserProfile({ role, userName }: updateProfileType) {
    UpdateProfileAction({ role, setUser, uid: user.uid, userName })
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
          <FormProvider {...updateProfileForm}>
            <form onSubmit={handleSubmit(updateUserProfile)}>
              <ModalBody
                display="flex"
                flexDir="column"
                gap="1rem"
                alignItems="center"
              >
                <UpdateProfileTextArea
                  defaultValue={user.userName}
                  registerName="userName"
                />
                <UpdateProfileTextArea
                  defaultValue={user.role}
                  registerName="role"
                />
              </ModalBody>
              <ModalFooterComponent
                onClose={onClose}
                closeBtnText="Fechar"
                saveBtnText="Salvar"
              />
            </form>
          </FormProvider>
        </ModalContent>
      </Modal>
    </>
  )
}
