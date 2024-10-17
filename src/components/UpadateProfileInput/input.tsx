import { Input, InputProps } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'

interface UpdateProfileInputProps extends InputProps {
  defaultValue: string
  registerName: string
}

export function UpdateProfileInput({
  defaultValue,
  registerName,
  ...props
}: UpdateProfileInputProps) {
  const { register } = useFormContext()

  return (
    <Input
      variant="unstyled"
      border="1px solid var(--gray-3)"
      padding="0.5rem"
      fontSize="1.1rem"
      defaultValue={defaultValue}
      {...register(registerName)}
      type="text"
      maxLength={20}
      isRequired
      {...props}
    />
  )
}
