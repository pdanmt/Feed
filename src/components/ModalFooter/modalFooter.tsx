import { Button, ModalFooter } from '@chakra-ui/react'

interface ModalFooterProps {
  onClose: () => void
  closeBtnText: string
  saveBtnText: string
}

export function ModalFooterComponent({
  onClose,
  closeBtnText,
  saveBtnText,
}: ModalFooterProps) {
  return (
    <ModalFooter display="flex" gap="1rem" justifyContent="right">
      <Button
        bg="var(--red)"
        color="var(--white)"
        _hover={{ transition: '0.2s', filter: 'brightness(0.8)' }}
        onClick={onClose}
        type="button"
      >
        {closeBtnText}
      </Button>
      <Button
        bg="var(--green)"
        color="var(--white)"
        _hover={{ transition: '0.2s', filter: 'brightness(1.2)' }}
        type="submit"
      >
        {saveBtnText}
      </Button>
    </ModalFooter>
  )
}
