import { Box, Button, Input } from '@chakra-ui/react'
import { useState } from 'react'
import ImageResizer from 'react-image-file-resizer'

export function ImageTest() {
  const [image, setImage] = useState(null)
  const [url, setUrl] = useState('')

  async function updateImageToCloud(img) {
    const data = new FormData()
    data.append('file', img)
    data.append('upload_preset', 'preset')

    try {
      await fetch('https://api.cloudinary.com/v1_1/dwr1gebkh/image/upload', {
        method: 'POST',
        body: data,
      })
        .then(async (res) => await res.json())
        .then((data) => setUrl(data.url))
    } catch (error) {}
  }

  const resize = (img) =>
    new Promise((resolve) => {
      ImageResizer.imageFileResizer(
        img[0],
        300,
        300,
        'JPEG',
        100,
        0,
        (uri) => {
          resolve(uri)
        },
        'base64',
      )
    }).then((img) => updateImageToCloud(img))

  async function resizeImages() {
    if (image) {
      try {
        await resize(image)
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <Box>
      <Input type="file" required onChange={(e) => setImage(e.target.files)} />
      <Button onClick={() => resizeImages()}>Enviar</Button>
      <img src={url} alt="null" />
    </Box>
  )
}
