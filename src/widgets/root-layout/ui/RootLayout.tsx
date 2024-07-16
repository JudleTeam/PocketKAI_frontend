import { UiNavbar } from '@/shared/ui/ui-navbar/ui-navbar';
import { Outlet } from 'react-router-dom';
import styles from './RootLayout.module.scss';
import { NavbarActions } from '../navbar/NavbarActions';
//import PWABadge from '@/PWABadge';
export function RootLayout() {
  return (
    <div className={styles['root-layout']}>
      <Outlet />
      <UiNavbar navbarActions={NavbarActions} />
      {/* <PWABadge /> */}
    </div>
  );
}
