import { UiNavbar } from '@/shared/ui/ui-navbar/ui-navbar';
import { Outlet } from 'react-router-dom';
import styles from './RootLayout.module.scss';
import { useChakra, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { useEffect } from 'react';
import { NavbarActions } from '../navbar/NavbarActions';
//import PWABadge from '@/PWABadge';
export function RootLayout() {
  const {theme} = useChakra()
  const themeColor = useColorModeValue(theme.colors.light.main, theme.colors.dark.main);
  const {colorMode} = useColorMode();
 useEffect(() => {
   const metaThemeColor = document.querySelector('meta[name="theme-color"]');
   console.log(colorMode)
   if (metaThemeColor) {
    metaThemeColor.setAttribute('content', themeColor); 
  }
 }, [themeColor,colorMode]);
  return (
    <div className={styles['root-layout']}>
      <Outlet />
      <UiNavbar navbarActions={NavbarActions} />
      {/* <PWABadge /> */}
    </div>
  );
}
