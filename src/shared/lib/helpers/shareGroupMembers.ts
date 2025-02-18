import { copyToast } from '@/shared/ui/copy-toast/CopyToast';
import { UseToastOptions } from '@chakra-ui/react';
import { UserGroupMember } from '@/shared';

export const shareGroupMembers = (
  data: UserGroupMember[],
  fallbackToast: (options: UseToastOptions) => void,
  groupName?: string,
  isDesktop?: boolean
) => {
  const footer = `\n\n————————————————\n\nОтправлено из PocketKAI: https://pocket-kai.ru`;
  const formattedData = `Группа ${groupName}\n\n${data
    .map(
      (member) =>
        `${member.position}. ${member.full_name} ${member.is_leader ? '(Староста)' : ''
        }`
    )
    .join('\n')}${footer}`;
  if (!navigator.canShare) {
    copyToast(formattedData, fallbackToast);
    return;
  }
  if (isDesktop) {
    copyToast(formattedData, fallbackToast);
    return;
  }

  navigator.share({
    title: 'Расписание',
    text: formattedData,
  });
};
