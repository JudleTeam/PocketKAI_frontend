import { AboutUsIcon } from '../assets/chakraIcons/AboutUsIcon';
import { ProblemIcon } from '../assets/chakraIcons/ProblemIcon';
import { QuestionIcon } from '../assets/chakraIcons/QuestionIcon';
import { SettingsIcon } from '../assets/chakraIcons/SettingsIcon';
import { HideIcon } from '../assets/chakraIcons/HideIcon';
import { ExamsIcon } from '../assets/chakraIcons/ExamsIcon';
import { CalendarIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { TimeLineIcon } from '../assets/chakraIcons/TimeLineIcon';
import { TelegramIcon } from '../assets/chakraIcons/TelegramIcon';
import { NotesIcon } from '../assets';

export const scheduleActions = [
  {
    label: 'Экзамены',
    path: 'schedule/exams',
    icon: ExamsIcon,
  },
  {
    label: 'Полное расписание',
    path: 'schedule/full',
    icon: CalendarIcon,
  },
  {
    label: 'Таймлайн',
    path: 'schedule',
    icon: TimeLineIcon,
  },
  {
    label: 'Скрытые пары',
    path: 'hidden',
    icon: HideIcon,
  },
];

export const settingsActions = [
  {
    label: 'Светлая тема',
    icon: SunIcon,
  },
  {
    label: 'Темная тема',
    icon: MoonIcon,
  },

  {
    label: 'Настройки',
    path: 'settings',
    icon: SettingsIcon,
  },
  { label: 'Заметки', path: 'notes', icon: NotesIcon },
  {
    label: 'Частые вопросы',
    path: 'faq',
    icon: QuestionIcon,
  },
  {
    label: 'О нас',
    path: 'about',
    icon: AboutUsIcon,
  },
  {
    label: 'Telegram',
    path: 'https://t.me/pocket_kai',
    icon: TelegramIcon,
  },
  {
    label: 'Обратная связь',
    path: 'report',
    icon: ProblemIcon,
  },
];
