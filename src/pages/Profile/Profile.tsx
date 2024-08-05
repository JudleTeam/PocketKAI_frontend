import { useUser } from '@/entities';
import React from 'react';
import {
  Box,
  Text,
  useChakra,
  useColorModeValue,
  Avatar,
  Divider,
} from '@chakra-ui/react';
import { getUserDetails } from './lib/getUserDetails';
import { AccountTabHeader } from '@/shared/lib';
import styles from './Profile.module.scss';

export function Profile() {
  const { user } = useUser();
  const userDetails = getUserDetails(user);
  const { theme } = useChakra();
  const mainTextColor = useColorModeValue('light.main_text', 'dark.main_text');
  const mainElement = useColorModeValue(
    theme.colors.light.main_element,
    theme.colors.dark.main_element
  );
  const mainColor = useColorModeValue(
    theme.colors.light.main,
    theme.colors.dark.main
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
        h="200px"
        display="flex"
        flexDirection="column"
        gap="20px"
        alignItems="center"
        bgColor={card}
        borderRadius="8px"
        position="relative"
      >
        <Box
          h="40%"
          w="100%"
          bgColor={mainElement}
          borderRadius="8px 8px 0 0"
        ></Box>
        <Avatar
          position="absolute"
          top="35%"
          left="50%"
          transform="translate(-50%, -50%)"
        />
        <Box
          w="100%"
          h="60%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Text
            w="80%"
            textAlign="center"
            color={mainTextColor}
            fontSize="20px"
            fontWeight="bold"
          >
            {user?.full_name}
          </Text>
          <Text fontWeight="medium" color={mainTextColor}>
            {user?.status}
          </Text>
        </Box>
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
        {userDetails.map((detail, index) => {
          const Icon = detail.icon;
          return (
            <React.Fragment key={detail.label}>
              <Box
                flexWrap="wrap"
                display="flex"
                justifyContent="space-between"
              >
                <Box display="flex" gap="5px" alignItems="center">
                  <Icon color={'gray.500'}/>
                  <Text color={'gray.500'} fontSize="14px">
                    {detail.label}
                  </Text>
                </Box>
                <Text color={mainTextColor} fontSize="14px">
                  {detail.value}
                </Text>
              </Box>
              <Divider
                display={userDetails.length - 1 === index ? 'none' : 'block'}
              ></Divider>
            </React.Fragment>
          );
        })}
      </Box>
    </Box>
  );
}
