import { Nullable, UserStudent } from '@/shared';
import { DateTime } from 'luxon';

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
    { label: 'Статус', value: user?.status },
    { label: 'Номер зачётки', value: user?.zach_number },
    { label: 'Пол', value: user?.sex },
    {
      label: 'День рождения',
      value: user.birthday ? getFormattedDate(user.birthday) : '',
    },
    { label: 'Тип обучения', value: user?.competition_type },
    { label: 'Ступень образования', value: user?.edu_level },
    { label: 'Степень', value: user?.edu_qualification },
    { label: 'Электронная почта', value: user?.email },
    { label: 'Форма обучения', value: user?.program_form },
  ];
};
