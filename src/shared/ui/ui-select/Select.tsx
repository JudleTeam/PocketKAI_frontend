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
        transition="all 0.2s"
        rightIcon={<ChevronDownIcon />}
        bg={'blue.500'}
        color={'#ffffff'}
        _hover={{ bg: 'blue.500', boxShadow: 'outline' }}
        _focus={{ bg: 'blue.500' }}
        fontWeight={'500'}
        fontSize={'16px'}
      >
        Группа
      </MenuButton>
      <MenuList color={'#ffffff'} bg={'blue.500'}>
        <MenuItem
          onClick={onOpen}
          color={'#ffffff'}
          bg={'blue.500'}
          fontWeight={'400'}
          fontSize={'16px'}
          justifyContent={'center'}
        >
          Добавить группу
        </MenuItem>
        <MenuDivider />
        <MenuOptionGroup
          title="Группа"
          type="radio"
          color={'#ffffff'}
          bg={'blue.500'}
          fontWeight={'500'}
          fontSize={'16px'}
        >
          <MenuItemOption value="1" bg={'blue.500'}>
            6210
          </MenuItemOption>
          <MenuItemOption value="2" bg={'blue.500'}>
            6211
          </MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
}
