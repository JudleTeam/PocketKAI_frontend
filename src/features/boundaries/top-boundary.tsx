import { useSchedule, useSettings } from '@/entities';
import { Button, Skeleton, Stack } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import { forwardRef } from 'react';

export const TopBoundary = forwardRef<HTMLDivElement>((_, upperRef) => {
  const { schedule, addToCurrentSchedule } = useSchedule();
  const handleLoadMore = () => {
    const dateFrom = DateTime.fromISO(schedule?.days[0].date)
      .minus({ days: 7 })
      .toFormat('yyyy-LL-dd');
    addToCurrentSchedule(
      {
        date_from: dateFrom,
        days_count: 7,
      },
      false
    );
  };
  const { isScheduleInfinite } = useSettings();
  if (isScheduleInfinite) {
    return (
      <Stack ref={upperRef}>
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </Stack>
    );
  }
  return (
    <Button w={'100%'} mb={2} onClick={() => handleLoadMore()}>
      Загрузить
    </Button>
  );
});
