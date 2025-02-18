import { Box, Button, Text } from '@chakra-ui/react';

import { useColor, useDisclosure, useMetaThemeColor } from '@/shared/lib';
import { useYaMetrika } from '@/entities';
import { AddGroupToFavourite } from '@/features';
import { AnalyticsEvent, ClickSource } from '@/shared';

import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '../modal';

export function IdleMessage() {
  const { isOpen, setIsOpen, onClose } = useDisclosure();
  const { primaryColor, mainColor, themeColor, accentColor } = useColor();
  const { sendEvent } = useYaMetrika();

  useMetaThemeColor(mainColor, isOpen, themeColor);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Box display="flex" flexDir="column" alignItems="center" gap="10px">
        <Text color={primaryColor}>Добро пожаловать!</Text>
        <Button
          as={DialogTrigger}
          onClick={() => {
            sendEvent(AnalyticsEvent.mainModalOpen, { click_source: ClickSource.mainButton });
          }}
          color={mainColor}
          fontSize={'16px'}
          fontWeight={'medium'}
          paddingY="5px"
          paddingX="25px"
          borderRadius={24}
          bg={accentColor}
          _hover={{ bg: accentColor, boxShadow: 'outline' }}
          _focus={{ bg: accentColor }}
        >
          Выберите группу
        </Button>
        <DialogContent className="sbg-l-main dark:bg-d-main rounded-xl">
          <DialogHeader>
            <Text
              color={primaryColor}
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
