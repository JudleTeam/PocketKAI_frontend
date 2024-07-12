import { ChakraProvider } from '@chakra-ui/react';

export const AppProvider = ({ children }) => {
  return <ChakraProvider>{children}</ChakraProvider>;
};
