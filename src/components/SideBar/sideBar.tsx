import styles from './SideBar.module.css'
import { useContext } from 'react'
import { UserContext } from '../../contexts/userContext'
import { UpdateProfileModal } from '../UpdateProfileModal/updateProfileModal'
import { ChoiceUserPhotoModal } from '../ChoiceUserPhotoModal/choiceUserPhotoModal'

export function SideBar() {
  const { user, userPhoto } = useContext(UserContext)

  return (
    <aside className={styles.sideBar}>
      <img src={userPhoto} alt="" className={styles.cover} />
      <div className={styles.userImg}>
        <ChoiceUserPhotoModal />
      </div>

      <div className={styles.profile}>
        <p className={styles.name}>{user.userName}</p>
        <p className={styles.bio}>{user.role}</p>
      </div>

      <footer>
        <UpdateProfileModal />
      </footer>
    </aside>
  )
}
