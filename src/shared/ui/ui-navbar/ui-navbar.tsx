import { HStack } from '@chakra-ui/react';
import { ReactNode } from 'react';
import styles from './ui-navbar.module.scss';
export function UiNavbar({
  navbarActions,
}: {
  navbarActions: () => ReactNode;
}) {
  return (
    <HStack className={styles['navbar']} justifyContent={'space-around'}>
      {navbarActions()}
    </HStack>
  );
}
