import React from 'react';
import {
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  useChakra,
  Divider,
} from '@chakra-ui/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './NavbarActions.module.scss';
import { ArrowIcon } from '@/shared/assets/chakraIcons/ArrowIcon';
import { isCurrentLocation } from '../lib/isCurrentLocation';
import { useSettings } from '@/entities';
import { getNavbarActions, NavbarAction } from '@/shared/constants';
import { useEffect, useState } from 'react';

const menuItems = {
  full: [
    { label: 'Таймлайн', path: '/schedule' },
    { label: 'Расписание экзаменов', path: '/schedule/exams' },
  ],
  exams: [
    { label: 'Таймлайн', path: '/schedule' },
    { label: 'Полное расписание', path: '/schedule/full' },
  ],
  default: [
    { label: 'Полное расписание', path: '/schedule/full' },
    { label: 'Расписание экзаменов', path: '/schedule/exams' },
  ],
};

export function NavbarActions() {
  const { preferencedScheduleView } = useSettings();
  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = useChakra();
  const mainElement = useColorModeValue(
    theme.colors.light.main_element,
    theme.colors.dark.main_element
  );

  const [navbarActions, setNavbarActions] = useState<NavbarAction[]>([]);

  useEffect(() => {
    setNavbarActions(getNavbarActions(preferencedScheduleView));
  }, [preferencedScheduleView]);

  const isSchedulePage = [
    '/schedule/full',
    '/schedule/exams',
    '/schedule',
  ].includes(location.pathname);

  const handleNavigation = (action: NavbarAction) => {
    if (action.label === 'Расписание' && isSchedulePage) return;
    navigate(action.path);
  };

  const getMenuItems = () => {
    if (location.pathname === '/schedule/full') return menuItems.full;
    if (location.pathname === '/schedule/exams') return menuItems.exams;
    return menuItems.default;
  };

  return (
    <>
      {navbarActions.map((action) => {
        const Icon = action.icon;
        const isCurrent = isCurrentLocation(action);
        const menuItemsToShow =
          action.label === 'Расписание' && isSchedulePage ? getMenuItems() : [];

        return (
          <Box
            key={action.label}
            onClick={() => handleNavigation(action)}
            style={{ height: '100%' }}
          >
            {menuItemsToShow.length > 0 ? (
              <Menu isLazy>
                <MenuButton>
                  <Box
                    display={'flex'}
                    flexDir={{ base: 'column', md: 'row' }}
                    alignItems={'center'}
                    gap={0.5}
                    justifyContent={'space-between'}
                    className={styles['stack']}
                  >
                    <Box className={styles['icons']}>
                      <Icon
                        color={
                          isCurrent || isSchedulePage ? mainElement : '#fff'
                        }
                        className={`${styles['icon']} ${
                          (isCurrent || isSchedulePage) &&
                          styles['icon--active']
                        }`}
                      />
                      <ArrowIcon w={3} h={3} color="#fff" />
                    </Box>
                    <Box color="#fff">{action.label}</Box>
                  </Box>
                </MenuButton>
                <MenuList
                  display="flex"
                  flexDirection="column"
                  gap="10px"
                  w={'100%'}
                  h={'100%'}
                  bgColor={mainElement}
                  color="#fff"
                >
                  {menuItemsToShow.map((item, index) => (
                    <React.Fragment key={item.path}>
                      <MenuItem
                        as={Link}
                        to={item.path}
                        padding="5px 10px"
                        onClick={(e) => e.stopPropagation()}
                        bgColor={mainElement}
                      >
                        {item.label}
                      </MenuItem>
                      {index < menuItemsToShow.length - 1 && (
                        <Divider w={'90%'} alignSelf={'center'} />
                      )}
                    </React.Fragment>
                  ))}
                </MenuList>
              </Menu>
            ) : (
              <Box
                display={'flex'}
                flexDir={{ base: 'column', md: 'row' }}
                alignItems={'center'}
                gap={0.5}
                justifyContent={'space-between'}
                className={styles['stack']}
              >
                <Icon
                  color={isCurrent ? mainElement : '#fff'}
                  className={`${styles['icon']} ${
                    isCurrent && styles['icon--active']
                  }`}
                />
                <Box color="#fff">{action.label}</Box>
              </Box>
            )}
          </Box>
        );
      })}
    </>
  );
}
