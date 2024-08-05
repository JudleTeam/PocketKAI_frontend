import { useSchedule } from '@/entities';
import { ScheduleLayout } from '@/widgets';
import { Box } from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/react';
export function Schedule() {
  const { schedule } = useSchedule();
  console.log(schedule);
  const mainTextColor = useColorModeValue('light.main_text', 'dark.main_text');
  return (
    <>
      {schedule.days.length > 0 ? (
        <ScheduleLayout schedule={schedule} />
      ) : (
        <Box
          position="absolute"
          top="50%"
          left="50%"
          zIndex="2"
          transform="translate(-50%, -50%)"
          fontSize="18px"
          fontWeight="medium"
          color={mainTextColor}
        >
          Выберите группу!
        </Box>
      )}
    </>
  );
}
