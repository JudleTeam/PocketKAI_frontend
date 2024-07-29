import { Button, Text, Box } from '@chakra-ui/react';
import { useColorMode, useColorModeValue } from '@chakra-ui/react';
export function Settings() {
  const { toggleColorMode, colorMode } = useColorMode();
  const main_text = useColorModeValue('light.main_text', 'dark.main_text');
  return (
    <Box display="flex" flexDirection="column" gap="10px">
      <Text fontSize="24px" fontWeight="bold" color={main_text}>
        Настройки
      </Text>
      <Text fontSize="18px" fontWeight="bold">
        Изменить тему приложения
      </Text>
      <Button onClick={toggleColorMode}>
        {colorMode === 'light' ? 'Тёмная' : 'Светлая'} тема
      </Button>
    </Box>
  );
}
