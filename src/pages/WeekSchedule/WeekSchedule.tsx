import { useSettings } from '@/entities';
import { WeekLineSchedule } from '@/widgets';
import { WeekDaySchedule } from '@/widgets';

export function WeekSchedule() {
  const { fullScheduleView } = useSettings();
  return fullScheduleView === 'week' ? (
    <WeekLineSchedule />
  ) : (
    <WeekDaySchedule />
  );
}
