import { AccountTabHeader, useColor } from '@/shared/lib';
import { Button, Text, Box, Switch, Divider } from '@chakra-ui/react';
import { useColorMode } from '@chakra-ui/react';
import styles from './Settings.module.scss';
import { useSettings } from '@/entities';
import { Select } from '@chakra-ui/react';
import { ScheduleView } from '@/shared';
export function Settings() {
  const { toggleColorMode, colorMode } = useColorMode();
  const { tabTeacher, mainColor, mainTextColor } = useColor();
  const {
    showFadedLessons,
    isScheduleInfinite,
    toggleShowFadedLessons,
    toggleIsScheduleInfinite,
    togglePreferencedScheduleView,
    preferencedScheduleView,
  } = useSettings();
  return (
    <Box className={styles['settings']}>
      <Box
        padding="20px 0 0 0"
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
      <Divider />
      <Box display={'flex'} flexDirection={'column'} gap={5}>
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Text
            as={'label'}
            fontSize="16px"
            fontWeight="semibold"
            color={mainTextColor}
            htmlFor="showFadedLessons"
          >
            Скрыть неактивные занятия
          </Text>
          <Switch
            id="showFadedLessons"
            size={'md'}
            isChecked={!showFadedLessons}
            onChange={() => toggleShowFadedLessons(!showFadedLessons)}
          />
        </Box>
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Text
            as={'label'}
            fontSize="16px"
            fontWeight="semibold"
            color={mainTextColor}
            htmlFor="isScheduleInfinite"
          >
            Бесконечная лента расписания
          </Text>
          <Switch
            id="isScheduleInfinite"
            key={2}
            size={'md'}
            isChecked={isScheduleInfinite}
            onChange={() => toggleIsScheduleInfinite(!isScheduleInfinite)}
          />
        </Box>
        <Divider />
        <Text fontSize="18px" fontWeight="bold" color={mainTextColor}>
          При открытии показывать:
        </Text>
        <Select
          color={mainTextColor}
          defaultValue={preferencedScheduleView}
          padding={'4px'}
          onChange={(event) =>
            togglePreferencedScheduleView(event.target.value as ScheduleView)
          }
        >
          <option value="timeline">Таймлайн</option>
          <option value="full">Полное расписание</option>
        </Select>
      </Box>
    </Box>
  );
}
