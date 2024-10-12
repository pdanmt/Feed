import styles from './Auth.module.css'
import logoImg from '../../images/logoHeader.png'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

export function AuthPage() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <div className={styles.authDiv}>
      <aside>
        <p className={styles.nameWithLogo}>
          Ignite Feed
          <img src={logoImg} alt="" />
        </p>
        <p>Pedro Daniel &copy; todos os direitos reservados</p>
      </aside>
      <section>
        {location.pathname === '/sign-in' ? (
          <button
            className={styles.authButton}
            onClick={() => navigate('/sign-up')}
          >
            Cadastro
          </button>
        ) : (
          <button
            className={styles.authButton}
            onClick={() => navigate('/sign-in')}
          >
            Login
          </button>
        )}
        <Outlet />
      </section>
    </div>
  )
}
