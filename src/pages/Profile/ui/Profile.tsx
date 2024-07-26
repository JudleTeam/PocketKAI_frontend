import { useUser } from '@/entities';
import {
  Box,
  Text,
  useChakra,
  useColorModeValue,
  Avatar,
} from '@chakra-ui/react';
import { DateTime } from 'luxon';
export function Profile() {
  const { user } = useUser();
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
  let getFormattedDate;
  if (user?.birthday) {
    getFormattedDate = DateTime.fromISO(user?.birthday)
      .setLocale('ru')
      .toFormat('dd MMMM yyyy');
  }
  const userDetails = [
    { label: 'Статус', value: user?.status },
    { label: 'Номер зачётки', value: user?.zach_number },
    { label: 'Пол', value: user?.sex },
    { label: 'Год рождения', value: getFormattedDate },
    { label: 'Тип обучения', value: user?.competition_type },
    { label: 'Ступень образования', value: user?.edu_level },
    { label: 'Степень', value: user?.edu_qualification },
    { label: 'Электронная почта', value: user?.email },
    { label: 'Форма обучения', value: user?.program_form },
  ];
  return (
    <Box display="flex" flexDirection="column" gap="20px">
      <Box
        w="100%"
        display="flex"
        justifyContent="space-between"
        gap="20px"
        alignItems="center"
      >
        <Avatar />
        <Text color={main_text} fontSize="20px" fontWeight="bold">
          {user?.full_name}
        </Text>
      </Box>
      <Box
        bgColor={card}
        borderRadius="8px"
        padding="10px"
        display="flex"
        flexDirection="column"
        gap="10px"
        fontWeight="medium"
      >
        {userDetails.map((detail, index) => (
          <Box key={index}>
            <Text color={second_element}>{detail.label}</Text>
            <Text color={main_text} fontSize="20px">
              {detail.value}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
