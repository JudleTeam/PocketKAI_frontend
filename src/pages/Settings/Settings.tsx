import { AccountTabHeader } from '@/shared/lib';
import { Button, Text, Box, useChakra } from '@chakra-ui/react';
import { useColorMode, useColorModeValue } from '@chakra-ui/react';
import styles from './Settings.module.scss';
export function Settings() {
  const { toggleColorMode, colorMode } = useColorMode();
  const { theme } = useChakra();
  const mainTextColor = useColorModeValue('light.main_text', 'dark.main_text');
  const mainColor = useColorModeValue(
    theme.colors.light.main,
    theme.colors.dark.main
  );
  return (
    <Box className={styles['settings']}>
      <Box
        padding="20px 0 0 0"
        position={'sticky'}
        top={'0px'}
        bgColor={mainColor}
        zIndex={'1'}
        boxShadow={`0px 0px 10px 10px ${mainColor}`}
      >
        <AccountTabHeader color={mainTextColor}>Настройки</AccountTabHeader>
      </Box>
      <Text fontSize="18px" fontWeight="bold">
        Изменить тему приложения
      </Text>
      <Button onClick={toggleColorMode}>
        {colorMode === 'light' ? 'Тёмная' : 'Светлая'} тема
      </Button>
    </Box>
  );
}
