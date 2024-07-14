import { HStack } from '@chakra-ui/react';
import { ReactNode } from 'react';
import styles from './Navbar.module.scss';
export function Navbar({ navbarActions }: { navbarActions: () => ReactNode }) {
  return (
    <HStack className={styles['navbar']} justifyContent={'space-around'}>
      {navbarActions()}
    </HStack>
  );
}
