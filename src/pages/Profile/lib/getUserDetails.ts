import { Nullable, UserStudent } from '@/shared';
import { DateTime } from 'luxon';
import { NumberIcon } from '@/shared/assets/chakraIcons/NumberIcon';
import { BirthdayIcon } from '@/shared/assets/chakraIcons/BirthdayIcon';
import { GenderIcon } from '@/shared/assets/chakraIcons/GenderIcon';
import { TeachersIcon } from '@/shared/assets';
import { MailIcon } from '@/shared/assets/chakraIcons/MailIcon';
import { StepEducationIcon } from '@/shared/assets/chakraIcons/StepEducation';
import { TypeEducationIcon } from '@/shared/assets/chakraIcons/TypeEducationIcon';
import { FormEducationIcon } from '@/shared/assets/chakraIcons/FormEducationIcon';

const getFormattedDate = (date:string) => {
  const formattedDate = DateTime.fromISO(date)
  .setLocale('ru')
  .toFormat('dd MMMM yyyy');
return formattedDate
}

export const getUserDetails = (user: Nullable<UserStudent>) => {
  if (!user) {
    return [];
  }
  return [
    { icon: NumberIcon, label: 'Номер зачётки', value: user?.zach_number },
    { icon: GenderIcon,label: 'Пол', value: user?.sex },
    {
      icon: BirthdayIcon, label: 'День рождения',
      value: user.birthday ? getFormattedDate(user.birthday) : '',
    },
    { icon: TypeEducationIcon, label: 'Тип обучения', value: user?.competition_type },
    { icon: StepEducationIcon, label: 'Ступень образования', value: user?.edu_level },
    { icon: TeachersIcon, label: 'Степень', value: user?.edu_qualification },
    { icon: MailIcon, label: 'Почта', value: user?.email },
    { icon: FormEducationIcon, label: 'Форма обучения', value: user?.program_form },
  ];
};
