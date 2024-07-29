import { useDrawerCloseEvent } from '@/shared/lib';
import { Drawer, DrawerOverlay } from '@chakra-ui/react';
import { ReactNode } from 'react';

export function UiDrawer({
  drawerActions,
  isOpen,
  onClose,
}: {
  drawerActions: () => ReactNode;
  isOpen: boolean;
  onClose: () => void;
}) {
  useDrawerCloseEvent(onClose, isOpen);
  return (
    <Drawer placement="bottom" isOpen={isOpen} onClose={onClose}>
      <DrawerOverlay/>
      {drawerActions()}
    </Drawer>
  );
}
