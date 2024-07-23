import { NAVBAR_ACTIONS } from '@/shared/constants';
import {
  Box,
  Menu,
  VStack,
  MenuButton,
  MenuList,
  MenuItem,
  ComponentWithAs,
  IconProps,
} from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import styles from './NavbarActions.module.scss';
import { ArrowIcon } from '@/shared/assets/chakraIcons/ArrowIcon';
export function NavbarActions() {
  const location = useLocation();
  const isCurrentOpened = (action: {
    label: string;
    path: string;
    icon: ComponentWithAs<'svg', IconProps>;
  }) => {
    return location.pathname === action.path;
  };
  console.log(location.pathname)
  return (
    <>
      {NAVBAR_ACTIONS.map((action) => {
        const Icon = action.icon;
        return (
          <Link to={location.pathname === '/schedule/full' && action.path === '/schedule' ? location.pathname : action.path } key={action.label} style={{ height: '100%' }}>
            {action.label === 'Расписание' && isCurrentOpened(action) || action.label === 'Расписание' && location.pathname === '/schedule/full' ? (
              <Menu isLazy>
                <MenuList bgColor="blue.500" color="#fff">
                  {
                    location.pathname === '/schedule/full' && action.path === '/schedule' ? 
                    (<MenuItem as={Link} to='schedule' bgColor='blue.500'>Таймлайн</MenuItem>) :
                    (<MenuItem as={Link} to='schedule/full' bgColor="blue.500">Полное расписание</MenuItem>)
                  }
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
                          isCurrentOpened(action) && styles['icon--active'] 
                        } ${
                          location.pathname === '/schedule/full' && styles['icon--active']
                        }`

                      }
                        color={isCurrentOpened(action) || location.pathname === '/schedule/full' ? '#3182ce' : '#fff'}
                      />
                      <ArrowIcon color="#fff"></ArrowIcon>
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
                  color={isCurrentOpened(action) ? '#3182ce' : '#fff'}
                  className={` ${styles['icon']} ${
                    isCurrentOpened(action) && styles['icon--active']
                  } `}
                />
                <Box color="#fff" fontFamily="Montserrat">
                  {action.label}
                </Box>
              </VStack>
            )}
          </Link>
        );
      })}
    </>
  );
}
