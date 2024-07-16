import { LessonCurrentIcon } from '@/shared/assets/chakraIcons/LessonCurrentIcon';
import { LessonPassedIcon } from '@/shared/assets/chakraIcons/LessonPassedIcon';
import { LessonProblemIcon } from '@/shared/assets/chakraIcons/LessonProblemIcon';
import { LessonUpcomingIcon } from '@/shared/assets/chakraIcons/LessonUpcomingIcon';

export const lessonStateIcons = {
  upcoming: <LessonUpcomingIcon color={'blue.500'} w={6} h={6} />,
  past: <LessonPassedIcon color={'blue.500'} w={6} h={6} />,
  current: <LessonCurrentIcon color={'blue.500'} w={6} h={6} />,
  unknown: <LessonProblemIcon color={'blue.500'} w={6} h={6} />,
};
