import { Button } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface ButtonComponentProps {
  children: ReactNode
}

export function ButtonComponent({ children }: ButtonComponentProps) {
  return (
    <Button
      w="50%"
      p="0.5rem 0"
      borderRadius="6px"
      border="none"
      bg="var(--green)"
      color="var(--default)"
      _hover={{
        cursor: 'pointer',
        transition: '0.2s',
        filter: 'brightness(1.3)',
      }}
      type="submit"
    >
      {children}
    </Button>
  )
}
