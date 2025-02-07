import { Box, Button, Text } from '@chakra-ui/react';
import { useColor } from '@/shared/lib';
import { useDisclosure } from '@/shared/lib';
import { useDrawerDisclosure } from '../ui-drawer/lib/useDrawerDisclosure';
import { useEffect } from 'react';

export function IdleMessage() {
  const drawer = useDisclosure();
  const { isOpen, onOpen } = useDrawerDisclosure();
  const {
    mainTextColor,
    themeColor,
    mainColor,
    modalThemeColor,
    navIconColor,
  } = useColor();

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
      <Button
        color={mainColor}
        fontSize={'16px'}
        fontWeight={'regular'}
        paddingY="5px"
        paddingX="25px"
        borderRadius={24}
        bg={navIconColor}
        _hover={{ bg: navIconColor, boxShadow: 'outline' }}
        _focus={{ bg: navIconColor }}
        onClick={onOpen}
      >
        Выберите группу
      </Button>
    </Box>
  );
}
