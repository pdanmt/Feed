import { useForm } from 'react-hook-form'
import styles from './SignInOrSignUp.module.css'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import { FirebaseError } from 'firebase/app'
import { CustomizedToast } from '../../components/Toast/customizedToast'
import { ChoiceUserPhotoModal } from '../../components/ChoiceUserPhotoModal/choiceUserPhotoModal'
import { useContext } from 'react'
import { UserContext } from '../../contexts/userContext'
import { signUp } from '../../services/acess/userAcess'

export function SignUp() {
  const { userPhoto } = useContext(UserContext)
  const navigate = useNavigate()

  const signUpSchema = z.object({
    userName: z.string(),
    role: z.string(),
    email: z.string(),
    password: z.string(),
  })

  type signUpDataType = z.infer<typeof signUpSchema>

  const { handleSubmit, register, reset } = useForm<signUpDataType>({
    resolver: zodResolver(signUpSchema),
  })

  function handleSignUp({ email, password, role, userName }: signUpDataType) {
    signUp({ email, password, role, userName, userPhoto })
      .then(() => {
        reset()
        navigate('/', { replace: true })
        CustomizedToast({
          isSucess: true,
          text: 'Cadastro realizado com sucesso!',
        })
      })
      .catch((error) => {
        if (error instanceof FirebaseError) {
          switch (error.code) {
            case 'auth/email-already-in-use':
              CustomizedToast({
                isSucess: false,
                text: 'Este email já está em uso. Tente outro.',
              })
              break
            case 'auth/invalid-email':
              CustomizedToast({
                isSucess: false,
                text: 'O email informado é inválido.',
              })
              break
            case 'auth/weak-password':
              CustomizedToast({
                isSucess: false,
                text: 'A senha deve ter no mínimo 6 caracteres.',
              })
              break
            default:
              CustomizedToast({
                isSucess: false,
                text: 'Algo deu errado, tente novamente.',
              })
              console.error(`Erro Firebase: ${error.message}`)
          }
        } else {
          console.error(`Algo inesperado aconteceu. Erro: ${error}`)
        }
      })
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(handleSignUp)}>
      <p>Cadastre sua conta para acessar o feed!</p>

      <ChoiceUserPhotoModal isInSignUp />

      <input
        type="text"
        required
        placeholder="Crie seu nome de usuário"
        {...register('userName')}
      />
      <input
        type="text"
        required
        placeholder="Informe sua área de atuação"
        {...register('role')}
      />
      <input
        type="email"
        required
        placeholder="Digite seu e-mail"
        {...register('email')}
      />
      <input
        type="password"
        required
        placeholder="Crie sua senha"
        {...register('password')}
      />

      <button>Cadastrar</button>
    </form>
  )
}
