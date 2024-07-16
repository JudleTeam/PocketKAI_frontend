import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuOptionGroup,
  MenuDivider,
  Button,
} from '@chakra-ui/react';

export function UiSelect({
  // isOpen,
  onOpen,
}: {
  isOpen: boolean;
  onOpen: () => void;
}) {
  return (
    <Menu>
      <MenuButton
        w={'50%'}
        as={Button}
        className={''}
        transition="all 0.2s"
        rightIcon={<ChevronDownIcon />}
        bg={'#3182CE'}
        color={'#ffffff'}
        _hover={{ bg: '#3182CE', boxShadow: 'outline' }}
        _focus={{ bg: '#3182CE' }}
        fontFamily={'Montserrat'}
        fontWeight={'500'}
        fontSize={'16px'}
      >
        Группа
      </MenuButton>
      <MenuList color={'#ffffff'} bg={'#3182CE'} fontFamily={'Montserrat'}>
        <MenuItem
          onClick={onOpen}
          color={'#ffffff'}
          bg={'#3182CE'}
          fontWeight={'400'}
          fontSize={'16px'}
          justifyContent={'center'}
        >
          Добавить группу
        </MenuItem>
        <MenuDivider></MenuDivider>
        <MenuOptionGroup
          title="Группа"
          type="radio"
          color={'#ffffff'}
          bg={'#3182CE'}
          fontWeight={'500'}
          fontSize={'16px'}
        >
          <MenuItemOption value="1" bg={'#3182CE'}>
            6210
          </MenuItemOption>
          <MenuItemOption value="2" bg={'#3182CE'}>
            6211
          </MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
}
