import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import { FirebaseError } from 'firebase/app'
import { CustomizedToast } from '../../components/Toast/customizedToast'
import { useContext } from 'react'
import { UserContext } from '../../contexts/userContext'
import { signUp } from '../../services/acess/userAcess'
import { SendUserPhoto } from '../../components/SendUserPhoto/sendUserPhoto'
import { InputComponent } from './components/inputComponent'
import { Box, Image, Text } from '@chakra-ui/react'
import { ButtonComponent } from './components/buttonComponent'
import { UserImage } from '../../components/userImage/userImg'
import { FollowButton } from '../UsersProfile/followButton'
import { UndefinedTextInItalics } from './components/undefinedText'
import { Image as ImagePhoto } from 'lucide-react'
import { SignInOrUpButton } from './components/signInOrUpButton'

export function SignUp() {
  const { userPhoto, userCoverPhoto } = useContext(UserContext)
  const navigate = useNavigate()

  const signUpSchema = z.object({
    userName: z.string().trim(),
    role: z.string().trim(),
    email: z.string(),
    password: z.string(),
    bio: z.string().trim(),
  })

  type signUpDataType = z.infer<typeof signUpSchema>

  const signUpFormProvider = useForm<signUpDataType>({
    resolver: zodResolver(signUpSchema),
  })

  const { handleSubmit, reset, watch } = signUpFormProvider

  const prevUserName = watch('userName')
  const prevUserRole = watch('role')
  const prevUserBio = watch('bio')

  function handleSignUp({
    email,
    password,
    role,
    userName,
    bio,
  }: signUpDataType) {
    signUp({
      email,
      password,
      role,
      userName,
      userPhoto,
      userCoverPhoto,
      bio,
      followedBy: [],
      following: [],
    })
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
    <Box
      display={{ sm: 'flex', md: 'flex', lg: 'grid' }}
      flexDir="column"
      gridTemplateColumns="50% 50%"
      gap="2rem"
      minH="100vh"
      p={{ sm: '0.5rem', md: '1rem', lg: '2rem' }}
      alignItems="center"
    >
      <Box
        w="100%"
        minH="40vh"
        bg="var(--gray-5)"
        borderRadius="8px"
        mt="4rem"
        boxShadow="0 0 30px var(--gray-4)"
      >
        <Box>
          {userCoverPhoto ? (
            <Image
              alt=""
              src={userCoverPhoto}
              width="100%"
              h="10rem"
              borderRadius="8px 8px 0 0"
              objectFit="cover"
            />
          ) : (
            <Box
              width="100%"
              h="10rem"
              border="1px solid var(--gray-3)"
              borderRadius="8px 8px 0 0"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              Sua foto de capa
            </Box>
          )}

          <Box
            display={{ sm: 'none', md: 'flex', lg: 'flex' }}
            alignItems="flex-start"
            justifyContent="space-between"
            p="2rem"
          >
            {/* large screen */}
            <Box display="flex" gap="1rem" maxW="70%">
              {userPhoto ? (
                <UserImage img={userPhoto} hasBorder />
              ) : (
                <Box
                  w="60px"
                  h="60px"
                  border="3px solid var(--gray-7)"
                  outline="2px solid var(--green)"
                  borderRadius="100%"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <ImagePhoto size={27} />
                </Box>
              )}

              <Box wordBreak="break-word">
                <Text
                  fontSize="1.2rem"
                  fontWeight="500"
                  color="var(--default)"
                  display="flex"
                  alignItems="center"
                  gap="0.5rem"
                >
                  {prevUserName || (
                    <UndefinedTextInItalics text="Seu nome de usuário" />
                  )}{' '}
                  -{' '}
                  {prevUserRole || (
                    <UndefinedTextInItalics text="Sua área de atuação" />
                  )}
                </Text>
                <Text>
                  {prevUserBio || <UndefinedTextInItalics text="Sua bio" />}
                </Text>
              </Box>
            </Box>
            <FollowButton />
          </Box>

          {/* small screen */}
          <Box
            display={{ sm: 'flex', md: 'none', lg: 'none' }}
            p="1rem"
            flexDir="column"
            gap="1rem"
          >
            <Box
              alignItems="center"
              justifyContent="space-between"
              display="flex"
            >
              {userPhoto ? (
                <UserImage img={userPhoto} hasBorder />
              ) : (
                <Box
                  w="60px"
                  h="60px"
                  border="3px solid var(--gray-7)"
                  outline="2px solid var(--green)"
                  borderRadius="100%"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <ImagePhoto size={27} />
                </Box>
              )}

              <FollowButton />
            </Box>
            <Box wordBreak="break-word">
              <Text
                fontSize="1.1rem"
                fontWeight="700"
                color="var(--default)"
                display="flex"
                alignItems="center"
                textAlign="center"
                gap="0.5rem"
              >
                {prevUserName || (
                  <UndefinedTextInItalics text="Seu nome de usuário" />
                )}{' '}
                -{' '}
                {prevUserRole || (
                  <UndefinedTextInItalics text="Sua área de atuação" />
                )}
              </Text>
              <Text>
                {prevUserBio || <UndefinedTextInItalics text="Sua bio" />}
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
      <SignInOrUpButton text="Entrar" to="/sign-in" />
      <FormProvider {...signUpFormProvider}>
        <Box
          as="form"
          onSubmit={handleSubmit(handleSignUp)}
          display="flex"
          flexDir="column"
          gap="1rem"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          maxW="400px"
          m="0 auto"
        >
          <Text fontSize="1.4rem" letterSpacing="-1px">
            Cadastre sua conta para acessar o feed!
          </Text>

          <InputComponent
            registerName="userName"
            placeholder="Crie seu nome de usuário"
            maxLength={20}
          />

          <InputComponent
            registerName="role"
            placeholder="Informe sua área de atuação"
            maxLength={20}
          />

          <InputComponent
            registerName="bio"
            placeholder="Escreva sua bio"
            maxLength={240}
          />

          <InputComponent
            registerName="email"
            type="email"
            placeholder="Digite seu e-mail"
            maxLength={240}
          />

          <InputComponent
            registerName="password"
            type="password"
            placeholder="Crie sua senha"
            maxLength={240}
          />

          <SendUserPhoto place="signUp" text="perfil" />
          <SendUserPhoto place="signUp" text="capa" />

          <ButtonComponent>Cadastrar</ButtonComponent>
        </Box>
      </FormProvider>
    </Box>
  )
}
