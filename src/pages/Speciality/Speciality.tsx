import { useGroup } from '@/entities';
import { Box, Text } from '@chakra-ui/react';
import { useChakra, useColorModeValue } from '@chakra-ui/react';
import { getSpecialtyDetails } from './lib/getSpecialtyDetails';
import { AccountTabHeader } from '@/shared/lib';
export function Speciality() {
  const { homeGroup } = useGroup();
  const { theme } = useChakra();
  const mainTextColor = useColorModeValue('light.main_text', 'dark.main_text');
  const secondElementColor = useColorModeValue(
    'light.second_element',
    'dark.second_element'
  );
  const card = useColorModeValue(
    theme.colors.light.card,
    theme.colors.dark.card
  );

  const specialityDetails = getSpecialtyDetails(homeGroup);
  return (
    <Box display="flex" flexDirection="column" gap="20px">
      <AccountTabHeader color={mainTextColor}>Специальность</AccountTabHeader>
      <Box
        bgColor={card}
        borderRadius="8px"
        padding="10px"
        display="flex"
        flexDirection="column"
        gap="10px"
        fontWeight="medium"
      >
        {specialityDetails.map((detail) => (
          <Box key={detail.label}>
            <Text color={secondElementColor}>{detail.label}</Text>
            <Text color={mainTextColor} fontSize="18px">
              {detail.value}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
