import { useGroup, useUser } from '@/entities';
import {
  Box,
  Text,
  useChakra,
  useColorModeValue,
  Divider,
} from '@chakra-ui/react';
import { AccountTabHeader } from '@/shared/lib';
import styles from './Group.module.scss';
import { CrownIcon } from '@/shared/assets/chakraIcons/CrownIcon';
export function Group() {
  const { theme } = useChakra();
  const { homeGroup } = useGroup();
  const { userGroupMembers, user } = useUser();
  const mainTextColor = useColorModeValue(
    theme.colors.light.main_text,
    theme.colors.dark.main_text
  );
  const mainColor = useColorModeValue(
    theme.colors.light.main,
    theme.colors.dark.main
  );
  const blueElement = useColorModeValue(
    theme.colors.light.blue_element,
    theme.colors.dark.blue_element
  );
  return (
    <Box className={styles['group']}>
      <Box
        padding="20px 0 0 0"
        position={'sticky'}
        top={'0px'}
        bgColor={mainColor}
        zIndex={'2'}
        boxShadow={`0px 0px 10px 10px ${mainColor}`}
      >
        <AccountTabHeader color={mainTextColor}>
          Группа {homeGroup?.group_name}
        </AccountTabHeader>
      </Box>
      <Box display="flex" flexDirection="column" gap="10px">
        {userGroupMembers.map((groupMember) => (
          <>
            <Box
              position="relative"
              display="flex"
              alignItems="center"
              gap="10px"
            >
              {groupMember.is_leader ? (
                <CrownIcon
                  position="absolute"
                  top="-5px"
                  zIndex="1"
                  transform="rotate(-23deg)"
                  left="1px"
                  color="yellow.500"
                />
              ) : null}
              <Box
                w="35px"
                h="35px"
                position="relative"
                border={
                  user?.full_name === groupMember.full_name
                    ? `3.5px solid ${blueElement}`
                    : '3px solid #3182ce'
                }
                borderRadius="50%"
              >
                <Text
                  position="absolute"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                  color={
                    user?.full_name === groupMember.full_name
                      ? mainTextColor
                      : mainTextColor
                  }
                  fontWeight="bold"
                >
                  {groupMember.position}
                </Text>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                gap="0px"
              >
                <Text fontWeight="bold" color={mainTextColor}>
                  {groupMember.full_name}
                </Text>
                <Text fontWeight="medium" fontSize="14px" color="gray.500">
                  {groupMember.email}
                </Text>
              </Box>
            </Box>
            <Divider></Divider>
          </>
        ))}
      </Box>
    </Box>
  );
}
