import { MenuItem, MenuItemProps } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface MenuHeaderItemProps extends MenuItemProps {
  children: ReactNode
}

export function MenuHeaderItem({ children, ...props }: MenuHeaderItemProps) {
  return (
    <MenuItem
      bg="var(--gray-6)"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      border="2px solid transparent"
      borderRadius="6px"
      _hover={{ bg: 'var(--gray-5)', border: '2px solid var(--gray-3)' }}
      {...props}
    >
      {children}
    </MenuItem>
  )
}
