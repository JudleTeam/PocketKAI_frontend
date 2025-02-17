import { BackgroundTaskStatus, FetchStatus } from '@/shared';
import { Box, Spinner, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { TryAgainButton } from './components/TryAgainButton';
export const Loader = ({
  children,
  status,
  idleMessage,
  teacherId,
}: React.PropsWithChildren<{
  status: FetchStatus | BackgroundTaskStatus;
  idleMessage: string | ReactNode;
  teacherId?: string;
}>) => {
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
          <Text w='60%'>Что-то пошло не так...</Text>
          <Box>
            <TryAgainButton teacherId={teacherId} />
          </Box>
          <Text w='60%' fontSize={'14px '}>Или сразу напишите нам -{' '}
            <a
              style={{ textDecoration: 'underline' }}
              href="https://t.me/pocket_kai_help"
            >
              @pocket_kai_help
            </a></Text>
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
          <Text w='60%'>Невозможно получить расписание...</Text>
          <Text w='60%' fontSize={'14px '}>Напишите нам и мы решим эту проблему -{' '}
            <a
              style={{ textDecoration: 'underline' }}
              href="https://t.me/pocket_kai_help"
            >
              @pocket_kai_help
            </a></Text>
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
