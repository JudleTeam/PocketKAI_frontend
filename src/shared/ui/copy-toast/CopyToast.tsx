import { copyToClipboard } from "@/shared/lib";
import { UseToastOptions } from "@chakra-ui/react";
export async function CopyToast(value:string, toast:(options:UseToastOptions) => void ) {
    if (!value) return; 
    try {
      await copyToClipboard(value);
      toast({
        title: 'Скопировано',
        position: 'top',
        duration: 1000,
        status: 'success',
      });
    } catch (error) {
      toast({
        title: 'Не удалось скопировать',
        position: 'top',
        duration: 1000,
        status: 'error',
      });
    }
}
