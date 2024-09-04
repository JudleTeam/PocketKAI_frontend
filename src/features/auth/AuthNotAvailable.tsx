import { useColor } from '@/shared/lib';
import { Box, Icon, Text } from '@chakra-ui/react';
import { DoorOpen } from 'lucide-react';
export function AuthNotAvailable() {
  const { mainElementColor } = useColor();
  return (
    <Box
      px={10}
      w={'100%'}
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      textAlign={'center'}
      gap={'10px'}
    >
      <Box w={'120px'}>
        <Icon as={DoorOpen} w={'100%'} h={'100%'} color={mainElementColor} />
      </Box>
      <Text fontSize={'24px'}>Ведём переговоры с КАИ...</Text>
      <Text fontSize={'18px'}>
        Как только получим добро от КАИ, сразу включим вход и сделаем пост в
        Telegram канале, так что подписывайся!
      </Text>
      <a className="underline" target="_blank" href="https://t.me/pocket_kai">
        Телеграм-канал Pocket KAI
      </a>
    </Box>
  );
}
