import { Lesson } from '@/shared';
import { DateTime } from 'luxon';
import { getLessonBuilding, useColor } from '@/shared/lib';
import { LessonTypes } from '@/shared/constants';
import {
  Avatar,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useChakra,
  useColorModeValue,
} from '@chakra-ui/react';
import { parityTypes } from '@/shared/constants';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { Text, VStack, Box } from '@chakra-ui/react';
import { DrawerTitle } from '@/shared/ui/drawer';
const LessonDrawer = ({
  dayDate,
  lesson,
}: {
  dayDate: string;
  lesson: Lesson;
}) => {
  const specificDate = DateTime.fromISO(dayDate);
  const formattedDate = specificDate.toFormat('d MMMM', { locale: 'ru' });
  const { theme } = useChakra();
  const tab = useColorModeValue(theme.colors.light.tab, theme.colors.dark.tab);
  const mainTextColor = useColorModeValue('light.main_text', 'dark.main_text');
  const mainElementColor = useColorModeValue(
    'light.main_element',
    'dark.main_element'
  );
  const {cardColor, tabTeacher} = useColor()
  return (
    <>
      <div className="flex flex-col gap-3 pt-5 text-l-main-text dark:text-d-main-text">
        <DrawerTitle className="text-2xl font-bold">
          {lesson.discipline.name}
        </DrawerTitle>
        <p className="text-2xl font-medium">
          {lesson.start_time?.slice(0, -3)} {lesson.end_time && '-'}{' '}
          {lesson.end_time?.slice(0, -3)}
        </p>
        <Box
          display="flex"
          justifyContent="space-between"
          fontSize="16px"
          padding="10px 0"
        >
          <VStack
            w="45%"
            display="flex"
            alignItems="start"
            gap="2px"
            textAlign="start"
          >
            <Text>{formattedDate}</Text>
            <Text>{parityTypes[lesson.parsed_parity]}</Text>
          </VStack>
          <VStack
            w="55%"
            display="flex"
            alignItems="end"
            gap="2px"
            textAlign="end"
          >
            <Text>
              {getLessonBuilding(
                lesson.building_number,
                lesson.audience_number
              )}
            </Text>
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
                  fontSize: '18px',
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
          to="/account/report"
        >
          Сообщить об ошибке
        </Text>
        <Box
          as={HashLink}
          to={lesson.teacher ? `/teachers#${lesson?.teacher?.id}&${lesson.discipline.id}` : '/teachers'}
          boxShadow={`0px 0px 5px 0px ${tab}`}
          bgColor={cardColor}
          borderRadius="16px"
          padding="14px"
          display="flex"
          alignItems="center"
          gap="15px"
          transition="0.2s"
          _active={{ bgColor: tabTeacher, transition: '0.2s' }}
        >
          <Avatar bg={mainElementColor} />
          <Box>
            <Text fontSize="16px" fontWeight="medium">
              {lesson?.teacher?.name
                ? lesson.teacher.name
                : 'Преподаватель кафедры'}
            </Text>
            <Text fontSize="12px" fontWeight="medium">
              {lesson.department?.name}
            </Text>
          </Box>
        </Box>
      </div>
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
};

export default LessonDrawer;
