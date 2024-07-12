import { AccountIcon } from '../assets/icons/AccountIcon';
import { AssignmentIcon } from '../assets/icons/AssignmentIcon';

import { ScheduleIcon } from '../assets/icons/ScheduleIcon';
import { TeachersIcon } from '../assets/icons/TeachersIcon';

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
