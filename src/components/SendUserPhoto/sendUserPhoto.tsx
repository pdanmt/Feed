import { Box, Input } from '@chakra-ui/react'
import { useContext } from 'react'
import Resize from 'react-image-file-resizer'
import { UserContext } from '../../contexts/userContext'
import { CustomizedToast } from '../Toast/customizedToast'
import { Image as ImagePhoto } from 'lucide-react'
import { UserImage } from '../userImage/userImg'
import {
  UpdateUserCoverPhoto,
  UpdateUserPhoto,
} from '../../services/actions/actions'

interface sendUserPhotoProps {
  text: 'perfil' | 'capa'
  place: 'sideBarUserPhoto' | 'sideBarCover' | 'signUp'
}

export function SendUserPhoto({ text, place }: sendUserPhotoProps) {
  const { setUserPhoto, setUserCoverPhoto, user, setUser } =
    useContext(UserContext)

  const resize = (fileImg: File): Promise<string | Blob> =>
    new Promise((resolve, reject) => {
      Resize.imageFileResizer(
        fileImg,
        text === 'perfil' ? 80 : 1000,
        text === 'perfil' ? 80 : 500,
        'JPG',
        720,
        0,
        (uri) => {
          if (typeof uri === 'string' || uri instanceof Blob) {
            resolve(uri)
          } else {
            reject(new Error('Formato de imagem inválido.'))
          }
        },
        'base64',
      )
    })

  function uploadResizedPhoto(fileImg: string | Blob) {
    const data = new FormData()

    data.append('file', fileImg)
    data.append('upload_preset', 'preset')

    const dat = fetch(
      'https://api.cloudinary.com/v1_1/dwr1gebkh/image/upload',
      {
        method: 'POST',
        body: data,
      },
    )

    const dados = dat.then(async (res) => await res.json())

    dados.then((data) => {
      if (text === 'perfil') {
        setUserPhoto(data.url)
        setUser((prev) => {
          return { ...prev, userPhoto: data.url }
        })
        UpdateUserPhoto({ user, userPhoto: data.url })
      } else {
        setUserCoverPhoto(data.url)
        setUser((prev) => {
          return { ...prev, userCoverPhoto: data.url }
        })
        UpdateUserCoverPhoto({ user, userCoverPhoto: data.url })
      }
    })
  }

  async function handleResizePhoto(dataImg: File) {
    try {
      const resizedImage = await resize(dataImg)
      uploadResizedPhoto(resizedImage)
    } catch (error) {
      CustomizedToast({
        isSucess: false,
        text: 'Algo deu errado. Tente novamente.',
      })
      console.error(`Algo deu errado ao fazer upload da foto. Erro: ${error}`)
    }
  }

  if (place === 'signUp') {
    return (
      <>
        <label
          htmlFor={text === 'perfil' ? 'profile' : 'cover'}
          style={{
            border: '1px solid var(--gray-3)',
            width: '90%',
            padding: '0.5rem 0.3rem',
            color: 'var(--gray-3)',
            borderRadius: '6px',
            fontWeight: '400',
            textAlign: 'left',
            display: 'flex',
            gap: '0.2rem',
          }}
        >
          <ImagePhoto />
          Escolha uma foto de {text}
        </label>
        <Input
          name={text === 'perfil' ? 'profile' : 'cover'}
          id={text === 'perfil' ? 'profile' : 'cover'}
          type="file"
          display="none"
          required
          onChange={(e) => {
            if (e.target.files) {
              handleResizePhoto(e.target.files[0])
            }
          }}
        />
      </>
    )
  } else if (place === 'sideBarUserPhoto' && user) {
    return (
      <>
        <Box as="label" htmlFor="profile" cursor="pointer">
          <UserImage hasBorder img={user.userPhoto} />
        </Box>
        <Input
          name="profile"
          id="profile"
          type="file"
          display="none"
          required
          onChange={(e) => {
            if (e.target.files) {
              handleResizePhoto(e.target.files[0])
            }
          }}
        />
      </>
    )
  } else {
    return (
      <>
        <Box as="label" htmlFor="cover" cursor="pointer">
          <img src={user.userCoverPhoto} alt="" />
        </Box>
        <Input
          name="cover"
          id="cover"
          type="file"
          display="none"
          required
          onChange={(e) => {
            if (e.target.files) {
              handleResizePhoto(e.target.files[0])
            }
          }}
        />
      </>
    )
  }
}
