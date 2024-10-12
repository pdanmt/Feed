import { Textarea } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'

interface UpdateProfileTextAreaProps {
  defaultValue: string
  registerName: string
}

export function UpdateProfileTextArea({
  defaultValue,
  registerName,
}: UpdateProfileTextAreaProps) {
  const { register } = useFormContext()

  return (
    <Textarea
      resize="none"
      variant="unstyled"
      border="1px solid var(--gray-3)"
      padding="0.5rem"
      fontSize="1.1rem"
      defaultValue={defaultValue}
      {...register(registerName)}
    />
  )
}
