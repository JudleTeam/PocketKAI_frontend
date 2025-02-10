import { HStack } from '@chakra-ui/react';
import { ReactNode } from 'react';
import s from './UiNavbar.module.scss';
import { useColor } from '@/shared';

export function UiNavbar({
  navbarActions,
}: {
  navbarActions: () => ReactNode;
}) {
  const { mainColor } = useColor();
  return (
    <HStack
      className={s.root}
      backgroundColor={mainColor}
      style={{ boxShadow: `0 0 10px 10px ${mainColor}` }}
    >
      {navbarActions()}
    </HStack>
  );
}
