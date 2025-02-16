import { Modal, ModalOverlay, ModalContent } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { useDrawerPopstateClose } from '@/shared/lib';

export function UiModal({
  modalActions,
  isOpen,
  onClose,
  setIsOpen,
}: {
  modalActions: () => ReactNode;
  isOpen: boolean;
  onClose: () => void;
  setIsOpen: () => void;
}) {
  useDrawerPopstateClose(isOpen, setIsOpen);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>{modalActions()}</ModalContent>
    </Modal>
  );
}
