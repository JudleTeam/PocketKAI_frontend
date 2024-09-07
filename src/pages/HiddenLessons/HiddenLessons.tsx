import {
  Box,
  Text,
  useColorModeValue,
  PopoverContent,
  PopoverTrigger,
  PopoverArrow,
  PopoverHeader,
  VStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Divider,
  Button,
} from '@chakra-ui/react';
import { AccountTabHeader, useColor } from '@/shared/lib';
import styles from './HiddenLessons.module.scss';
import { useSchedule, useSettings } from '@/entities';
import { LessonTypes } from '@/entities';
import { DateTime } from 'luxon';
import { HiddenLesson } from '@/shared';
import { Popover } from '@chakra-ui/react';
import { useState } from 'react';
import { ElipsisIcon } from '@/shared/assets/chakraIcons/ElipsisIcon';
import { ShowIcon } from '@/shared/assets/chakraIcons/ShowIcon';
import { HideIcon } from '@/shared/assets/chakraIcons/HideIcon';
const getTypeHide = (type: string) => {
  if (type === 'always') {
    return 'Каждая неделя';
  }
  if (type === 'odd') {
    return 'Нечётная неделя';
  }
  if (type === 'even') {
    return 'Чётная неделя';
  } else {
    return `${DateTime.fromISO(type).setLocale('ru').toFormat('d MMMM')}`;
  }
};
export function HiddenLessons() {
  const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);
  const weekDaysOrder = [
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
    'Воскресенье',
  ];
  const { mainColor, mainTextColor, mainElementColor } = useColor();
  const dayNameColor = useColorModeValue(
    `${mainElementColor}40`,
    `${mainElementColor}80`
  );
  const { isColoredDayDate } = useSettings();
  const { hiddenLessons, addHiddenLesson, deleteAllHiddenLesson, deleteHiddenLesson } = useSchedule();
  const groupedLessons: Record<string, HiddenLesson[]> = hiddenLessons.reduce(
    (acc: Record<string, HiddenLesson[]>, lesson: HiddenLesson) => {
      const dayName = weekDaysOrder[lesson.number_of_day - 1];
      if (!acc[dayName]) {
        acc[dayName] = [];
      }
      acc[dayName].push(lesson);
      return acc;
    },
    {}
  );

  return (
    <Box className={styles['hidden']}>
      <Box
        padding="20px 0 0 0"
        position={'sticky'}
        top={'0px'}
        bgColor={mainColor}
        zIndex={'2'}
        boxShadow={`0px 0px 20px 20px ${mainColor}`}
      >
        <AccountTabHeader color={mainTextColor}>Скрытые пары</AccountTabHeader>
      </Box>
      <Box
        w="100%"
        style={{ scrollbarWidth: 'none' }}
        overflowY="auto"
        h="90vh"
        padding="0 0 130px 0"
      >
        {hiddenLessons.length > 0 && <Box w="100%" pt="5px" display="flex" justifyContent="end">
          <Button onClick={deleteAllHiddenLesson} size="sm" px="0" variant="ghost" color={mainElementColor}>
            Вернуть все пары
          </Button>
        </Box>}
        {hiddenLessons.length <= 0 && <Box w='100%' h='10vh' fontSize='18px' display='flex' justifyContent='center' alignItems='center' textAlign='center'>Скрытых пар нет!</Box>}
        {weekDaysOrder.map((dayName) =>
          groupedLessons[dayName] ? (
            <Box display={'flex'} flexDir={'column'} key={dayName} pb="10px">
              <Box w="100%" fontSize="18px" fontWeight="medium">
                <Box
                  as="span"
                  borderRadius={3}
                  py={0.5}
                  px={1.5}
                  my={1}
                  w={'fit-content'}
                  color={`${mainTextColor}e6`}
                  bgColor={isColoredDayDate ? dayNameColor : ''}
                >
                  {dayName}
                </Box>
              </Box>
              {groupedLessons[dayName]
                .sort((a, b) => {
                  const timeA = a.start_time
                    ? DateTime.fromISO(a.start_time)
                    : null;
                  const timeB = b.start_time
                    ? DateTime.fromISO(b.start_time)
                    : null;
                  if (!timeA || !timeB) return 0;
                  return timeA.valueOf() - timeB.valueOf(); // Сортировка по времени
                })
                .map((lesson) => (
                  <Box
                    key={lesson.id + lesson.type_hide}
                    w="100%"
                    display="flex"
                    flexDir="row"
                    alignItems="center"
                    py="5px"
                    px="5px"
                    justifyContent="space-between"
                  >
                    <Box w="50%">
                      <Popover
                        isLazy
                        key={lesson.id + lesson.type_hide}
                        isOpen={openPopoverId === lesson.id + lesson.type_hide}
                        onOpen={() =>
                          lesson.id &&
                          lesson.type_hide &&
                          setOpenPopoverId(lesson.id + lesson.type_hide)
                        }
                        onClose={() => setOpenPopoverId(null)}
                      >
                        <PopoverTrigger>
                          <Text
                            fontSize="16px"
                            fontWeight={'medium'}
                            color={mainTextColor}
                            _active={{ textDecoration: 'underline' }}
                            noOfLines={2}
                          >
                            {lesson.discipline.name}
                          </Text>
                        </PopoverTrigger>
                        <PopoverContent bgColor={mainColor}>
                          <PopoverArrow bg={mainColor} />
                          <PopoverHeader
                            fontSize="16px"
                            fontWeight={'bold'}
                            color={mainTextColor}
                          >
                            {lesson.discipline.name}
                          </PopoverHeader>
                        </PopoverContent>
                      </Popover>
                      <Box fontSize={'14px'}>
                        {lesson.parsed_lesson_type
                          ? LessonTypes[lesson.parsed_lesson_type]
                          : lesson.original_lesson_type}
                      </Box>
                    </Box>
                    <Box w="40%" textAlign="center">
                      <Text fontWeight="medium" color={mainTextColor}>
                        {lesson.start_time
                          ? DateTime.fromISO(lesson.start_time).toFormat(
                              'HH:mm'
                            )
                          : 'Н/Д'}
                        {' - '}
                        {lesson.end_time &&
                          DateTime.fromISO(lesson.end_time).toFormat('HH:mm')}
                      </Text>
                      <Text fontSize="14px" color={mainTextColor}>
                        <HideIcon /> {getTypeHide(lesson.type_hide)}
                      </Text>
                    </Box>
                    <Menu>
                      <MenuButton>
                        <VStack alignItems="center" justifyContent="center">
                          <ElipsisIcon
                            w="25px"
                            h="25px"
                            color={mainTextColor}
                            _active={{ color: '#fff' }}
                          />
                        </VStack>
                      </MenuButton>
                      <MenuList>
                        {lesson.type_hide !== 'always' && (
                          <MenuItem
                            onClick={() => {
                              addHiddenLesson({
                                ...lesson,
                                type_hide: 'always',
                              });
                            }}
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <Text color={mainTextColor}>
                              Скрыть на каждой неделе
                            </Text>
                          </MenuItem>
                        )}
                        {lesson.type_hide !== 'odd' &&
                          lesson.parsed_dates_status === 'need_check' &&
                          !lesson.parsed_dates && (
                            <MenuItem
                              onClick={() => {
                                addHiddenLesson({
                                  ...lesson,
                                  type_hide: 'odd',
                                });
                              }}
                              display="flex"
                              alignItems="center"
                              justifyContent="space-between"
                            >
                              <Text color={mainTextColor}>
                                Скрыть на нечётной неделе
                              </Text>
                            </MenuItem>
                          )}
                        {lesson.type_hide !== 'even' &&
                          lesson.parsed_dates_status === 'need_check' &&
                          !lesson.parsed_dates && (
                            <MenuItem
                              onClick={() => {
                                addHiddenLesson({
                                  ...lesson,
                                  type_hide: 'even',
                                });
                              }}
                              display="flex"
                              alignItems="center"
                              justifyContent="space-between"
                            >
                              <Text color={mainTextColor}>
                                Скрыть на чётной неделе
                              </Text>
                            </MenuItem>
                          )}

                        {/* Опция "Показать урок" */}
                        <MenuItem
                          onClick={() => {
                            console.log('Показать урок: ', lesson);
                            deleteHiddenLesson(lesson.id, lesson.type_hide);
                          }}
                          display={'flex'}
                          alignItems={'center'}
                          justifyContent={'space-between'}
                          color={'blue.400'}
                        >
                          <Box>Показать</Box> <ShowIcon />
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Box>
                ))}
              <Divider py="5px"></Divider>
            </Box>
          ) : null
        )}
      </Box>
    </Box>
  );
}
