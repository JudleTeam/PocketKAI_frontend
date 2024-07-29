import { useDrawerCloseEvent } from '@/shared/lib';
import { Drawer, DrawerOverlay } from '@chakra-ui/react';
import { ReactNode } from 'react';

export function UiDrawer({
  drawerActions,
  isOpen,
  onClose,
  btnRef,
}: {
  drawerActions: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  btnRef: React.RefObject<HTMLButtonElement>;
}) {
  useDrawerCloseEvent(onClose, isOpen);
  return (
    <Drawer
      placement="bottom"
      isOpen={isOpen}
      onClose={onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      {drawerActions}
    </Drawer>
  );
}
