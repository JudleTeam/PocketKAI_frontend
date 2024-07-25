import { NAVBAR_ACTIONS } from '@/shared/constants';
import {
  Box,
  Menu,
  VStack,
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

export function NavbarActions() {
  const location = useLocation();
  const isOnFullSchedulePath = location.pathname === '/schedule/full';
  const navigate = useNavigate();
  const { theme } = useChakra();
  const main_element = useColorModeValue(
    theme.colors.light.main_element,
    theme.colors.dark.main_element
  );
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
                <MenuList
                  display="flex"
                  flexDirection="column"
                  gap="10px"
                  w={'100%'}
                  h={'100%'}
                  bgColor={main_element}
                  color="#fff"
                >
                  {location.pathname === '/schedule/full' &&
                  action.path === '/schedule' ? (
                    <MenuItem
                      as={Link}
                      to="/schedule"
                      padding="5px 10px"
                      onClick={(e) => e.stopPropagation()}
                      bgColor={main_element}
                    >
                      Таймлайн
                    </MenuItem>
                  ) : (
                    <MenuItem
                      as={Link}
                      to="/schedule/full"
                      padding="5px 10px"
                      onClick={(e) => e.stopPropagation()}
                      bgColor={main_element}
                    >
                      Полное расписание
                    </MenuItem>
                  )}
                  <Divider w={'90%'} alignSelf={'center'}></Divider>
                  <MenuItem padding="5px 10px" bgColor={main_element}>
                    Расписание экзаменов
                  </MenuItem>
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
                            ? main_element
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
                  color={isCurrentLocation(action) ? main_element : '#fff'}
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
