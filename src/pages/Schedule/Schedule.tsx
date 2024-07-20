import { useSchedule } from '@/entities';
import { useScrollSpy } from './lib/useScrollSpy';
import { ScheduleLayout } from '@/widgets';
export function Schedule() {
  const { schedule } = useSchedule();
  useScrollSpy(schedule);
  return <ScheduleLayout schedule={schedule} />;
}
