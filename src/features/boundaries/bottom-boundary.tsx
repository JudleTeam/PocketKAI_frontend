import { useSchedule, useSettings, useYaMetrika } from '@/entities';
import { Button, Skeleton, Stack } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import { forwardRef } from 'react';
import { AnalyticsEvent } from '@/shared';

export const BottomBoundary = forwardRef<HTMLDivElement>((_, lowerRef) => {
  const { isScheduleInfinite } = useSettings();
  const { schedule, addToCurrentSchedule } = useSchedule();
  const { sendEvent } = useYaMetrika();
  const handleLoadMore = () => {
    const dateFrom = DateTime.fromISO(
      schedule?.days[schedule.days.length - 1].date
    )
      .plus({ days: 1 })
      .toFormat('yyyy-LL-dd');
    addToCurrentSchedule(
      {
        date_from: dateFrom,
        days_count: 7,
      },
      true
    );
    sendEvent(AnalyticsEvent.scheduleView2WeeksForward);
  };
  if (isScheduleInfinite) {
    return (
      <Stack ref={lowerRef}>
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </Stack>
    );
  }
  return (
    <Button w={'100%'} mt={2} onClick={() => handleLoadMore()}>
      Загрузить
    </Button>
  );
});
