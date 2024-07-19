import { HStack } from '@chakra-ui/react';
import { ReactNode } from 'react';
import styles from './UiDatebar.module.scss';
export function UiDatebar({ datebarContent }: { datebarContent: ReactNode }) {
  return (
    <HStack className={styles['datebar']} justifyContent={'space-around'}>
      {datebarContent}
    </HStack>
  );
}
