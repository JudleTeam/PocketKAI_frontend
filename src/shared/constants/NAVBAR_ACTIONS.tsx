import { ComponentWithAs, IconProps } from '@chakra-ui/react';
import { ScheduleIcon } from '../assets/chakraIcons/ScheduleIcon';
import { TeachersIcon } from '../assets/chakraIcons/TeachersIcon';
import { BurgerIcon } from '../assets/chakraIcons/BurgerIcon';
type ScheduleView = 'timeline' | 'full';

export type NavbarAction = {
  label?: string;
  path?: string;
  action: boolean;
  icon: ComponentWithAs<'svg', IconProps>;
};

export function getNavbarActions(
  preferencedScheduleView: ScheduleView
): NavbarAction[] {
  return [
    {
      label: 'Расписание',
      path:
        preferencedScheduleView === 'timeline' ? '/schedule' : '/schedule/full',
      icon: ScheduleIcon,
      action: false,
    },
    {
      label: 'Педагоги',
      path: '/teachers',
      icon: TeachersIcon,
      action: false,
    },
    {
      action: true,
      icon: BurgerIcon,
    },
  ];
}
