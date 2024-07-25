import { HStack, useChakra, useColorModeValue } from '@chakra-ui/react';
import { ReactNode } from 'react';
import styles from './ui-navbar.module.scss';

export function UiNavbar({
  navbarActions,
}: {
  navbarActions: () => ReactNode;
}) {
  const { theme } = useChakra();
  const bgColor = useColorModeValue(
    theme.colors.light.main_element,
    theme.colors.dark.main_element
  );
  const boxShadow = useColorModeValue(
    theme.colors.light.main,
    theme.colors.dark.main
  );
  return (
    <HStack
      bgColor={bgColor}
      className={styles['navbar']}
      boxShadow={`0px 15px 20px 30px ${boxShadow}`}
      justifyContent={'space-around'}
    >
      {navbarActions()}
    </HStack>
  );
}
