import { HStack } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { useColor } from '@/shared';
import cn from 'classnames';
import s from './UiDatebar.module.scss';

export function UiDatebar({
  datebarContent,
  isNotDatebar,
}: {
  datebarContent: ReactNode;
  isNotDatebar: boolean;
}) {
  const { mainColor } = useColor();

  return (
    <HStack
      data-tour="4"
      bgColor={mainColor}
      boxShadow={{
        base: `0px 5px 5px 5px ${mainColor}`,
        md: 'none',
      }}
      className={cn({
        [s.root]: true,
        [s['root-none']]: isNotDatebar,
      })}
    >
      {datebarContent}
    </HStack>
  );
}
