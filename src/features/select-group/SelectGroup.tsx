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
  useColorModeValue,
} from '@chakra-ui/react';

export function SelectGroup({
  onOpen,
}: {
  isOpen: boolean;
  onOpen: () => void;
}) {
  const main_element = useColorModeValue('light.main_element', 'dark.main_element')
  const { favouriteGroups, currentGroup, setCurrentGroup } = useGroup();
  return (
    <Menu>
      <MenuButton
        w={'50%'}
        as={Button}
        transition="all 0.2s"
        rightIcon={<ChevronDownIcon />}
        bg={main_element}
        color={'#ffffff'}
        _hover={{ bg: main_element, boxShadow: 'outline' }}
        _focus={{ bg: main_element }}
        fontWeight={'500'}
        fontSize={'16px'}
      >
        {currentGroup ? `Гр. ${currentGroup.group_name}` : 'Группа'}
      </MenuButton>
      <MenuList color={'#ffffff'} bg={main_element} zIndex={2}>
        <MenuItem
          onClick={onOpen}
          color={'#ffffff'} 
          bg={main_element}
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
          bg={main_element}
          fontWeight={'500'}
          fontSize={'16px'}
          defaultValue={currentGroup?.id}
        >
          {favouriteGroups.map((group) => (
            <MenuItemOption
              key={group.id}
              value={group.id}
              bg={main_element}
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
