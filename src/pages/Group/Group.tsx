import { useGroup } from '@/entities';
import { Box, Text, useColorModeValue } from '@chakra-ui/react';
export function Group() {
  const { homeGroup } = useGroup();
  const main_text = useColorModeValue('light.main_text', 'dark.main_text');
  return (
    <Box>
      <Text fontSize="24px" fontWeight="bold" color={main_text}>
        Группа
      </Text>
      <Text textAlign="center" color={main_text} fontSize="32px">
        {homeGroup?.group_name} error
      </Text>
      <Text textAlign="center">Раздел находится в разработке</Text>
    </Box>
  );
}
