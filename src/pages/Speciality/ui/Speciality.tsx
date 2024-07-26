import { useGroup } from '@/entities';
import { Box, Text } from '@chakra-ui/react';
import { useChakra, useColorModeValue } from '@chakra-ui/react';
export function Speciality() {
  const {homeGroup} = useGroup();
  const { theme } = useChakra();
  const main_text = useColorModeValue('light.main_text', 'dark.main_text');
  const second_element = useColorModeValue(
    'light.second_element',
    'dark.second_element'
  );
  const card = useColorModeValue(
    theme.colors.light.card,
    theme.colors.dark.card
  );

  const specialityDetails = [
    { label: 'Профиль', value: homeGroup?.profile?.name },
    { label: 'Код специальности', value: homeGroup?.speciality?.code },
    { label: 'Кафедра', value: homeGroup?.department?.name },
    { label: 'Институт', value: homeGroup?.institute?.name },
  ];
  return (
    <Box display='flex' flexDirection='column' gap='20px'>
      <Text fontSize='24px' fontWeight='bold' color={main_text}>Специальность</Text>
      <Box  bgColor={card}
    borderRadius="8px"
    padding="10px"
    display="flex"
    flexDirection="column"
    gap="10px"
    fontWeight="medium"
    >
      {specialityDetails.map((detail, index) => (
        <Box key={index}>
          <Text color={second_element}>{detail.label}</Text>
          <Text color={main_text} fontSize='18px'>{detail.value}</Text>
        </Box>
      ))}
    </Box>
    </Box>
  );
}
