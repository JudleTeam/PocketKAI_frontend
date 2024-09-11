import { BackgroundTaskStatus, FetchStatus } from '@/shared';
import { Box, Spinner } from '@chakra-ui/react';
import React from 'react';

export const BgTasksLoader = ({
  children,
  status,
  hasData,
}: React.PropsWithChildren<{
  status: {
    fetchStatus: FetchStatus;
    backgroundTaskStatus: BackgroundTaskStatus;
  };
  hasData: boolean;
}>) => {
  switch (true) {
    case status.fetchStatus === 'loading' ||
      status.backgroundTaskStatus === 'PENDING' ||
      status.backgroundTaskStatus === 'STARTED' ||
      status.backgroundTaskStatus === 'IDLE':
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
    case (status.backgroundTaskStatus === 'FAILED' ||
      status.fetchStatus === 'error') &&
      !hasData:
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
    case status.fetchStatus === 'success' ||
      status.backgroundTaskStatus === 'SUCCESS':
      return children;

    case status.backgroundTaskStatus === 'IDLE' ||
      status.fetchStatus === 'idle':
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
          {''}
        </Box>
      );
  }
};
