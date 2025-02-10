import { useGroup, useSchedule, useUser } from '@/entities';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  GroupShort,
  useColor,
  useDisclosure,
  useMetaThemeColor,
} from '@/shared';
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
  Text,
} from '@chakra-ui/react';
import React, { useCallback, useEffect } from 'react';
import s from './SelectGroup.module.scss';
import { AddGroupToFavourite } from '@/features';

export function SelectGroup() {
  const { isOpen, setIsOpen, onClose } = useDisclosure();
  const { primaryColor, mainColor, accentColor, themeColor } = useColor();
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

  useMetaThemeColor(mainColor, isOpen, themeColor);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Menu placement="bottom-end">
        {() => (
          <>
            <MenuButton
              className={s.root__button}
              as={Button}
              color={mainColor}
              fontSize={'16px'}
              fontWeight={'regular'}
              paddingY="2px"
              paddingX="40px"
              borderRadius={24}
              rightIcon={<ChevronDownIcon />}
              data-tour="3"
              bg={accentColor}
              _hover={{ bg: accentColor, boxShadow: 'outline' }}
              _focus={{ bg: accentColor }}
            >
              {currentGroup ? `${currentGroup.group_name}` : 'Группа'}
            </MenuButton>
            <MenuList
              className={s.root__list}
              borderRadius={'24px'}
              zIndex={2}
              color={mainColor}
              bg={accentColor}
              _focus={{ bg: accentColor }}
              boxShadow="none"
            >
              <DialogTrigger asChild>
                <MenuItem
                  className={s.root__item}
                  bg={accentColor}
                  _focus={{ bg: accentColor }}
                  borderRadius="24px"
                  py={1}
                >
                  Новая группа
                </MenuItem>
              </DialogTrigger>
              {favouriteGroups.length > 0 && (
                <React.Fragment>
                  <MenuDivider backgroundColor={mainColor} />
                  <MenuOptionGroup
                    className={s.root__group}
                    color={mainColor}
                    title="Группа"
                    type="radio"
                    bg={accentColor}
                    value={currentGroup?.id}
                  >
                    {favouriteGroups.map((group) => (
                      <MenuItemOption
                        key={group.id}
                        value={group.id}
                        bg={accentColor}
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
            <DialogContent className="sbg-l-main dark:bg-d-main rounded-xl">
              <DialogHeader>
                <Text
                  color={primaryColor}
                  fontWeight={'semibold'}
                  fontSize={'large'}
                  textAlign={'start'}
                >
                  Выбор группы
                </Text>
              </DialogHeader>
              <AddGroupToFavourite onClose={onClose} />
            </DialogContent>
          </>
        )}
      </Menu>
    </Dialog>
  );
}
