import { copyToast, Lesson } from '@/shared';
import { DateTime } from 'luxon';
import { useColor } from '@/shared/lib';
import { LessonTypes } from '@/shared/constants';
import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useToast,
} from '@chakra-ui/react';
import { parityTypes } from '@/shared/constants';
import { Link } from 'react-router-dom';
import { Text, VStack, Box } from '@chakra-ui/react';
import { DrawerTitle } from '@/shared/ui/drawer';
import { DrawerTeacherCard } from './DrawerTeacherCard';
import { DrawerLessonBuilding } from './DrawerLessonBuilding';
export function LessonDrawer({
  lesson,
  dayDate,
}: {
  lesson: Lesson;
  dayDate?: string;
}) {
  const specificDate = dayDate ? DateTime.fromISO(dayDate) : '';
  const formattedDate = specificDate
    ? specificDate.toFormat('d MMMM', { locale: 'ru' })
    : '';
  const { mainTextColor } = useColor();
  const toast = useToast();
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        className="gap-2 pt-5 text-l-main-text dark:text-d-main-text"
      >
        <DrawerTitle asChild>
          <Text
            fontSize={'clamp(22px, 4vw, 24px)'}
            fontWeight="bold"
            onClick={() => copyToast(lesson.discipline.name, toast)}
          >
            {lesson.discipline.name}
          </Text>
        </DrawerTitle>
        <Text fontSize={'25px'} fontWeight="medium">
          {lesson.start_time?.slice(0, -3)} {lesson.end_time && '-'}{' '}
          {lesson.end_time?.slice(0, -3)}
        </Text>
        <Box
          display="flex"
          justifyContent="space-between"
          fontSize="16px"
          padding="10px 0"
        >
          <VStack
            w="44%"
            display="flex"
            alignItems="start"
            gap="2px"
            textAlign="start"
          >
            <Text>{formattedDate}</Text>
            <Text>{parityTypes[lesson.parsed_parity]}</Text>
          </VStack>
          <VStack
            w="56%"
            display="flex"
            alignItems="end"
            gap="2px"
            textAlign="end"
          >
            <DrawerLessonBuilding lesson={lesson} />
            <Text>
              {lesson.parsed_lesson_type &&
                LessonTypes[lesson.parsed_lesson_type]}
            </Text>
          </VStack>
        </Box>
        {lesson.parsed_dates && lesson.parsed_dates_status === 'good' ? (
          <Text fontWeight="medium" fontSize="18px" color={mainTextColor}>
            Даты проведения пары:{' '}
            {lesson.parsed_dates
              .map((date) =>
                DateTime.fromISO(date).setLocale('ru').toFormat('dd MMMM')
              )
              .join(', ')}
          </Text>
        ) : lesson.parsed_dates &&
          lesson.parsed_dates_status === 'need_check' ? (
          <Popover>
            <PopoverTrigger>
              <button
                style={{
                  display: 'flex',
                  textAlign: 'start',
                  flexWrap: 'wrap',
                  width: '100%',
                  color: '#ED8936',
                  fontWeight: '500',
                  fontSize: '15px',
                }}
              >
                Даты проведения пары: {lesson.original_dates}
              </button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverBody fontSize="14px">
                <Text fontSize={'14px'} color={mainTextColor}>
                  {lesson.parsed_dates
                    .map((date) =>
                      DateTime.fromISO(date).setLocale('ru').toFormat('dd MMMM')
                    )
                    .join(', ')}
                </Text>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        ) : lesson.original_dates &&
          lesson.parsed_dates_status == 'need_check' ? (
          <Text fontWeight="medium" fontSize="18px" color={mainTextColor}>
            Даты проведения пары: {lesson.original_dates}
          </Text>
        ) : null}
        <Text
          as={Link}
          padding="10px 0"
          fontSize="14px"
          fontWeight="medium"
          color="orange.300"
          to="/report"
        >
          Сообщить об ошибке
        </Text>
        <DrawerTeacherCard lesson={lesson} />
      </Box>
      {/* <DrawerBody w="100%">
        <Tabs w="100%">
          <TabList w="100%">
            <Tab w="50%" fontWeight="medium">
              Домашняя работа
            </Tab>
            <Tab w="50%" fontWeight="medium">
              Важная информация
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Button
                variant="outline"
                colorScheme="blue.600"
                color="blue.600"
                width="100%"
              >
                Добавить домашнюю работу
              </Button>
            </TabPanel>
            <TabPanel>
              <Button
                variant="outline"
                colorScheme="blue.600"
                color="blue.600"
                width="100%"
              >
                Добавить заметку
              </Button>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </DrawerBody> */}
    </>
  );
}
