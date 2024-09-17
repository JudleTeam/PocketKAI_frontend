import { Box, Button, Text } from '@chakra-ui/react';
import { UiModal } from '../ui-modal/UiModal';
import { AddGroupToFavourite } from '@/features';
import { useColor } from '@/shared/lib';
import { DrawerTrigger, Drawer, DrawerContent } from '../drawer';
import { Auth } from '@/features';
import { useDisclosure } from '@/shared/lib';
import { useDrawerDisclosure } from '../ui-drawer/lib/useDrawerDisclosure';
import { useEffect } from 'react';

export function IdleMessage() {
  const drawer = useDisclosure();
  const {isOpen, onOpen, onClose, onToggle} = useDrawerDisclosure()
  const { mainTextColor, themeColor, mainColor } = useColor();
  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      if (isOpen) {
        metaThemeColor.setAttribute('content', themeColor);
      } else {
        metaThemeColor.setAttribute('content', mainColor);
      }
    }
  }, [themeColor, mainColor, isOpen, drawer.isOpen]);
  return (
    <Box display="flex" flexDir="column" alignItems="center" gap="10px">
      <Text color={mainTextColor}>Добро пожаловать!</Text>
      <Box>
        <Button colorScheme="blue" onClick={onOpen}>
          Выберите группу
        </Button>
      </Box>
      <Text color={mainTextColor}>или</Text>
      <Box>
        <Drawer open={drawer.isOpen} onOpenChange={drawer.setIsOpen}>
          <DrawerTrigger>
            <Button variant="outline" colorScheme="blue">
              Войдите в аккаунт
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <Auth onClose={drawer.onClose} />
          </DrawerContent>
        </Drawer>
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
