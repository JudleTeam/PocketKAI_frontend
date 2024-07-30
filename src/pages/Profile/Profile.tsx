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
import styles from './Profile.module.scss';

export function Profile() {
  const { user } = useUser();
  const userDetails = getUserDetails(user);
  const { theme } = useChakra();
  const mainTextColor = useColorModeValue('light.main_text', 'dark.main_text');
  const mainColor = useColorModeValue(
    theme.colors.light.main,
    theme.colors.dark.main
  );
  const secondElementColor = useColorModeValue(
    'light.second_element',
    'dark.second_element'
  );
  const card = useColorModeValue(
    theme.colors.light.card,
    theme.colors.dark.card
  );
  return (
    <Box className={styles['profile']}>
      <Box
        padding="20px 0 0 0"
        position={'sticky'}
        top={'0px'}
        bgColor={mainColor}
        zIndex={'1'}
        boxShadow={`0px 0px 10px 10px ${mainColor}`}
      >
        <AccountTabHeader color={mainTextColor}>Профиль</AccountTabHeader>
      </Box>
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
        padding="10px"
        display="flex"
        flexDirection="column"
        gap="10px"
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
