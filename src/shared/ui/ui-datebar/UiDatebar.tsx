import { HStack } from '@chakra-ui/react';
import { ReactNode } from 'react';
import styles from './UiDatebar.module.scss';
export function UiDatebar({
  datebarContent,
  isNotDatebar,
}: {
  datebarContent: ReactNode;
  isNotDatebar: boolean;
}) {
  return (
    <HStack
      className={styles['datebar']}
      justifyContent={'space-around'}
      display={isNotDatebar ? 'none' : 'flex'}
    >
      {datebarContent}
    </HStack>
  );
}
