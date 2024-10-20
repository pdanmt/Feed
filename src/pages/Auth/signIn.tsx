import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { login } from '../../services/acess/userAcess'
import { useNavigate } from 'react-router-dom'
import { FirebaseError } from 'firebase/app'
import { CustomizedToast } from '../../components/Toast/customizedToast'
import { Box, Image, Text } from '@chakra-ui/react'
import { InputComponent } from './components/inputComponent'
import { ButtonComponent } from './components/buttonComponent'
import logoImg from '../../../public/logo_feed.png'
import { SignInOrUpButton } from './components/signInOrUpButton'

export function SignIn() {
  const navigate = useNavigate()

  const signInSchema = z.object({
    email: z.string(),
    password: z.string(),
  })

  type signInDataType = z.infer<typeof signInSchema>

  const signInFormProvider = useForm<signInDataType>({
    resolver: zodResolver(signInSchema),
  })

  const { handleSubmit, reset } = signInFormProvider

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
    <Box
      display={{ sm: 'flex', md: 'grid', lg: 'grid' }}
      flexDir="column"
      alignItems={{ sm: 'center', md: 'unset', lg: 'unset' }}
      justifyContent="center"
      textAlign={{ sm: 'center', md: 'left', lg: 'left' }}
      gridTemplateColumns="50% 50%"
      minH="100vh"
    >
      <Box
        bg="var(--gray-7)"
        p={{ sm: '0.5rem 0.3rem', md: '1rem', lg: '2rem' }}
        display="flex"
        flexDir="column"
        justifyContent="space-between"
        fontSize="1.1rem"
        color="var(--gray-2)"
        position={{ sm: 'absolute', md: 'unset', lg: 'unset' }}
        bottom={{ sm: '0', md: 'unset', lg: 'unset' }}
        fontWeight="700"
        w="100%"
      >
        <Text
          display={{ sm: 'none', md: 'flex', lg: 'flex' }}
          alignItems="center"
        >
          Feed <Image src={logoImg} alt="" w="65px" />
        </Text>
        <Text>Pedro Daniel &copy; todos os direitos reservados</Text>
      </Box>
      <Box
        m="0 auto"
        display="flex"
        justifyContent="center"
        bg="var(--gray-6)"
        w="100%"
        minH="100vh"
      >
        <SignInOrUpButton text="Cadastrar" to="/sign-up" />
        <FormProvider {...signInFormProvider}>
          <Box
            as="form"
            onSubmit={handleSubmit(handleLogin)}
            display="flex"
            flexDir="column"
            gap="1rem"
            justifyContent="center"
            alignItems="center"
            maxW="400px"
          >
            <Text fontSize="1.4rem" letterSpacing="-1px">
              Entre na sua conta para acessar o feed!
            </Text>
            <InputComponent
              registerName="email"
              placeholder="Digite seu e-mail"
              type="email"
            />
            <InputComponent
              registerName="password"
              placeholder="Digite sua senha"
              type="password"
            />
            <ButtonComponent>Entrar</ButtonComponent>
          </Box>
        </FormProvider>
      </Box>
    </Box>
  )
}
