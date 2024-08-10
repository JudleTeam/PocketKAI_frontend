import { AboutUsIcon } from "../assets/chakraIcons/AboutUsIcon";
import { ProblemIcon } from "../assets/chakraIcons/ProblemIcon";
import { QuestionIcon } from "../assets/chakraIcons/QuestionIcon";
import { SettingsIcon } from "../assets/chakraIcons/SettingsIcon";

export const ACCOUNT_ACTIONS = [
  {
    label: 'Настройки',
    path: 'settings',
    icon: SettingsIcon,
  },
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
    label: 'Обратная связь',
    path: 'report',
    icon: ProblemIcon,
  },
];
