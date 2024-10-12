import styles from './Header.module.css'
import logoHeader from '../../images/logoHeader.png'

export function Header() {
  return (
    <header className={styles.header}>
      <img src={logoHeader} alt="feed logo" />
      <p>Ignite Feed</p>
    </header>
  )
}
