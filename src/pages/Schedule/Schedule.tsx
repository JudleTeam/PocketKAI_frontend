import { useSchedule } from '@/entities';
import { ScheduleLayout } from '@/widgets';
export function Schedule() {
  const { schedule } = useSchedule();
  return <ScheduleLayout schedule={schedule} />;
}
