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
  const isOnExamsPath = location.pathname === '/schedule/exams';
  const navigate = useNavigate();
  const { theme } = useChakra();
  const mainElement = useColorModeValue(
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
                (isOnFullSchedulePath && action.path === '/schedule') ||
                  (isOnExamsPath && action.path === '/schedule')
                  ? location.pathname
                  : action.path
              );
            }}
            key={action.label}
            style={{ height: '100%' }}
          >
            {(action.label === 'Расписание' && isCurrentLocation(action)) ||
            (action.label === 'Расписание' &&
              (isOnFullSchedulePath || isOnExamsPath)) ? (
              <Menu isLazy>
                <MenuList
                  display="flex"
                  flexDirection="column"
                  gap="10px"
                  w={'100%'}
                  h={'100%'}
                  bgColor={mainElement}
                  color="#fff"
                >
                  {location.pathname === '/schedule/full' &&
                  action.path === '/schedule' ? (
                    <>
                      <MenuItem
                        as={Link}
                        to="/schedule"
                        padding="5px 10px"
                        onClick={(e) => e.stopPropagation()}
                        bgColor={mainElement}
                      >
                        Таймлайн
                      </MenuItem>
                      <Divider w={'90%'} alignSelf={'center'}></Divider>
                      <MenuItem
                        as={Link}
                        to="/schedule/exams"
                        padding="5px 10px"
                        onClick={(e) => e.stopPropagation()}
                        bgColor={mainElement}
                      >
                        Расписание экзаменов
                      </MenuItem>
                    </>
                  ) : location.pathname === '/schedule/exams' &&
                    action.path === '/schedule' ? (
                    <>
                      <MenuItem
                        as={Link}
                        to="/schedule"
                        padding="5px 10px"
                        onClick={(e) => e.stopPropagation()}
                        bgColor={mainElement}
                      >
                        Таймлайн
                      </MenuItem>
                      <Divider w={'90%'} alignSelf={'center'}></Divider>
                      <MenuItem
                        as={Link}
                        to="/schedule/full"
                        padding="5px 10px"
                        onClick={(e) => e.stopPropagation()}
                        bgColor={mainElement}
                      >
                        Полное расписание
                      </MenuItem>
                    </>
                  ) : (
                    <>
                      <MenuItem
                        as={Link}
                        to="/schedule/full"
                        padding="5px 10px"
                        onClick={(e) => e.stopPropagation()}
                        bgColor={mainElement}
                      >
                        Полное расписание
                      </MenuItem>
                      <Divider w={'90%'} alignSelf={'center'}></Divider>
                      <MenuItem
                        as={Link}
                        to="/schedule/exams"
                        padding="5px 10px"
                        onClick={(e) => e.stopPropagation()}
                        bgColor={mainElement}
                      >
                        Расписание экзаменов
                      </MenuItem>
                    </>
                  )}
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
                          isOnFullSchedulePath &&
                          isOnExamsPath &&
                          styles['icon--active']
                        }`}
                        color={
                          isCurrentLocation(action) ||
                          isOnFullSchedulePath ||
                          isOnExamsPath
                            ? mainElement
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
                w='100px'
                h='100px'
                  color={isCurrentLocation(action) ? mainElement : '#fff'}
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
