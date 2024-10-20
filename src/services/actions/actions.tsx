import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentReference,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import { CustomizedToast } from '../../components/Toast/customizedToast'
import { auth, db } from '../../firebase-config'
import { userType } from '../../contexts/userContext'
import { deleteUser, signOut } from 'firebase/auth'
import { FirebaseError } from 'firebase/app'

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
  bio: string
  userName: string
  setUser: React.Dispatch<React.SetStateAction<userType>>
}

export async function UpdateProfileAction({
  uid,
  role,
  bio,
  userName,
  setUser,
}: UpdateProfileActionProps) {
  await updateDoc(doc(db, '/users', uid), { role, userName, bio })
    .then(() => {
      setUser((state) => {
        return { ...state, userName, role, bio }
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

interface FollowOrUnfollowUser {
  uidToFollow: string
  followedBy: string[]
  userUid: string
  userFollowing: string[]
  setUser: React.Dispatch<React.SetStateAction<userType>>
}

export async function FollowOrUnfollowUser({
  followedBy,
  setUser,
  uidToFollow,
  userFollowing,
  userUid,
}: FollowOrUnfollowUser) {
  try {
    if (userFollowing.find((userFollowed) => userFollowed === uidToFollow)) {
      await updateDoc(doc(db, '/users', uidToFollow), {
        followedBy: followedBy.filter(
          (userFollowing) => userFollowing !== userUid,
        ),
      })
      await updateDoc(doc(db, '/users', userUid), {
        following: userFollowing.filter(
          (userFollowed) => userFollowed !== uidToFollow,
        ),
      })

      setUser((prev) => {
        return {
          ...prev,
          following: userFollowing.filter(
            (userFollowed) => userFollowed !== uidToFollow,
          ),
        }
      })

      CustomizedToast({
        isSucess: true,
        text: 'Você deixou de seguir este perfil!',
      })
    } else {
      await updateDoc(doc(db, '/users', uidToFollow), {
        followedBy: [...followedBy, userUid],
      })
      await updateDoc(doc(db, '/users', userUid), {
        following: [...userFollowing, uidToFollow],
      })

      setUser((prev) => {
        return {
          ...prev,
          following: [...userFollowing, uidToFollow],
        }
      })

      CustomizedToast({
        isSucess: true,
        text: 'Agora você está seguindo este perfil!',
      })
    }
  } catch (error) {
    CustomizedToast({
      isSucess: false,
      text: 'Algo deu errado, tente novamente.',
    })
    console.error(
      `Erro na hora de seguir ou deixar de seguir usuário. Erro: ${error}`,
    )
  }
}

export async function SignOutAction() {
  try {
    await signOut(auth)
    location.replace('/')
  } catch (error) {
    console.error(`Erro ao deslogar usuário. Erro: ${error}`)
  }
}

export async function DeleteAccountAction() {
  const user = auth.currentUser

  if (user) {
    try {
      const userDocRef = doc(db, 'users', user.uid)

      const postsQuery = query(
        collection(db, 'posts'),
        where('userRef', '==', userDocRef),
      )
      const querySnapshot = await getDocs(postsQuery)

      for (const postDoc of querySnapshot.docs) {
        await deleteDoc(doc(db, 'posts', postDoc.id))
      }

      await deleteDoc(doc(db, '/users', user.uid))

      await deleteUser(user)
      location.replace('/')
    } catch (error) {
      console.error(`Erro ao excluir conta. Erro: ${error}`)

      if (error instanceof FirebaseError) {
        console.error(`Erro ao deletar conta: ${error}`)

        if (error.code === 'auth/requires-recent-login') {
          CustomizedToast({
            isSucess: false,
            text: 'Você precisa fazer login novamente para deletar esta conta.',
            hasNavigateBtn: true,
          })
        }
      } else {
        console.error(`Erro desconhecido: ${error}`)
      }
    }
  } else {
    CustomizedToast({ isSucess: false, text: 'Nenhum usuário autenticado' })
  }
}

interface UpdateUserPhotoProps {
  user: userType | undefined
  userPhoto: string
}

export async function UpdateUserPhoto({
  user,
  userPhoto,
}: UpdateUserPhotoProps) {
  if (user) {
    await updateDoc(doc(db, '/users', user.uid), { userPhoto })
  }
}

interface UpdateUserCoverProps {
  user: userType | undefined
  userCoverPhoto: string
}

export async function UpdateUserCoverPhoto({
  user,
  userCoverPhoto,
}: UpdateUserCoverProps) {
  if (user) {
    await updateDoc(doc(db, '/users', user.uid), { userCoverPhoto })
  }
}
