import { UiNavbar } from '@/shared/ui/ui-navbar/UiNavbar';
import { Outlet } from 'react-router-dom';
import { Box, useToast } from '@chakra-ui/react';
import { useEffect } from 'react';
import { NavbarActions } from './navbar/NavbarActions';
import { isScheduleOutdated, PWABadge, useSchedule, useUser } from '@/entities';
import { isScheduleOutdatedInternet } from '@/entities';
import { useColor, useMetaThemeColor } from '@/shared';

export function RootLayout() {
  const { userAuthStatus, backgroundTasks, getBackgroundTaskStatus } =
    useUser();
  const { schedule } = useSchedule();
  const { mainColor } = useColor();
  const toast = useToast();

  useEffect(() => {
    const hasCleaned = localStorage.getItem('hasCleaned')
    if (!hasCleaned) {
      localStorage.clear()
      localStorage.setItem('hasCleaned', 'true')
      window.location.reload()
    }
  }, [])

  useMetaThemeColor(mainColor);

  useEffect(() => {
    if (
      isScheduleOutdated(schedule.parsed_at) ||
      isScheduleOutdatedInternet()
    ) {
      toast({
        title: 'Расписание устарело',
        isClosable: true,
        status: 'info',
        colorScheme: 'infoColor',
        position: 'top',
        duration: null,
      });
    }
  }, [schedule.parsed_at, toast]);

  useEffect(() => {
    if (!backgroundTasks) return;

    const getStatuses = () => {
      backgroundTasks.map((task) => {
        if (task.status !== 'SUCCESS' && task.status !== 'FAILED') {
          getBackgroundTaskStatus(task.id, task.name);
        }
      });
    };

    const isSomeNotEnded = backgroundTasks.some(
      (task) =>
        task.status === 'PENDING' ||
        task.status === 'STARTED' ||
        task.status === 'IDLE'
    );

    //eslint-disable-next-line
    let intervalId: any;

    if (userAuthStatus === 'success' && isSomeNotEnded) {
      intervalId = setInterval(() => {
        getStatuses();
      }, 2000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [backgroundTasks, userAuthStatus, getBackgroundTaskStatus]);

  return (
    <Box h={'100dvh'}>
      <Outlet />
      <UiNavbar navbarActions={NavbarActions} />
      <PWABadge />
    </Box>
  );
}
