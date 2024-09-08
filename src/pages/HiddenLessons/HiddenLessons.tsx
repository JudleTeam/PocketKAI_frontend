import { Box, Text, Button, Divider, Menu, MenuButton, MenuList, MenuItem, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverHeader, VStack, MenuDivider } from '@chakra-ui/react';
import { useGroup, useSettings } from '@/entities';
import { LessonTypes } from '@/entities';
import { DateTime } from 'luxon';
import { getTodayDate, Group, GroupShort, HiddenLesson } from '@/shared';
import { ElipsisIcon } from '@/shared/assets/chakraIcons/ElipsisIcon';
import { ShowIcon } from '@/shared/assets/chakraIcons/ShowIcon';
import { HideIcon } from '@/shared/assets/chakraIcons/HideIcon';
import styles from './HiddenLessons.module.scss';
import { useColorModeValue } from '@chakra-ui/react';
import { useColor } from '@/shared/lib';
import { useEffect, useState } from 'react';
import { AccountTabHeader } from '@/shared/lib';

const getTypeHide = (type: string) => {
  if (type === 'always') return 'Каждая неделя';
  if (type === 'odd') return 'Нечётная неделя';
  if (type === 'even') return 'Чётная неделя';
  return `${DateTime.fromISO(type).setLocale('ru').toFormat('d MMMM')}`;
};

export function HiddenLessons() {
  const today = getTodayDate();
  const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);
  const weekDaysOrder = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
  const { mainColor, mainTextColor, mainElementColor } = useColor();
  const dayNameColor = useColorModeValue(`${mainElementColor}40`, `${mainElementColor}80`);
  const { isColoredDayDate } = useSettings();
  const { hiddenLessons, addHiddenLesson, deleteAllHiddenLesson, updateHiddenLesson, deleteHiddenLesson, deleteGroupHiddenLesson } = useGroup();

  useEffect(() => {
    updateHiddenLesson(today);
  }, [updateHiddenLesson, today]);

  type GroupedLessons = Record<string, { group: Group | GroupShort; lessons: Record<string, HiddenLesson[]> }>;

