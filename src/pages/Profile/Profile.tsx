import { useUser } from '@/entities';
import {
  Box,
  Text,
  useChakra,
  useColorModeValue,
  Avatar,
} from '@chakra-ui/react';
import { getUserDetails } from './lib/getUserDetails';
import { AccountTabHeader } from '@/shared/lib';

export function Profile() {
  const { user } = useUser();
  const userDetails = getUserDetails(user);
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
  return (
    <Box display="flex" flexDirection="column" gap="20px">
      <AccountTabHeader color={mainTextColor}>Профиль</AccountTabHeader>
      <Box
        w="100%"
        display="flex"
        justifyContent="space-between"
        gap="20px"
        alignItems="center"
      >
        <Avatar />
        <Text color={mainTextColor} fontSize="20px" fontWeight="bold">
          {user?.full_name}
        </Text>
      </Box>
      <Box
        bgColor={card}
        borderRadius="8px"
        padding="15px 20px"
        display="flex"
        flexDirection="column"
        gap="15px"
        fontWeight="medium"
      >
        {userDetails.map((detail) => (
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
