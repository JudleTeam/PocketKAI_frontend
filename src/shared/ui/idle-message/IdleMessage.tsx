import { Box, Button, Text } from '@chakra-ui/react';
import { UiModal } from '../ui-modal/UiModal';
import { AddGroupToFavourite } from '@/features';
import { useColor } from '@/shared/lib';
import { useDisclosure } from '@/shared/lib';
import { useDrawerDisclosure } from '../ui-drawer/lib/useDrawerDisclosure';
import { useEffect } from 'react';

export function IdleMessage() {
  const drawer = useDisclosure();
  const { isOpen, onOpen, onClose, onToggle } = useDrawerDisclosure();
  const { mainTextColor, themeColor, mainColor, modalThemeColor } = useColor();

  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');

    if (metaThemeColor) {
      if (drawer.isOpen) {
        metaThemeColor.setAttribute('content', themeColor);
      }
      if (isOpen) {
        metaThemeColor.setAttribute('content', modalThemeColor);
      }
      if (!drawer.isOpen && !isOpen) {
        metaThemeColor.setAttribute('content', mainColor);
      }
    }
  }, [themeColor, modalThemeColor, mainColor, drawer.isOpen, isOpen]);

  return (
    <Box display="flex" flexDir="column" alignItems="center" gap="10px">
      <Text color={mainTextColor}>Добро пожаловать!</Text>
      <Box>
        <Button colorScheme="blue" onClick={onOpen}>
          Выберите группу
        </Button>
      </Box>
      <UiModal
        isOpen={isOpen}
        onClose={onClose}
        setIsOpen={onToggle}
        modalActions={() => AddGroupToFavourite(onClose)}
      />
    </Box>
  );
}
