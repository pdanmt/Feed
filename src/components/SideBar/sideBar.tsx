import styles from './SideBar.module.css'
import { useContext } from 'react'
import { UserContext } from '../../contexts/userContext'
import { UpdateProfileModal } from '../UpdateProfileModal/updateProfileModal'
import { SendUserPhoto } from '../SendUserPhoto/sendUserPhoto'

export function SideBar() {
  const { user } = useContext(UserContext)

  return (
    <aside className={styles.sideBar}>
      <div className={styles.cover}>
        <SendUserPhoto text="capa" place="sideBarCover" />
      </div>
      <div className={styles.userImg}>
        <SendUserPhoto place="sideBarUserPhoto" text="perfil" />
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
