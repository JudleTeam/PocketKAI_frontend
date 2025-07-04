import {
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Text,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import React, { useCallback, useEffect } from 'react';

import { useGroup, useSchedule, useUser, useYaMetrika } from '@/entities';
import {
  AnalyticsEvent, ClickSource,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  GroupShort,
  useColor,
  useDisclosure,
  useMetaThemeColor,
} from '@/shared';
import { AddGroupToFavourite } from '@/features';

import s from './SelectGroup.module.scss';

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
  const { sendEvent } = useYaMetrika();

  useEffect(() => {
    if (userAuthStatus === 'success' && favouriteGroupsStatus === 'idle') {
      getFavouriteGroups();
    }
  }, [getFavouriteGroups, userAuthStatus, favouriteGroupsStatus]);

  const handleGroupClick = useCallback(
    (group: GroupShort) => {
      setCurrentGroup(group);
      resetScheduleState();
      sendEvent(AnalyticsEvent.mainChangeGroup);
    },
    [resetScheduleState, setCurrentGroup],
  );

  useMetaThemeColor(mainColor, isOpen, themeColor);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Menu placement="bottom-end" onOpen={() => sendEvent(AnalyticsEvent.mainClickGroupPopover)}>
        {() => (
          <>
            <MenuButton
              className={s.root__button}
              as={Button}
              color={mainColor}
              fontSize={'16px'}
              fontWeight={'medium'}
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
              border={`1px solid ${accentColor}`}
              _focus={{ bg: accentColor }}
              boxShadow="none"
            >
              <DialogTrigger asChild>
                <MenuItem
                  className={s.root__item}
                  onClick={() => sendEvent(AnalyticsEvent.mainModalOpen, { click_source: ClickSource.groupPopover })}
                  bg={accentColor}
                  _focus={{ bg: accentColor }}
                  borderRadius="24px"
                  py={1}
                  fontWeight={'medium'}
                >
                  Новая группа
                </MenuItem>
              </DialogTrigger>
              {favouriteGroups.length > 0 && (
                <React.Fragment>
                  <MenuDivider h={'1px'} backgroundColor={mainColor} />
                  <MenuOptionGroup
                    className={s.root__group}
                    color={mainColor}
                    fontWeight={'medium'}
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
                        fontWeight={'medium'}
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
