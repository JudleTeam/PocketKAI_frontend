import { HStack } from '@chakra-ui/react';
import { ReactNode } from 'react';
import styles from './ui-navbar.module.scss';
export function UiNavbar({
  navbarActions,
}: {
  navbarActions: () => ReactNode;
}) {
  return (
    <HStack className={styles['navbar']} boxShadow={'0px 15px 20px 30px white'} justifyContent={'space-around'}>
      {navbarActions()}
    </HStack>
  );
}
