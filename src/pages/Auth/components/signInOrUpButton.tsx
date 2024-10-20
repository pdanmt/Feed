import { Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

interface SignInOrUpButtonProps {
  text: string
  to: string
}

export function SignInOrUpButton({ text, to }: SignInOrUpButtonProps) {
  const navigate = useNavigate()

  return (
    <Button
      position="absolute"
      top="1rem"
      right="1rem"
      variant="unstyled"
      border="1px solid var(--green)"
      p="0 1rem"
      color="var(--gray-2)"
      _hover={{ bg: 'var(--green)', color: 'var(--default)' }}
      onClick={() => navigate(to)}
    >
      {text}
    </Button>
  )
}
