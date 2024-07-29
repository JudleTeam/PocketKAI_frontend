import { Group, Nullable } from '@/shared';

export const getSpecialtyDetails = (group: Nullable<Group>) => {
  if (!group) {
    return [];
  }
  return [
    { label: 'Профиль', value: group?.profile?.name },
    { label: 'Код специальности', value: group?.speciality?.code },
    { label: 'Кафедра', value: group?.department?.name },
    { label: 'Институт', value: group?.institute?.name },
  ];
};