// Safeguard against invalid entries
const groupedLessons: GroupedLessons = hiddenLessons.reduce((acc, { group, lesson }) => {
  if (!group || !lesson) return acc; // Skip invalid entries

  const groupName = (group as Group)?.group_name; // Use group_name as the key
  const dayName = weekDaysOrder[lesson.number_of_day - 1];

  if (!groupName || !dayName) return acc; // Skip if groupName or dayName is invalid

  // Initialize group if not already present
  if (!acc[groupName]) {
    acc[groupName] = { group, lessons: {} };
  }

  // Initialize day if not already present
  if (!acc[groupName].lessons[dayName]) {
    acc[groupName].lessons[dayName] = [];
  }

  acc[groupName].lessons[dayName].push(lesson);

  return acc;
}, {} as GroupedLessons);

  return (
    <Box className={styles['hidden']}>
      <Box padding="20px 0 0 0" position={'sticky'} top={'0px'} bgColor={mainColor} zIndex={'2'} boxShadow={`0px 0px 20px 20px ${mainColor}`}>
        <AccountTabHeader color={mainTextColor}>Скрытые пары</AccountTabHeader>
      </Box>
      <Box w="100%" style={{ scrollbarWidth: 'none' }} overflowY="auto" h="88vh">
        {hiddenLessons.length > 0 && (
          <Box w="100%" py="10px" display="flex" justifyContent="end">
            <Button onClick={deleteAllHiddenLesson} size="sm" px="0" variant="ghost" color="#3182CE">
              Вернуть все пары
            </Button>
          </Box>
        )}
        {hiddenLessons.length <= 0 && (
          <Box w="100%" h="10vh" fontSize="18px" display="flex" justifyContent="center" alignItems="center" textAlign="center">
            Скрытых пар нет!
          </Box>
        )}
        {Object.entries(groupedLessons || {}).map(([groupName, {group, lessons }]) => (
          <Box key={groupName}>
            <Box fontSize="18px" fontWeight="medium" py="10px" display='flex' justifyContent='space-between' alignItems='center'>
              <Text fontWeight="bold" fontSize='20px'>{groupName}</Text>
              <Button onClick={() => deleteGroupHiddenLesson(groupName)} size="sm" px="0" variant="ghost" color="#3182CE">
                Вернуть пары группы
              </Button>
            </Box>
            {Object.entries(lessons || {}).sort(([dayA], [dayB]) => {
          return weekDaysOrder.indexOf(dayA) - weekDaysOrder.indexOf(dayB);
        }).map(([dayName, dayLessons]) => (
              <Box key={dayName} display={'flex'} flexDir={'column'} pb="10px">
                <Box w="100%" fontSize="18px" fontWeight="medium">
                  <Box as="span" borderRadius={3} py={0.5} px={1.5} my={1} w={'fit-content'} color={`${mainTextColor}e6`} bgColor={isColoredDayDate ? dayNameColor : ''}>
                    {dayName}
                  </Box>
                </Box>
                {dayLessons
                  .sort((a, b) => {
                    const timeA = a.start_time ? DateTime.fromISO(a.start_time) : null;
                    const timeB = b.start_time ? DateTime.fromISO(b.start_time) : null;
                    if (!timeA || !timeB) return 0;
                    return timeA.valueOf() - timeB.valueOf(); // Sort by start time
                  })
                  .map((lesson: HiddenLesson) => (
                    <Box key={lesson.id} w="100%" display="flex" flexDir="row" alignItems="center" py="5px" px="5px" justifyContent="space-between">
                      <Box w="50%">
                        <Popover isLazy isOpen={openPopoverId === lesson.id} onOpen={() => setOpenPopoverId(lesson.id)} onClose={() => setOpenPopoverId(null)}>
                          <PopoverTrigger>
                            <Text fontSize="16px" fontWeight={'medium'} color={mainTextColor} _active={{ textDecoration: 'underline' }} noOfLines={2}>
                              {lesson.discipline.name}
                            </Text>
                          </PopoverTrigger>
                          <PopoverContent bgColor={mainColor}>
                            <PopoverArrow bg={mainColor} />
                            <PopoverHeader fontSize="16px" fontWeight={'bold'} color={mainTextColor}>
                              {lesson.discipline.name}
                            </PopoverHeader>
                          </PopoverContent>
                        </Popover>
                        <Box fontSize={'14px'}>
                          {lesson.parsed_lesson_type ? LessonTypes[lesson.parsed_lesson_type] : lesson.original_lesson_type}
                        </Box>
                      </Box>
                      <Box w="40%" textAlign="center">
                        <Text fontWeight="medium" color={mainTextColor}>
                          {lesson.start_time ? DateTime.fromISO(lesson.start_time).toFormat('HH:mm') : 'Н/Д'} {' - '}
                          {lesson.end_time && DateTime.fromISO(lesson.end_time).toFormat('HH:mm')}
                        </Text>
                        <Text fontSize="14px" color={mainTextColor}>
                          <HideIcon /> {getTypeHide(lesson.type_hide)}
                        </Text>
                      </Box>
                      <Menu>
                        <MenuButton>
                          <VStack alignItems="center" justifyContent="center">
                            <ElipsisIcon w="25px" h="25px" color={mainTextColor} />
                          </VStack>
                        </MenuButton>
                        <MenuList my="35px">
                          {lesson.type_hide !== 'always' && lesson.parsed_parity !== 'even' && lesson.parsed_parity !== 'odd' && (
                            <>
                              <MenuItem
                                onClick={() => {
                                  addHiddenLesson({ ...lesson, type_hide: 'always' }, group);
                                }}
                                display="flex"
                                alignItems="center"
                                justifyContent="space-between"
                              >
                                <Text color={mainTextColor}>Скрыть на каждой неделе</Text>
                              </MenuItem>
                              <MenuDivider />
                            </>
                          )}
                          {lesson.type_hide !== 'odd' && (lesson.parsed_dates_status === 'need_check' && !lesson.parsed_dates && lesson.parsed_parity === 'any' || lesson.parsed_parity === 'odd' ) && (
                            <>
                              <MenuItem
                                onClick={() => {
                                  addHiddenLesson({ ...lesson, type_hide: 'odd' },group);
                                }}
                                display="flex"
                                alignItems="center"
                                justifyContent="space-between"
                              >
                                <Text color={mainTextColor}>Скрыть на нечётной неделе</Text>
                              </MenuItem>
                              <MenuDivider />
                            </>
                          )}
                          {lesson.type_hide !== 'even' && (lesson.parsed_dates_status === 'need_check' && !lesson.parsed_dates && lesson.parsed_parity === 'any' || lesson.parsed_parity === 'even' ) && (
                            <>
                              <MenuItem
                                onClick={() => {
                                  addHiddenLesson({ ...lesson, type_hide: 'even' }, group);
                                }}
                                display="flex"
                                alignItems="center"
                                justifyContent="space-between"
                              >
                                <Text color={mainTextColor}>Скрыть на чётной неделе</Text>
                              </MenuItem>
                              <MenuDivider />
                            </>
                          )}
                          <MenuItem
                            onClick={() => {
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
                <Divider py="5px" />
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
