import { Box, Button, Text } from '@chakra-ui/react';
import { useColor, useMetaThemeColor } from '@/shared/lib';
import { useDisclosure } from '@/shared/lib';
import { Dialog, DialogHeader, DialogTrigger, DialogContent } from '../modal';
import { AddGroupToFavourite } from '@/features';

export function IdleMessage() {
  const { isOpen, setIsOpen, onClose } = useDisclosure();
  const { mainTextColor, mainColor, themeColor, navIconColor } = useColor();

  useMetaThemeColor(mainColor, isOpen, themeColor);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Box display="flex" flexDir="column" alignItems="center" gap="10px">
        <Text color={mainTextColor}>Добро пожаловать!</Text>
        <Button
          as={DialogTrigger}
          color={mainColor}
          fontSize={'16px'}
          fontWeight={'regular'}
          paddingY="5px"
          paddingX="25px"
          borderRadius={24}
          bg={navIconColor}
          _hover={{ bg: navIconColor, boxShadow: 'outline' }}
          _focus={{ bg: navIconColor }}
        >
          Выберите группу
        </Button>
        <DialogContent className="sbg-l-main dark:bg-d-main rounded-xl">
          <DialogHeader>
            <Text
              color={mainTextColor}
              fontWeight={'semibold'}
              fontSize={'large'}
              textAlign={'start'}
            >
              Выбор группы
            </Text>
          </DialogHeader>
          <AddGroupToFavourite onClose={onClose} />
        </DialogContent>
      </Box>
    </Dialog>
  );
}
