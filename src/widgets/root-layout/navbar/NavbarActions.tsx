import { NAVBAR_ACTIONS } from '@/shared/constants';
import {
  Box,
  Menu,
  VStack,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './NavbarActions.module.scss';
import { ArrowIcon } from '@/shared/assets/chakraIcons/ArrowIcon';
import { isCurrentLocation } from '../lib/isCurrentLocation';

export function NavbarActions() {
  const location = useLocation();
  const isOnFullSchedulePath = location.pathname === '/schedule/full';
  const navigate = useNavigate();
  return (
    <>
      {NAVBAR_ACTIONS.map((action) => {
        const Icon = action.icon;
        return (
          <Box
            onClick={() => {
              navigate(
                isOnFullSchedulePath && action.path === '/schedule'
                  ? location.pathname
                  : action.path
              );
            }}
            key={action.label}
            style={{ height: '100%' }}
          >
            {(action.label === 'Расписание' && isCurrentLocation(action)) ||
            (action.label === 'Расписание' && isOnFullSchedulePath) ? (
              <Menu isLazy>
                <MenuList bgColor="blue.500" color="#fff">
                  {location.pathname === '/schedule/full' &&
                  action.path === '/schedule' ? (
                    <MenuItem
                      as={Link}
                      to="/schedule"
                      onClick={(e) => e.stopPropagation()}
                      bgColor="blue.500"
                      display={'inline'}
                    >
                      Таймлайн
                    </MenuItem>
                  ) : (
                    <MenuItem
                      as={Link}
                      to="/schedule/full"
                      onClick={(e) => e.stopPropagation()}
                      bgColor="blue.500"
                    >
                      Полное расписание
                    </MenuItem>
                  )}
                  <MenuItem bgColor="blue.500">Расписание экзаменов</MenuItem>
                </MenuList>
                <MenuButton>
                  <VStack
                    gap={0.5}
                    justifyContent={'space-between'}
                    className={styles['stack']}
                  >
                    <Box className={styles['icons']}>
                      <Icon
                        className={`${styles['icon']} ${
                          isCurrentLocation(action) && styles['icon--active']
                        } ${
                          location.pathname === '/schedule/full' &&
                          styles['icon--active']
                        }`}
                        color={
                          isCurrentLocation(action) ||
                          location.pathname === '/schedule/full'
                            ? '#3182ce'
                            : '#fff'
                        }
                      />
                      <ArrowIcon color="#fff" />
                    </Box>
                    <Box color="#fff" fontFamily="Montserrat">
                      {action.label}
                    </Box>
                  </VStack>
                </MenuButton>
              </Menu>
            ) : (
              <VStack
                gap={0.5}
                justifyContent={'space-between'}
                className={styles['stack']}
              >
                <Icon
                  color={isCurrentLocation(action) ? '#3182ce' : '#fff'}
                  className={` ${styles['icon']} ${
                    isCurrentLocation(action) && styles['icon--active']
                  } `}
                />
                <Box color="#fff" fontFamily="Montserrat">
                  {action.label}
                </Box>
              </VStack>
            )}
          </Box>
        );
      })}
    </>
  );
}
