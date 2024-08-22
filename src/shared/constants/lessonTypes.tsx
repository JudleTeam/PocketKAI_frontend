import { Text } from '@chakra-ui/react';

import { LectureIcon } from '@/shared/assets/chakraIcons/LectureIcon';
import { PracticeIcon } from '@/shared/assets/chakraIcons/PracticeIcon';
import { LabIcon } from '@/shared/assets/chakraIcons/LabIcon';
import { PhysEdIcon } from '@/shared/assets/chakraIcons/PhysEdIcon';
import { MilitaryIcon } from '@/shared/assets/chakraIcons/MilitaryIcon';
import { ReactNode } from 'react';
import { Nullable } from '@/shared';
export const LessonTypes: Record<string, Nullable<ReactNode>> = {
  practice: (
    <Text
      as={'span'}
      color="#3182CE"
      display="flex"
      alignItems="center"
      gap="5px"
    >
      <PracticeIcon />
      Практика
    </Text>
  ),
  lecture: (
    <Text
      as={'span'}
      color="#805AD5"
      display="flex"
      alignItems="center"
      gap="5px"
    >
      <LectureIcon />
      Лекция
    </Text>
  ),
  lab_work: (
    <Text
      as={'span'}
      color="#38A169"
      display="flex"
      alignItems="center"
      gap="5px"
    >
      <LabIcon />
      Лаб. работа
    </Text>
  ),
  consult: <Text color="#C05621">Консультация</Text>,
  phys_edu: (
    <Text
      as={'span'}
      color="#46C1C1"
      display="flex"
      alignItems="center"
      gap="5px"
    >
      <PhysEdIcon />
      Спорт
    </Text>
  ),
  course_work: <Text color="#4A5568">Курсовая работа</Text>,
  ind_task: <Text color="#B83280">Индивидуальная работа</Text>,
  military: (
    <Text
      as={'span'}
      color="#C53030"
      display="flex"
      alignItems="center"
      gap="5px"
    >
      <MilitaryIcon />
      Военная кафедра
    </Text>
  ),
  unknown: null,
};
