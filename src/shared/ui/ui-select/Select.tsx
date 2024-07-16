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
import { useEffect, useState } from 'react';
import { useGroup } from '@/entities/Group/model/group.store';

export function UiSelect({
  // isOpen,
  onOpen,
}: {
  isOpen: boolean;
  onOpen: () => void;
}) {
  const [favoriteGroups, setFavoriteGroups] = useState<string[]>([]);
  useEffect(() => {
    const storedGroups = localStorage.getItem('favoriteGroups');
    if (storedGroups) {
      setFavoriteGroups(JSON.parse(storedGroups));
    }
  }, [localStorage.getItem('favoriteGroups')]);
  const handleOptionChange = (value: string) => {
    localStorage.setItem('currentGroup', JSON.stringify(value))
  };
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
          {favoriteGroups.map(group => (
            <MenuItemOption key={group} value={group} bg={'blue.500'} onClick={() => handleOptionChange(group)} >
              {group}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
}
