import { AnalyticsEvent, HiddenLesson, LessonTypes, useColor } from '@/shared';
import { DateTime } from 'luxon';
import { possiblyHide } from '../../lib/possiblyHide';
import {
  Box,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  VStack,
} from '@chakra-ui/react';
import { HideIcon } from '@/shared/assets/chakraIcons/HideIcon';
import { ElipsisIcon } from '@/shared/assets/chakraIcons/ElipsisIcon';
import { ShowIcon } from '@/shared/assets/chakraIcons/ShowIcon';
import { useState } from 'react';
import { useGroup, useSettings, useYaMetrika } from '@/entities';
import { getTypeHide } from '../../lib/getTypeHide';

type HiddenLessonsListProps = {
  weekDays: {
    dayName: string;
    lessons: HiddenLesson[];
  }[];
};

const HiddenLessonsList: React.FC<HiddenLessonsListProps> = ({ weekDays }) => {
  const { sendEvent } = useYaMetrika();
  const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);
  const { mainColor, primaryColor, secondaryColor } = useColor();
  const { addHiddenLesson, deleteHiddenLesson, currentGroup } = useGroup();
  const { isColoredDayDate } = useSettings();
  return (
    <>
      {weekDays.map(({ dayName, lessons }) => (
        <>
          <Box w="100%" fontSize="18px" pt={3} fontWeight="medium">
            <Box
              as="span"
              my={1}
              w={'fit-content'}
              color={`${primaryColor}e6`}
              display={'flex'}
              alignItems={'center'}
              bgColor={isColoredDayDate ? secondaryColor : ''}
              _active={{ opacity: 0.5, bgColor: 'gray.200' }}
              transition={'0.2s'}
              borderRadius="16px"
              py="2px"
              px={isColoredDayDate ? '15px' : '10px'}
              fontWeight="medium"
              fontSize="16px"
            >
              {dayName}
            </Box>
          </Box>
          {lessons
            .sort((a, b) => {
              const timeA = a.start_time
                ? DateTime.fromISO(a.start_time)
                : null;
              const timeB = b.start_time
                ? DateTime.fromISO(b.start_time)
                : null;
              if (!timeA || !timeB) return 0;
              return timeA.valueOf() - timeB.valueOf();
            })
            .map((lesson: HiddenLesson) => {
              const trueArray = possiblyHide(lesson);
              return (
                <Box
                  key={lesson.id}
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
                      isOpen={openPopoverId === lesson.id}
                      onOpen={() => setOpenPopoverId(lesson.id)}
                      onClose={() => setOpenPopoverId(null)}
                    >
                      <PopoverTrigger>
                        <Text
                          fontSize="16px"
                          fontWeight={'medium'}
                          color={primaryColor}
                          _active={{
                            textDecoration: 'underline',
                          }}
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
                          color={primaryColor}
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
                    <Text fontWeight="medium" color={primaryColor}>
                      {lesson.start_time
                        ? DateTime.fromISO(lesson.start_time).toFormat('HH:mm')
                        : 'Н/Д'}{' '}
                      {' - '}
                      {lesson.end_time &&
                        DateTime.fromISO(lesson.end_time).toFormat('HH:mm')}
                    </Text>
                    <Text fontSize="14px" color={primaryColor}>
                      <HideIcon /> {getTypeHide(lesson.type_hide)}
                    </Text>
                  </Box>
                  <Menu>
                    <MenuButton>
                      <VStack alignItems="center" justifyContent="center">
                        <ElipsisIcon w="25px" h="25px" color={primaryColor} />
                      </VStack>
                    </MenuButton>
                    <MenuList my="35px">
                      {trueArray.map((hide) => (
                        <>
                          <MenuItem
                            onClick={() => {
                              addHiddenLesson(
                                {
                                  ...lesson,
                                  type_hide:
                                    'odd' === hide
                                      ? 'odd'
                                      : 'even' === hide
                                        ? 'even'
                                        : 'always' === hide
                                          ? 'always'
                                          : lesson.type_hide,
                                },
                                currentGroup
                              );
                            }}
                            display={
                              'even' === hide ||
                              'odd' === hide ||
                              'always' === hide
                                ? 'flex'
                                : 'none'
                            }
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <Text color={primaryColor}>
                              {'odd' === hide
                                ? 'Скрыть на нечётной неделе'
                                : 'even' === hide
                                  ? 'Скрыть на чётной неделе'
                                  : 'always' === hide
                                    ? 'Скрыть на каждой неделе'
                                    : ''}
                            </Text>
                          </MenuItem>
                          <MenuDivider
                            display={
                              'even' === hide ||
                              'odd' === hide ||
                              'always' === hide
                                ? 'flex'
                                : 'none'
                            }
                          />
                        </>
                      ))}
                      <MenuItem
                        onClick={() => {
                          deleteHiddenLesson(lesson.id, lesson.type_hide);
                          sendEvent(AnalyticsEvent.lessonDeleteHidden);
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
              );
            })}
        </>
      ))}
    </>
  );
};

export default HiddenLessonsList;
