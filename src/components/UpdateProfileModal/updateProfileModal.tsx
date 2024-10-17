import {
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
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ModalFooterComponent } from '../ModalFooter/modalFooter'
import { UpdateProfileAction } from '../../services/actions/actions'
import { CustomizedToast } from '../Toast/customizedToast'
import { UpdateProfileInput } from '../UpadateProfileInput/input'

export function UpdateProfileModal() {
  const { user, setUser } = useContext(UserContext)
  const { isOpen, onClose, onOpen } = useDisclosure()

  const updateProfileSchema = z.object({
    userName: z.string().trim(),
    role: z.string().trim(),
    bio: z.string().trim(),
  })

  type updateProfileType = z.infer<typeof updateProfileSchema>

  const updateFormProvider = useForm<updateProfileType>({
    resolver: zodResolver(updateProfileSchema),
  })

  const { handleSubmit, register } = updateFormProvider

  async function updateUserProfile({ role, userName, bio }: updateProfileType) {
    await UpdateProfileAction({
      role,
      setUser,
      uid: user.uid,
      userName,
      bio,
    })

    CustomizedToast({
      isSucess: true,
      text: 'Informações atualizadas com sucesso!',
    })
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
          <FormProvider {...updateFormProvider}>
            <form onSubmit={handleSubmit(updateUserProfile)}>
              <ModalBody
                display="flex"
                flexDir="column"
                gap="1rem"
                alignItems="center"
              >
                <UpdateProfileInput
                  defaultValue={user.userName}
                  registerName="userName"
                />

                <UpdateProfileInput
                  defaultValue={user.role}
                  registerName="role"
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
          </FormProvider>
        </ModalContent>
      </Modal>
    </>
  )
}
