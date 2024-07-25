import { HStack, useChakra, useColorModeValue } from '@chakra-ui/react';
import { ReactNode } from 'react';
import styles from './UiDatebar.module.scss';
export function UiDatebar({
  datebarContent,
  isNotDatebar,
}: {
  datebarContent: ReactNode;
  isNotDatebar: boolean;
}) {
  const { theme } = useChakra();
  const mainColor = useColorModeValue(
    theme.colors.light.main,
    theme.colors.dark.main
  );
  return (
    <HStack
      boxShadow={`0px 10px 10px 10px ${mainColor}`}
      className={styles['datebar']}
      justifyContent={'space-around'}
      display={isNotDatebar ? 'none' : 'flex'}
    >
      {datebarContent}
    </HStack>
  );
}
