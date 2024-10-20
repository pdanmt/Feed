import { Text } from '@chakra-ui/react'

interface UndefinedTextInItalicsProps {
  text: string
}

export function UndefinedTextInItalics({ text }: UndefinedTextInItalicsProps) {
  return (
    <Text as="span" fontStyle="italic">
      {text}
    </Text>
  )
}
