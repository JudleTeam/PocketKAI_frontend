import {
  Box,
  Icon,
  Text,
  useBreakpointValue,
  useToast,
} from '@chakra-ui/react';
import { Calendar, CalendarDays } from 'lucide-react';
import { useGroup, useSchedule, useSettings } from '@/entities';
import { Day, getFormattedDate } from '@/shared';
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

export function DayNameWithShare({ day }: { day: Day }) {
  const { mainTextColor, mainElementColor } = useColor();
  const toast = useToast();
  const { isColoredDayDate } = useSettings();
  const { parity, schedule } = useSchedule();
  const { currentGroup } = useGroup();
  const isDesktop = useBreakpointValue({ base: false, md: true });
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <Box
          bgColor={isColoredDayDate ? `${mainElementColor}40` : 'none'}
          _active={{ opacity: 0.5, bgColor: 'gray.200' }}
          transition={'0.2s'}
          borderRadius={3}
          py={0.5}
          px={1.5}
          w={'fit-content'}
          color={`${mainTextColor}e6`}
          fontWeight="medium"
          fontSize="18px"
        >
          {getFormattedDate(day.date)}
        </Box>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem
          className={`space-x-2 ${day.lessons.length ? '' : 'hidden'}`}
          onClick={() =>
            day.lessons.length &&
            shareData(
              getFormattedDaySchedule(day, parity, currentGroup?.group_name),
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
              getFormattedWeekSchedule(day, parity, schedule),
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
