import { useGroup, useSchedule, useUser } from '@/entities';
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
import React,{ useEffect } from 'react';

export function SelectGroup({ onOpen }: { onOpen: () => void }) {
  const mainElementColor = useColorModeValue(
    'light.main_element',
    'dark.main_element'
  );
  const { userAuthStatus } = useUser();
  const {
    favouriteGroups,
    currentGroup,
    favouriteGroupsStatus,
    setCurrentGroup,
    getFavouriteGroups,
  } = useGroup();
  const { resetScheduleState } = useSchedule();
  const handleGroupClick = (group: GroupShort) => {
    setCurrentGroup(group);
    resetScheduleState();
  };
  useEffect(() => {
    if (userAuthStatus === 'success' && favouriteGroupsStatus === 'idle') {
      getFavouriteGroups();
    }
  }, [getFavouriteGroups, userAuthStatus, favouriteGroupsStatus]);
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
        {favouriteGroups.length > 0 && 
        <React.Fragment>
        <MenuDivider />
        <MenuOptionGroup
          title="Группа"
          type="radio"
          color={'#ffffff'}
          bg={mainElementColor}
          fontWeight={'500'}
          fontSize={'16px'}
          value={currentGroup?.id}
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
        </React.Fragment>}
      </MenuList>
    </Menu>
  );
}
