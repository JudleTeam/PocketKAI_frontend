import { AccountIcon } from '../assets/chakraIcons/AccountIcon';
import { AssignmentIcon } from '../assets/chakraIcons/AssignmentIcon';
import { ScheduleIcon } from '../assets/chakraIcons/ScheduleIcon';
import { TeachersIcon } from '../assets/chakraIcons/TeachersIcon';

export const NAVBAR_ACTIONS = [
  {
    label: 'Расписание',
    path: '/schedule',
    icon: ScheduleIcon,
  },
  {
    label: 'Задания',
    path: '/assignments',
    icon: AssignmentIcon,
  },
  {
    label: 'Преподы',
    path: '/teachers',
    icon: TeachersIcon,
  },
  {
    label: 'Аккаунт',
    path: '/account',
    icon: AccountIcon,
  },
];
