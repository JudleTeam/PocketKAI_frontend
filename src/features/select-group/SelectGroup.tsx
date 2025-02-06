import { useGroup, useSchedule, useUser } from '@/entities';
import { GroupShort, useColor } from '@/shared';
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
import React, { useCallback, useEffect } from 'react';
import s from './SelectGroup.module.scss';

export function SelectGroup({ onOpen }: { onOpen: () => void }) {
  const { mainElementColor } = useColor();
  const { userAuthStatus } = useUser();
  const {
    favouriteGroups,
    currentGroup,
    favouriteGroupsStatus,
    setCurrentGroup,
    getFavouriteGroups,
  } = useGroup();
  const { resetScheduleState } = useSchedule();

  useEffect(() => {
    if (userAuthStatus === 'success' && favouriteGroupsStatus === 'idle') {
      getFavouriteGroups();
    }
  }, [getFavouriteGroups, userAuthStatus, favouriteGroupsStatus]);

  const handleGroupClick = useCallback(
    (group: GroupShort) => {
      setCurrentGroup(group);
      resetScheduleState();
    },
    [resetScheduleState, setCurrentGroup]
  );

  return (
    <Menu placement="bottom-end">
      {() => (
        <>
          <MenuButton
            className={s.root__button}
            as={Button}
            color={'white'}
            fontSize={'16px'}
            fontWeight={'regular'}
            paddingY="5px"
            paddingX="40px"
            borderRadius={24}
            rightIcon={<ChevronDownIcon />}
            data-tour="3"
            bg={mainElementColor}
            _hover={{ bg: mainElementColor, boxShadow: 'outline' }}
            _focus={{ bg: mainElementColor }}
          >
            {currentGroup ? `${currentGroup.group_name}` : 'Группа'}
          </MenuButton>
          <MenuList
            className={s.root__list}
            borderRadius={'24px'}
            zIndex={2}
            color="white"
            bg={mainElementColor}
          >
            <MenuItem
              className={s.root__item}
              onClick={onOpen}
              bg={mainElementColor}
              borderRadius="24px"
            >
              Новая группа
            </MenuItem>
            {favouriteGroups.length > 0 && (
              <React.Fragment>
                <MenuDivider />
                <MenuOptionGroup
                  className={s.root__group}
                  title="Группа"
                  type="radio"
                  bg={mainElementColor}
                  value={currentGroup?.id}
                >
                  {favouriteGroups.map((group) => (
                    <MenuItemOption
                      key={group.id}
                      value={group.id}
                      bg={mainElementColor}
                      borderRadius="24px"
                      onClick={() => handleGroupClick(group)}
                    >
                      {group.group_name}
                    </MenuItemOption>
                  ))}
                </MenuOptionGroup>
              </React.Fragment>
            )}
          </MenuList>
        </>
      )}
    </Menu>
  );
}
