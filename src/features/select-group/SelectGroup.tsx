import { useGroup } from '@/entities';
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

export function SelectGroup({
  // isOpen,
  onOpen,
}: {
  isOpen: boolean;
  onOpen: () => void;
}) {
  const { favouriteGroups, currentGroup, setCurrentGroup } = useGroup();
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
        {currentGroup ? currentGroup.group_name : 'Группа'}
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
          {favouriteGroups.map((group) => (
            <MenuItemOption
              key={group.id}
              value={group.id}
              bg={'blue.500'}
              onClick={() => setCurrentGroup(group)}
            >
              {group.group_name}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
}
