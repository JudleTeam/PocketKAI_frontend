import { ChakraProvider } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { TourProvider } from '@reactour/tour';
import theme from '../styles/theme';
import { steps } from '../tour/steps';

export const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <TourProvider steps={steps}>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </TourProvider>
  );
};
