import { BackgroundTaskStatus, FetchStatus } from '@/shared';
import { Box, Spinner } from '@chakra-ui/react';
import { ReactNode } from 'react';
export const Loader = ({
  children,
  status,
  idleMessage,
}: React.PropsWithChildren<{
  status: FetchStatus | BackgroundTaskStatus;
  idleMessage: string | ReactNode;
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
          right={0}
          top={'45%'}
          mx={'auto'}
          w={'fit-content'}
          fontSize={'20px'}
        >
          Что-то пошло не так...
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
