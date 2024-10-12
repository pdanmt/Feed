import { useForm } from 'react-hook-form'
import styles from './SignInOrSignUp.module.css'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { login } from '../../services/acess/userAcess'
import { useNavigate } from 'react-router-dom'
import { FirebaseError } from 'firebase/app'
import { CustomizedToast } from '../../components/Toast/customizedToast'

export function SignIn() {
  const navigate = useNavigate()

  const signInSchema = z.object({
    email: z.string(),
    password: z.string(),
  })

  type signInDataType = z.infer<typeof signInSchema>

  const { handleSubmit, register, reset } = useForm<signInDataType>({
    resolver: zodResolver(signInSchema),
  })

  function handleLogin({ email, password }: signInDataType) {
    login({ email, password })
      .then(() => {
        reset()
        CustomizedToast({
          isSucess: true,
          text: 'Login realizado com sucesso!',
        })
        navigate('/', { replace: true })
      })
      .catch((error) => {
        if (error instanceof FirebaseError) {
          switch (error.code) {
            case 'auth/user-not-found':
              CustomizedToast({
                isSucess: false,
                text: 'Nenhum usuário encontrado com esse email.',
              })
              break
            case 'auth/invalid-credential':
              CustomizedToast({
                isSucess: false,
                text: 'Email e/ou senha incorreto(s). Tente novamente.',
              })
              break
            case 'auth/too-many-requests':
              CustomizedToast({
                isSucess: false,
                text: 'Muitas tentativas falhas. Tente novamente mais tarde.',
              })
              break
            case 'auth/network-request-failed':
              CustomizedToast({
                isSucess: false,
                text: 'Falha na rede. Verifique sua conexão e tente novamente.',
              })
              break
            default:
              CustomizedToast({
                isSucess: false,
                text: 'Algo deu errado. Tente novamente.',
              })
              console.error(`Erro Firebase: ${error.message}`)
          }
        } else {
          console.error(`Algo inesperado aconteceu. Erro: ${error}`)
        }
      })
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(handleLogin)}>
      <p>Entre na sua conta para acessar o feed!</p>
      <input
        type="email"
        required
        placeholder="Digite seu e-mail"
        {...register('email')}
      />
      <input
        type="password"
        required
        placeholder="Digite sua senha"
        {...register('password')}
      />
      <button>Entrar</button>
    </form>
  )
}
