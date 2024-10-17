import {
  Button,
  Icon,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import photos from '../../profilePhotos.json'
import { useContext } from 'react'
import { UserContext } from '../../contexts/userContext'
import { X } from 'phosphor-react'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase-config'

export function ChoiceUserPhotoModal() {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const { userPhoto, setUserPhoto, user } = useContext(UserContext)

  async function handleChoicePhoto(userPhotoChosen: string) {
    await updateDoc(doc(db, '/users', user.uid), {
      userPhoto: userPhotoChosen,
    })

    setUserPhoto(userPhotoChosen)
    onClose()
  }

  return (
    <>
      <Image
        src={userPhoto}
        alt=""
        onClick={onOpen}
        w="60px"
        h="60px"
        borderRadius="100%"
        border="3px solid var(--gray-6)"
        outline="2px solid var(--green)"
      />
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay bg="#00000090" />
        <ModalContent bg="var(--gray-6)" display="flex" alignItems="center">
          <ModalHeader
            display="flex"
            justifyContent="space-between"
            w="100%"
            alignItems="center"
          >
            Escoha uma foto de perfil
            <Icon as={X} onClick={onClose} cursor="pointer" />
          </ModalHeader>
          <ModalBody
            display="flex"
            flexWrap="wrap"
            justifyContent="center"
            rowGap="1rem"
            border="1px solid var(--gray-4)"
            borderRadius="10px"
            w="90%"
          >
            {photos.map(({ userPhoto }) => (
              <Image
                src={userPhoto}
                alt=""
                key={userPhoto}
                w="60px"
                h="60px"
                borderRadius="100%"
                border="3px solid transparent"
                _hover={{ outline: '2px solid var(--green)' }}
                onClick={() => handleChoicePhoto(userPhoto)}
              />
            ))}
          </ModalBody>
          <ModalFooter>
            <Button
              bg="var(--red)"
              color="var(--default)"
              _hover={{ transition: '0.2s', filter: 'brightness(0.8)' }}
              onClick={onClose}
              type="button"
            >
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
