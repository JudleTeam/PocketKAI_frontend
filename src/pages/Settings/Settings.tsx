import { AccountTabHeader, useColor } from '@/shared/lib';
import { Button, Text, Box } from '@chakra-ui/react';
import { useColorMode } from '@chakra-ui/react';
import styles from './Settings.module.scss';
import { useSchedule } from '@/entities';
export function Settings() {
  const { toggleColorMode, colorMode } = useColorMode();
  const { tabTeacher, mainColor, mainTextColor } = useColor();
  const { showFadedLessons, setShowFadedLessons } = useSchedule();
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
      <Box
        display={'flex'}
        flexDirection={'column'}
        gap={2}
        alignItems={'center'}
      >
        <Text fontSize="18px" fontWeight="bold" color={mainTextColor}>
          Изменить тему приложения
        </Text>
        <Button
          w={'100%'}
          onClick={toggleColorMode}
          bg={tabTeacher}
          color={mainTextColor}
        >
          {colorMode === 'light' ? 'Тёмная' : 'Светлая'} тема
        </Button>
      </Box>

      <Box
        display={'flex'}
        flexDirection={'column'}
        gap={2}
        alignItems={'center'}
      >
        <Text fontSize="18px" fontWeight="bold" color={mainTextColor}>
          Скрыть неактивные занятия
        </Text>
        <Button
          w={'100%'}
          onClick={() => setShowFadedLessons(!showFadedLessons)}
          bg={tabTeacher}
          color={mainTextColor}
        >
          {showFadedLessons ? 'Скрыть' : 'Показать'}
        </Button>
      </Box>
    </Box>
  );
}
