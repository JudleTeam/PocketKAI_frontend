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
      alignSelf={{ base: '', md: 'center' }}
      bgColor={mainColor}
      w={{ base: '100%', md: '60%' }}
      boxShadow={`0px 5px 5px 5px ${mainColor}`}
      className={styles['datebar']}
      justifyContent={'space-around'}
      display={isNotDatebar ? 'none' : 'flex'}
    >
      {datebarContent}
    </HStack>
  );
}
