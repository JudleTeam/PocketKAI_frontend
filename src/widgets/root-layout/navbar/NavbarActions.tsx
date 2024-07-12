import { NAVBAR_ACTIONS } from '@/shared/constants';
import { Box, VStack } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import styles from './NavbarActions.module.scss';
export function NavbarActions() {
  const location = useLocation();
  const isCurrentOpened = (action: any) => {
    return location.pathname === action.path;
  };
  return (
    <>
      {NAVBAR_ACTIONS.map((action) => {
        const Icon = action.icon;
        return (
          <Link to={action.path} key={action.label} style={{ height: '100%' }}>
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
          </Link>
        );
      })}
    </>
  );
}
