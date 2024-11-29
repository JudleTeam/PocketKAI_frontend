import { AccountTabHeader, useColor } from '@/shared/lib';
import { Button, Text, Box, Switch, Divider, useBreakpointValue } from '@chakra-ui/react';
import { useColorMode } from '@chakra-ui/react';
import styles from './Settings.module.scss';
import { usePWAState, useSettings } from '@/entities';
import { Select } from '@chakra-ui/react';
import { FullScheduleView, ScheduleView } from '@/shared';
export function Settings() {
  const { toggleColorMode, colorMode } = useColorMode();
  const { tabTeacher, mainColor, mainTextColor } = useColor();
  const { storeNeedRefresh, updateServiceWorker } = usePWAState();
  const {
    showFadedLessons,
    isScheduleInfinite,
    preferencedScheduleView,
    fullScheduleView,
    isColoredDayDate,
    toggleShowFadedLessons,
    toggleIsScheduleInfinite,
    togglePreferencedScheduleView,
    toggleIsColoredDayDate,
    toggleFullScheduleView  ,
  } = useSettings();
  const isDesktop = useBreakpointValue({ base: false, md: true });
  return (
    <Box className={styles['settings']} style={isDesktop ? { width: '40%' } : {}}>
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
            Визуальное выделение дат
          </Text>
          <Switch
            id="isScheduleInfinite"
            key={3}
            size={'md'}
            isChecked={isColoredDayDate}
            onChange={() => toggleIsColoredDayDate(!isColoredDayDate)}
          />
        </Box>
        {/* <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Text
            as={'label'}
            fontSize="16px"
            fontWeight="semibold"
            color={mainTextColor}
            htmlFor="teacherMode"
          >
            Режим преподавателя
          </Text>
          <Switch
            id="teacherMode"
            key={3}
            size={'md'}
            isChecked={teacherMode}
            onChange={() => toggleTeacherMode(!teacherMode)}
          />
        </Box> */}
        <Divider />

        <Box>
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
        <Divider />
        <Box>
        <Text fontSize="18px" fontWeight="bold" color={mainTextColor}>
          Полное расписание:
        </Text>
        <Select
          color={mainTextColor}
          defaultValue={fullScheduleView}
          padding={'4px'}
          onChange={(event) =>
            toggleFullScheduleView(event.target.value as FullScheduleView)
          }
        >
          <option value="week">Полная неделя</option>
          <option value="day">По дням</option>
        </Select>
        </Box>
        <Divider />
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Text fontSize="16px" fontWeight="semibold" color={mainTextColor}>
            Ручное обновление
          </Text>
          <Button
            isDisabled={!storeNeedRefresh}
            onClick={() => updateServiceWorker(true)}
          >
            Обновить
          </Button>
        </Box>
        <Divider />

        <Text textAlign={'right'}>
          Версия:{' '}
          <Text as={'span'} fontWeight={'bold'}>
            1.0.3-hotfix
          </Text>
        </Text>
      </Box>
    </Box>
  );
}
