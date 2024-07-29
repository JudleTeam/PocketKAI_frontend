import { useGroup } from '@/entities';
import { Box, Text, useColorModeValue } from '@chakra-ui/react';
export function Group() {
  const { homeGroup } = useGroup();
  const mainTextColor = useColorModeValue('light.main_text', 'dark.main_text');
  return (
    <Box>
      <Text fontSize="24px" fontWeight="bold" color={mainTextColor}>
        Группа
      </Text>
      <Text textAlign="center" color={mainTextColor} fontSize="32px">
        {homeGroup?.group_name} error
      </Text>
      <Text textAlign="center">Раздел находится в разработке</Text>
    </Box>
  );
}
