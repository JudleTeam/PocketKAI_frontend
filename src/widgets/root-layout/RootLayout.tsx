import { Navbar } from '@/shared/ui/ui-navbar/Navbar';
import { Outlet } from 'react-router-dom';
import styles from './RootLayout.module.scss';
import { NavbarActions } from './navbar/NavbarActions';
export function RootLayout() {
  return (
    <div className={styles['root-layout']}>
      <Outlet />
      <Navbar navbarActions={NavbarActions} />
    </div>
  );
}
