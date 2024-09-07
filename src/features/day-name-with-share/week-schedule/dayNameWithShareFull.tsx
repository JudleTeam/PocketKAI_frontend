import {
  Box,
  Icon,
  Text,
  useBreakpointValue,
  useToast,
} from '@chakra-ui/react';
import { Calendar, CalendarDays } from 'lucide-react';
import { useGroup, useSchedule } from '@/entities';
import { Lesson } from '@/shared';
import { shareData, useColor } from '@/shared/lib';
import { getFormattedDayScheduleFull } from './lib/getFormattedDayScheduleFull';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/shared/ui/context-menu';
import { getFormattedWeekScheduleFull } from './lib/getFormattedWeekScheduleFull';
import { SHORT_WEEK_DAYS, WEEK_DAYS } from '@/shared/constants';
import { HideIcon } from '@/shared/assets/chakraIcons/HideIcon';
import { useNavigate } from 'react-router-dom';

export function DayNameWithShareFull({
  dayName,
  dayLessons,
  weekParity,
  hiddenLessonsExist
}: {
  dayName: keyof typeof SHORT_WEEK_DAYS;
  dayLessons: Lesson[];
  weekParity: 'even' | 'odd';
  hiddenLessonsExist: boolean
}) {
  const { mainTextColor } = useColor();
  const toast = useToast();
  const navigate = useNavigate()
  const { weekSchedule } = useSchedule();
  const { currentGroup } = useGroup();
  const isDesktop = useBreakpointValue({ base: false, md: true });
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <Box
          _active={{ opacity: 0.5, bgColor: 'gray.200' }}
          transition={'0.2s'}
          borderRadius={3}
          mt={5}
          pb={1}
          px={1.5}
          w={'fit-content'}
          color={mainTextColor}
          fontWeight="medium"
          fontSize="18px"
          display='flex'
          alignItems='center'
        >
          <Text>{dayName && WEEK_DAYS[dayName]}</Text>
          {hiddenLessonsExist && <Box onClick={() => navigate('/account/hidden')} pl={2}><HideIcon opacity={'0.3'} color={mainTextColor}/></Box>}
        </Box>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem
          className={`space-x-2 ${dayLessons.length ? '' : 'hidden'}`}
          onClick={() =>
            dayLessons.length &&
            shareData(
              getFormattedDayScheduleFull(
                dayName,
                dayLessons,
                weekParity,
                currentGroup?.group_name
              ),
              toast,
              isDesktop
            )
          }
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
          onClick={() =>
            shareData(
              getFormattedWeekScheduleFull(weekSchedule, weekParity),
              toast,
              isDesktop
            )
          }
        >
          <Text>Поделиться неделей</Text>
          <Icon as={CalendarDays} />
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
