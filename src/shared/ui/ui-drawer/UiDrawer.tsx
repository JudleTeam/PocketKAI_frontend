import { useDrawerCloseEvent } from './lib/useDrawerCloseEvent';
import {
  Box,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { ReactNode, useMemo } from 'react';

export function UiDrawer({
  drawerActions,
  isOpen,
  onClose, // THIS SHOULD ALWAYS BE MEMOIZED!!! use the useDrawerDisclosure hook
}: {
  drawerActions: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}) {
  useDrawerCloseEvent(onClose, isOpen); // this hook must be here to prevent router mess on back button press
  const MotionDrawerContent = useMemo(() => motion(DrawerContent), []);
  const MotionBox = useMemo(() => motion(Box), []);
  return (
    <Drawer placement="bottom" isOpen={isOpen} onClose={onClose}>
      <DrawerOverlay />
      <MotionDrawerContent
        as={MotionBox}
        pos={'fixed'}
        minH="70vh"
        minW="100%"
        maxH="90%"
        bottom="0"
        borderRadius="16px 16px 0 0"
        display="flex"
        flex={1}
        flexDirection="column"
        alignItems="center"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{
          duration: 0.3,
          ease: 'easeInOut',
          bounce: 0.25,
        }}
        drag="y"
        dragConstraints={{ bottom: 0, top: 0 }}
        dragElastic={0.1}
        onDragEnd={(_, info) => {
          if (info.offset.y > 100) {
            onClose();
          }
        }}
      >
        <Box w="20px" h="3px" bgColor="grey" mt={3} />
        <DrawerCloseButton />
        {drawerActions}
      </MotionDrawerContent>
    </Drawer>
  );
}
