import { useDisclosure } from '@chakra-ui/react';
import { useCallback } from 'react';

export const useDrawerDisclosure = () => {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const memoizedOnClose = useCallback(() => onClose(), []);
  const memoizedOnOpen = useCallback(() => onOpen(), []);
  const memoizedOnToggle = useCallback(() => onToggle(), []);
  return {
    isOpen,
    onOpen: memoizedOnOpen,
    onClose: memoizedOnClose,
    onToggle: memoizedOnToggle,
  };
};
