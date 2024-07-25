import { Modal, ModalOverlay, ModalContent } from '@chakra-ui/react';
import { ReactNode } from 'react';

export function UiModal({
  modalActions,
  isOpen,
  onClose,
}: {
  modalActions: () => ReactNode;
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>{modalActions()}</ModalContent>
    </Modal>
  );
}
