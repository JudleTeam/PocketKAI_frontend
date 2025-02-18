import { Box, Button, Text } from '@chakra-ui/react';

import { useColor, useDisclosure, useMetaThemeColor } from '@/shared/lib';
import { useYaMetrika } from '@/entities';
import { AddGroupToFavourite } from '@/features';
import { Link } from 'react-router-dom';
import { useSettings } from '@/entities';
import { AnalyticsEvent, ClickSource } from '@/shared';

import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '../modal';

export function IdleMessage() {
  const { isOpen, setIsOpen, onClose } = useDisclosure();
  const { fullScheduleView } = useSettings()
  const { primaryColor, mainColor, themeColor, accentColor, secondaryDayNameColor } = useColor();
  const isTeacherOrFull = location.pathname === '/teachers' || (fullScheduleView === 'week' && location.pathname === '/schedule/full')
  const { sendEvent } = useYaMetrika();
  useMetaThemeColor(mainColor, isOpen, themeColor);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Box position={'fixed'} top={isTeacherOrFull ? '24dvh' : '40dvh'} transform={'translate(-50%, 0)'} w={'100%'} display="flex" flexDir="column" alignItems="center" gap="10dvh">
        <Box display="flex" flexDir="column" alignItems="center" gap="5px">
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
        </Box>
        <Box display="flex" flexDir="column" alignItems="center" gap="5px">
          <Text color={secondaryDayNameColor} textAlign={'center'} fontSize={'18px'} w='75%'>Также следите за новостями в Telegram-канале:</Text>
          <Text as={Link} to='https://t.me/pocket_kai' target='_blank' fontSize={'18px'} color={accentColor} textDecor={'underline'}>PocketKAI</Text>
        </Box>
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
