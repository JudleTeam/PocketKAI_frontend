import {
  Box,
  Icon,
  Text,
  useBreakpointValue,
  useToast,
} from '@chakra-ui/react';
import { Calendar, CalendarDays } from 'lucide-react';
import { useGroup, useSchedule, useYaMetrika } from '@/entities';
import {
  AnalyticsEvent,
  getTodayDate,
  getWeekParity,
  Lesson,
  shareData,
  SHORT_WEEK_DAYS,
  useColor,
  WEEK_DAYS,
} from '@/shared';
import { getFormattedDayScheduleFull } from './lib/getFormattedDayScheduleFull';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/shared/ui/context-menu';
import { getFormattedWeekScheduleFull } from './lib/getFormattedWeekScheduleFull';
import { HideIcon } from '@/shared/assets/chakraIcons/HideIcon';
import { useNavigate } from 'react-router-dom';
import { DateTime } from 'luxon';

export function DayNameWithShareFull({
  dayName,
  dayLessons,
  weekParity,
  hiddenLessonsExist,
}: {
  dayName: keyof typeof SHORT_WEEK_DAYS;
  dayLessons: Lesson[];
  weekParity: 'even' | 'odd';
  hiddenLessonsExist: boolean;
}) {
  const { primaryColor } = useColor();
  const toast = useToast();
  const navigate = useNavigate();
  const { weekSchedule } = useSchedule();
  const { currentGroup } = useGroup();
  const isDesktop = useBreakpointValue({ base: false, md: true });
  const { sendEvent } = useYaMetrika();
  const today = getTodayDate();
  const currentParity = getWeekParity();
  const todayDayOfWeek = DateTime.fromISO(today)
    .setLocale('en')
    .weekdayLong?.toLocaleLowerCase();

  return (
    <ContextMenu
      onOpenChange={(open) =>
        open && sendEvent(AnalyticsEvent.lessonOpenContext)
      }
    >
      <ContextMenuTrigger asChild>
        <Box
          transition={'0.2s'}
          pt={3}
          pb={1}
          w={'fit-content'}
          color={primaryColor}
          fontWeight="medium"
          fontSize="18px"
          display="flex"
          alignItems="center"
        >
          <Box
            display={'flex'}
            _active={{ opacity: 0.5, bgColor: 'gray.200' }}
            borderRadius={3}
            px={1.5}
          >
            <Text
              color={
                todayDayOfWeek + currentParity === dayName + weekParity
                  ? 'blue.400'
                  : primaryColor
              }
            >
              {dayName && WEEK_DAYS[dayName]}
            </Text>
            {hiddenLessonsExist && (
              <Box onClick={() => navigate('/hidden')} pl={2}>
                <HideIcon opacity={'0.3'} color={primaryColor} />
              </Box>
            )}
          </Box>
        </Box>
      </ContextMenuTrigger>
      <ContextMenuContent avoidCollisions>
        <ContextMenuItem
          className={`space-x-2 ${dayLessons.length ? '' : 'hidden'}`}
          onClick={() => {
            if (dayLessons.length) {
              shareData(
                getFormattedDayScheduleFull(
                  dayName,
                  dayLessons,
                  weekParity,
                  currentGroup?.group_name
                ),
                toast,
                isDesktop
              );
              sendEvent(AnalyticsEvent.scheduleCopyDay);
            }
          }}
        >
          <Text>Поделиться днём</Text>
          <Icon as={Calendar} />
        </ContextMenuItem>
        <ContextMenuSeparator
          className={`bg-gray-300 dark:bg-gray-500  ${
            dayLessons.length ? '' : 'hidden'
          }`}
        />
        <ContextMenuItem
          className="space-x-2"
          onClick={() => {
            shareData(
              getFormattedWeekScheduleFull(weekSchedule, weekParity),
              toast,
              isDesktop
            );
            sendEvent(AnalyticsEvent.scheduleCopyWeek);
          }}
        >
          <Text>Поделиться неделей</Text>
          <Icon as={CalendarDays} />
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
