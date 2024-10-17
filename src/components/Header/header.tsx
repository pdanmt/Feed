import { Menu as MenuIcon, Sun, UserRoundX } from 'lucide-react'
import logoHeader from '../../../public/logo_feed.png'
import {
  Box,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuList,
  Text,
} from '@chakra-ui/react'
import { Link, useLocation } from 'react-router-dom'
import { SignOut } from 'phosphor-react'
import { MenuHeaderItem } from './menuItem'
import {
  DeleteAccountAction,
  SignOutAction,
} from '../../services/actions/actions'

export function Header() {
  const location = useLocation()

  return (
    <Box
      as="header"
      height="9vh"
      bg="var(--gray-6)"
      display="flex"
      justifyContent="space-around"
      alignItems="center"
      gap="0.75rem"
    >
      <Image
        alt=""
        src={logoHeader}
        w={{ base: '50px', md: '60px', lg: '70px' }}
      />
      <Box display="flex" alignItems="center" gap="2rem" fontSize="1.1rem">
        <Text
          as={Link}
          to="/"
          _focus={{ outline: 'none' }}
          style={{
            color:
              location.pathname === '/' ? 'var(--default)' : 'var(--gray-2)',
          }}
        >
          Feed
        </Text>
        <Text
          as={Link}
          to="/following"
          _focus={{ outline: 'none' }}
          style={{
            color:
              location.pathname === '/following'
                ? 'var(--default)'
                : 'var(--gray-2)',
          }}
        >
          Seguindo
        </Text>
      </Box>
      <Menu placement="bottom-end">
        <MenuButton>
          <Icon as={MenuIcon} fontSize={22} cursor="pointer" />
        </MenuButton>
        <MenuList
          bg="var(--gray-6)"
          border="1px solid var(--gray-2)"
          p="0.5rem"
        >
          <MenuHeaderItem color="var(--gray-1)">
            Mudar tema <Icon as={Sun} fontSize={22} />
          </MenuHeaderItem>
          <MenuDivider />
          <MenuHeaderItem color="var(--red)" onClick={() => SignOutAction()}>
            Sair da conta <Icon as={SignOut} fontSize={22} />
          </MenuHeaderItem>
          <MenuDivider />
          <MenuHeaderItem
            color="var(--red-2)"
            onClick={() => DeleteAccountAction()}
          >
            Excluir conta <Icon as={UserRoundX} fontSize={22} />
          </MenuHeaderItem>
        </MenuList>
      </Menu>
    </Box>
  )
}
