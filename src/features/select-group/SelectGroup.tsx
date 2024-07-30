import { useGroup, useSchedule } from '@/entities';
import { GroupShort } from '@/shared';
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
  const mainElementColor = useColorModeValue(
    'light.main_element',
    'dark.main_element'
  );
  const { favouriteGroups, currentGroup, setCurrentGroup,getLessonsGroupById} = useGroup();
  const { resetScheduleState } = useSchedule();
  const handleGroupClick = (group: GroupShort) => {
    setCurrentGroup(group);
    getLessonsGroupById(group.id)
    resetScheduleState();
  };
  return (
    <Menu>
      <MenuButton
        w={'50%'}
        as={Button}
        transition="all 0.2s"
        rightIcon={<ChevronDownIcon />}
        bg={mainElementColor}
        color={'#ffffff'}
        _hover={{ bg: mainElementColor, boxShadow: 'outline' }}
        _focus={{ bg: mainElementColor }}
        fontWeight={'500'}
        fontSize={'16px'}
      >
        {currentGroup ? `Гр. ${currentGroup.group_name}` : 'Группа'}
      </MenuButton>
      <MenuList color={'#ffffff'} bg={mainElementColor} zIndex={2}>
        <MenuItem
          onClick={onOpen}
          color={'#ffffff'}
          bg={mainElementColor}
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
          bg={mainElementColor}
          fontWeight={'500'}
          fontSize={'16px'}
          defaultValue={currentGroup?.id}
        >
          {favouriteGroups.map((group) => (
            <MenuItemOption
              key={group.id}
              value={group.id}
              bg={mainElementColor}
              onClick={() => handleGroupClick(group)}
            >
              {group.group_name}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
}
