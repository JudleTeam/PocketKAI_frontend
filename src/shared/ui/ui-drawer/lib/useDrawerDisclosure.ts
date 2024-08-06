import { useDisclosure } from '@chakra-ui/react';
import { useCallback } from 'react';

export const useDrawerDisclosure = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const memoizedOnClose = useCallback(() => onClose(), []);
  const memoizedOnOpen = useCallback(() => onOpen(), []);
  return {
    isOpen,
    onOpen: memoizedOnOpen,
    onClose: memoizedOnClose,
  };
};
