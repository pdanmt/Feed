import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from 'firebase/firestore'
import { commentsBody, postsBody, userType } from '../../contexts/userContext'
import { auth, db } from '../../firebase-config'
import { produce } from 'immer'

export function GetUser(
  setUser: React.Dispatch<React.SetStateAction<userType>>,
  setUserPhoto: React.Dispatch<React.SetStateAction<string>>,
) {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      getDoc(doc(db, '/users', user.uid)).then((doc) => {
        const { role, userName, userPhoto } = doc.data() as userType
        if (user.email) {
          setUser({
            email: user.email,
            role,
            uid: user.uid,
            userName,
            userPhoto,
          })
          setUserPhoto(userPhoto)
        }
      })
    } else {
      if (window.location.pathname !== '/sign-in') {
        window.location.replace('/sign-in')
      }
    }
  })

  return () => unsubscribe()
}

interface loginProps {
  email: string
  password: string
}

export async function login({ email, password }: loginProps) {
  await setPersistence(auth, browserLocalPersistence)

  await signInWithEmailAndPassword(auth, email, password)
}

interface signUpProps {
  email: string
  password: string
  userName: string
  role: string
  userPhoto: string
}

export async function signUp({
  email,
  password,
  role,
  userName,
  userPhoto,
}: signUpProps) {
  const { user } = await createUserWithEmailAndPassword(auth, email, password)

  setDoc(doc(db, 'users', user.uid), { role, userName, userPhoto })
}

export async function GetPosts(
  setPosts: React.Dispatch<React.SetStateAction<postsBody[]>>,
) {
  const postsQuery = query(collection(db, 'posts'), orderBy('timestamp'))

  onSnapshot(postsQuery, (snapshot) => {
    snapshot.forEach(async (doc) => {
      const userRef = doc.data().userRef as DocumentReference<DocumentData>
      const poster = await getDoc(userRef)

      const { createdAt, contentPost, timestamp } = doc.data()
      const { role, userName, userPhoto } = poster.data() as userType

      setPosts((prev) => {
        if (prev.find(({ idOfPost }) => idOfPost === doc.id)) {
          return prev
        } else {
          return [
            ...prev,
            {
              contentPost,
              createdAt,
              idOfPost: doc.id,
              role,
              userName,
              userProfilePhoto: userPhoto,
              timestamp,
            },
          ]
        }
      })
    })
  })
}

interface addCommentProps {
  contentComment: string
  createdAt: string
  likedBy: string[]
  userRef: DocumentReference
  postId: string
  timestamp: Date
}

export async function AddComment({
  contentComment,
  createdAt,
  likedBy,
  userRef,
  postId,
  timestamp,
}: addCommentProps) {
  addDoc(collection(db, '/comments'), {
    contentComment,
    createdAt,
    likedBy,
    userRef,
    postId,
    timestamp,
  })
}

export async function GetComments(
  setComments: React.Dispatch<React.SetStateAction<commentsBody[]>>,
) {
  const commentsQuery = query(collection(db, 'comments'), orderBy('timestamp'))

  onSnapshot(commentsQuery, (snapshot) => {
    snapshot.docChanges().forEach(async (change) => {
      const userRef = change.doc.data()
        .userRef as DocumentReference<DocumentData>
      const poster = await getDoc(userRef)

      const { createdAt, contentComment, likedBy, postId, timestamp } =
        change.doc.data() as commentsBody
      const { userName, userPhoto } = poster.data() as userType

      if (change.type === 'added') {
        setComments((prev) => {
          if (prev.find(({ id }) => id === change.doc.id)) {
            return prev
          } else {
            return [
              ...prev,
              {
                contentComment,
                createdAt,
                id: change.doc.id,
                userName,
                likedBy,
                postId,
                userPhoto,
                timestamp,
              },
            ]
          }
        })
      } else if (change.type === 'removed') {
        setComments((prev) => prev.filter(({ id }) => id !== change.doc.id))
      } else if (change.type === 'modified') {
        setComments((prev) => {
          const indexToChange = prev.findIndex(({ id }) => id === change.doc.id)

          if (prev.find(({ id }) => id === change.doc.id)) {
            return produce(prev, (draft) => {
              draft[indexToChange].likedBy = likedBy
            })
          } else {
            return prev
          }
        })
      }
    })
  })
}

export async function DeleteComment(id: string) {
  deleteDoc(doc(db, '/comments', id))
}
