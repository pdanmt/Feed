import { toast } from 'sonner'

interface CustomizedToastProps {
  isSucess: boolean
  text: string
}

export function CustomizedToast({ isSucess, text }: CustomizedToastProps) {
  if (isSucess) {
    toast.success(text, {
      style: {
        padding: '1rem 0.5rem',
      },
    })
  } else {
    toast.error(text, {
      style: {
        padding: '1rem 0.5rem',
      },
    })
  }
}
