import { ChakraProvider } from '@chakra-ui/react';
import { ReactNode } from 'react';
import theme from '../styles/theme';
import { StyledTourProvider } from '../tour/styledTourProvider';

export const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ChakraProvider theme={theme}>
      <StyledTourProvider>{children}</StyledTourProvider>
    </ChakraProvider>
  );
};
