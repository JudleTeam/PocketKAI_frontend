import { HStack } from '@chakra-ui/react';
import { ReactNode } from 'react';
import styles from './UiDatebar.module.scss';
export function UiDatebar({
  datebarContent,
  isTeachers,
}: {
  datebarContent: ReactNode;
  isTeachers: boolean;
}) {
  return (
    <HStack
      className={styles['datebar']}
      justifyContent={'space-around'}
      display={isTeachers ? 'none' : 'flex'}
    >
      {datebarContent}
    </HStack>
  );
}
