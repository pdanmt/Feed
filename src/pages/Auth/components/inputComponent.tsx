import { Input, InputProps } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'

interface InputComponentProps extends InputProps {
  registerName: string
}

export function InputComponent({
  registerName,
  ...props
}: InputComponentProps) {
  const { register } = useFormContext()

  return (
    <Input
      {...props}
      bg="transparent"
      border="1px solid var(--gray-3)"
      borderRadius="6px"
      w="90%"
      p="0.5rem 0.3rem"
      color="var(--gray-1)"
      _placeholder={{ color: 'var(--gray-3)' }}
      required
      {...register(registerName)}
    />
  )
}
