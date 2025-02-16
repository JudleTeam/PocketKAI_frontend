import { useColorMode } from '@chakra-ui/react';
import { useEffect } from 'react';

export function useMetaThemeColor(
  mainColor: string,
  isOpen?: boolean,
  themeColor?: string
) {
  const { colorMode } = useColorMode();
  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      const colorToSet = isOpen && themeColor ? themeColor : mainColor;
      metaThemeColor.setAttribute('content', colorToSet);
    }
  }, [themeColor, mainColor, isOpen, colorMode]);
}
