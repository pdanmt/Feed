import {
  addDoc,
  collection,
  doc,
  DocumentReference,
  updateDoc,
} from 'firebase/firestore'
import { CustomizedToast } from '../../components/Toast/customizedToast'
import { db } from '../../firebase-config'
import { userType } from '../../contexts/userContext'

interface AddPostActionProps {
  contentPost: string
  createdAt: string
  userRef: DocumentReference
  timestamp: Date
}

export async function AddPostAction({
  contentPost,
  userRef,
  createdAt,
  timestamp,
}: AddPostActionProps) {
  await addDoc(collection(db, '/posts'), {
    contentPost,
    userRef,
    createdAt,
    timestamp,
  })
    .then(() => {
      CustomizedToast({ isSucess: true, text: 'Post adicionado!' })
    })
    .catch((error) => {
      CustomizedToast({
        isSucess: false,
        text: 'Algo deu errado ao adicionar o post. Tente novamente',
      })
      console.error(`Erro ao adicionar posto: ${error}`)
    })
}

interface UpdateProfileActionProps {
  uid: string
  role: string
  userName: string
  setUser: React.Dispatch<React.SetStateAction<userType>>
}

export async function UpdateProfileAction({
  uid,
  role,
  userName,
  setUser,
}: UpdateProfileActionProps) {
  await updateDoc(doc(db, '/users', uid), { role, userName })
    .then(() => {
      setUser((state) => {
        return { ...state, userName, role }
      })
      CustomizedToast({ isSucess: true, text: 'Informações atualizadas!' })
    })
    .catch((error) => {
      CustomizedToast({
        isSucess: false,
        text: 'Algo deu errado. Tente novamente.',
      })
      console.error(`Erro ao atualizar informações: ${error}`)
    })
}
