import { useDrawerCloseEvent } from './lib/useDrawerCloseEvent';
import {
  Box,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { memo, ReactNode, useMemo, useState } from 'react';

export const UiDrawer = memo(function UiDrawer({
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
  const [currentHeight, setCurrentHeight] = useState(80);

  return (
    <Drawer placement="bottom" isOpen={isOpen} onClose={onClose}>
      <DrawerOverlay />
      <MotionDrawerContent
        as={MotionBox}
        pos={'fixed'}
        minH="70%"
        minW="100%"
        h={`${currentHeight}vh`}
        maxH="calc(100vh + 20px)"
        bottom="-20px"
        borderRadius="16px 16px 0 0"
        display="flex"
        flex={1}
        flexDirection="column"
        alignItems="center"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        drag="y"
        dragConstraints={{ bottom: 0, top: 0 }}
        dragElastic={0.1}
        transition={{
          duration: 0.2,
          ease: 'easeInOut',
          bounce: 0.25,
        }}
        onDragEnd={(_, info) => {
          if (info.offset.y > 100) {
            onClose();
            setCurrentHeight(80);
          } else if (info.offset.y < -100) {
            setCurrentHeight(100);
          }
        }}
        style={{
          transition: 'height 0.2s ease-in-out', // THIS MAKES SMOOTH TRANSITION BETWEEN 80 AND 100 HEIGHT
        }}
      >
        <Box w="20px" minH="3px" h="3px" bgColor="grey" mt={3} />
        <DrawerCloseButton />
        {drawerActions}
      </MotionDrawerContent>
    </Drawer>
  );
})
