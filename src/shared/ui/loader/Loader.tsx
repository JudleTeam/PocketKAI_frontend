import {
  AnalyticsEvent,
  BackgroundTaskStatus,
  ClickSource,
  FetchStatus,
} from '@/shared';
import { Box, Spinner, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { TryAgainButton } from './components/TryAgainButton';
import { useYaMetrika } from '@/entities';
export const Loader = ({
  children,
  status,
  idleMessage,
  isSearch,
  teacherId,
}: React.PropsWithChildren<{
  status: FetchStatus | BackgroundTaskStatus;
  idleMessage: string | ReactNode;
  isSearch?: boolean;
  teacherId?: string;
}>) => {
  const { sendEvent } = useYaMetrika();
  switch (status) {
    case 'loading':
    case 'PENDING':
    case 'STARTED':
      return (
        <Box
          pos={'absolute'}
          zIndex={2}
          left={0}
          right={0}
          top={'45%'}
          mx={'auto'}
          w={'fit-content'}
          fontSize={'20px'}
        >
          <Spinner size={'xl'} />
        </Box>
      );
    case 'error':
    case 'FAILED':
      return (
        <Box
          pos={'absolute'}
          zIndex={2}
          left={0}
          top={'40%'}
          w={'100%'}
          fontSize={'18px'}
          textAlign={'center'}
          display={'flex'}
          justifyContent={'center'}
          flexDir={'column'}
          alignItems={'center'}
          gap={'20px'}
        >
          <Text w="60%">Что-то пошло не так...</Text>
          <Box>
            {!isSearch ? (
              <TryAgainButton teacherId={teacherId} />
            ) : (
              <Text>Попробуйте позже</Text>
            )}
          </Box>
          <Text w="60%" fontSize={'14px '}>
            Или сразу напишите нам -{' '}
            <a
              onClick={() => {
                sendEvent(AnalyticsEvent.feedbackGoToTg, {
                  click_source: ClickSource.mainButton,
                });
              }}
              style={{ textDecoration: 'underline' }}
              href="https://t.me/pocket_kai_help"
              target="_blank"
            >
              @pocket_kai_help
            </a>
          </Text>
        </Box>
      );

    case 'cantGetSchedule':
      return (
        <Box
          pos={'absolute'}
          zIndex={2}
          left={0}
          top={'45%'}
          w={'100%'}
          fontSize={'18px'}
          textAlign={'center'}
          display={'flex'}
          justifyContent={'center'}
          flexDir={'column'}
          alignItems={'center'}
          gap={'20px'}
        >
          <Text w="60%">Невозможно получить расписание...</Text>
          <Text w="60%" fontSize={'14px '}>
            Напишите нам и мы решим эту проблему -{' '}
            <a
              onClick={() => {
                sendEvent(AnalyticsEvent.feedbackGoToTg, {
                  click_source: ClickSource.mainButton,
                });
              }}
              style={{ textDecoration: 'underline' }}
              href="https://t.me/pocket_kai_help"
              target="_blank"
            >
              @pocket_kai_help
            </a>
          </Text>
        </Box>
      );
    case 'idle':
    case 'IDLE':
      return (
        <Box
          pos={'absolute'}
          zIndex={2}
          left={0}
          right={0}
          top={'30%'}
          mx={'auto'}
          w={'fit-content'}
          fontSize={'20px'}
        >
          {idleMessage}
        </Box>
      );
    case 'success':
    case 'SUCCESS':
      return children;
    default:
      return null;
  }
};
