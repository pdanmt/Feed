import { toast } from 'sonner'

interface CustomizedToastProps {
  isSucess: boolean
  text: string
  hasNavigateBtn?: boolean
}

export function CustomizedToast({
  isSucess,
  text,
  hasNavigateBtn,
}: CustomizedToastProps) {
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
      action: hasNavigateBtn
        ? {
            label: 'Entrar',
            onClick() {
              location.replace('/sign-in')
            },
          }
        : undefined,
    })
  }
}
