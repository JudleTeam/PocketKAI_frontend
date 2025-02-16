import {
  Box,
  Icon,
  Text,
  useBreakpointValue,
  useToast,
} from '@chakra-ui/react';
import { Calendar, CalendarDays } from 'lucide-react';
import { useGroup, useSchedule, useSettings } from '@/entities';
import { Day, getFormattedDate, getTodayDate } from '@/shared';
import { shareData, useColor } from '@/shared/lib';
import { getFormattedDaySchedule } from './lib/getFormattedDaySchedule';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/shared/ui/context-menu';
import { getFormattedWeekSchedule } from './lib/getFormattedWeekSchedule';
import { HideIcon } from '@/shared/assets/chakraIcons/HideIcon';
import { useNavigate } from 'react-router-dom';

export function DayNameWithShare({
  day,
  hiddenLessonsExist,
}: {
  day: Day;
  hiddenLessonsExist: boolean;
}) {
  const { primaryColor, secondaryColor, accentColor } = useColor();

  const isToday = day.date === getTodayDate();
  const toast = useToast();
  const navigate = useNavigate();
  const { isColoredDayDate } = useSettings();
  const { schedule } = useSchedule();
  const { currentGroup } = useGroup();
  const isDesktop = useBreakpointValue({ base: false, md: true });

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <Box
          display={'flex'}
          alignItems={'center'}
          gap={isToday ? 2 : 0}
          bgColor={isColoredDayDate ? secondaryColor : ''}
          _active={{ opacity: 0.5, bgColor: 'gray.200' }}
          transition={'0.2s'}
          borderRadius="24px"
          py="2px"
          px={isColoredDayDate ? '15px' : '10px'}
          my={1}
          w={'fit-content'}
          color={`${primaryColor}e6`}
          fontWeight="medium"
          fontSize="18px"
        >
          <Text fontSize={'18px'} color={isToday ? accentColor : primaryColor}>
            {isToday && '➤'}
          </Text>
          <Text fontSize={'18px '} color={isToday ? accentColor : primaryColor}>
            {getFormattedDate(day.date)}
          </Text>
          {hiddenLessonsExist && (
            <Box onClick={() => navigate('/hidden')} pl={2}>
              <HideIcon opacity={'0.3'} color={primaryColor} />
            </Box>
          )}
        </Box>
      </ContextMenuTrigger>
      <ContextMenuContent avoidCollisions>
        <ContextMenuItem
          className={`space-x-2 ${day.lessons.length ? '' : 'hidden'}`}
          onClick={() =>
            day.lessons.length &&
            shareData(
              getFormattedDaySchedule(day, currentGroup?.group_name),
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
            day.lessons.length ? '' : 'hidden'
          }`}
        />
        <ContextMenuItem
          className="space-x-2"
          onClick={() =>
            shareData(
              getFormattedWeekSchedule(day, schedule, currentGroup?.group_name),
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
