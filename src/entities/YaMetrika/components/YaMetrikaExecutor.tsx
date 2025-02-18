import { useEffect } from 'react';
import { useYaMetrika } from '@/entities';
import { useLocation } from 'react-router-dom';

export const YaMetrikaExecutor = () => {
  const { viewPage } = useYaMetrika();
  const { pathname } = useLocation();
  useEffect(() => {
    console.log(pathname);
    viewPage(window.location.href);
  }, [pathname]);

  return null;
};
