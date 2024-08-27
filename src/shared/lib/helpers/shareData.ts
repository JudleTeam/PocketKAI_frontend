import { copyToast } from '@/shared/ui/copy-toast/CopyToast';
import { UseToastOptions } from '@chakra-ui/react';

export const shareData = (
  data: string,
  fallbackToast: (options: UseToastOptions) => void
) => {
  if (!navigator.canShare) {
    copyToast(data, fallbackToast);
    return;
  }

  navigator.share({
    title: 'Расписание',
    text: data,
  });
};
