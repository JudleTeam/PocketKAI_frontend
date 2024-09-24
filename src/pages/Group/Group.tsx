import { useGroup, useUser } from '@/entities';
import {
  Box,
  Text,
  useChakra,
  useColorModeValue,
  Divider,
  useToast,
  Button,
  useBreakpointValue,
} from '@chakra-ui/react';
import { AccountTabHeader } from '@/shared/lib';
import styles from './Group.module.scss';
import { CrownIcon } from '@/shared/assets/chakraIcons/CrownIcon';
import React, { useEffect } from 'react';
import { copyToast } from '@/shared';
import { CopyIcon } from '@chakra-ui/icons';
import { BgTasksLoader } from '@/shared/ui/loader/BgTasksLoader';
import { shareGroupMembers } from '@/shared/lib';
import { Share2Icon } from 'lucide-react';
export function Group() {
  const { theme } = useChakra();
  const { homeGroup } = useGroup();
  const {
    userGroupMembers,
    userGroupMembersStatus,
    user,
    backgroundTasks,
    getGroupMembers,
  } = useUser();
  useEffect(() => {
    const groupMembersBackgroundTaskStatus =
      backgroundTasks.find((task) => task.name === 'group_members')?.status ??
      'IDLE';
    if (
      userGroupMembersStatus === 'idle' &&
      (groupMembersBackgroundTaskStatus === 'SUCCESS' ||
        groupMembersBackgroundTaskStatus === 'FAILED')
    ) {
      getGroupMembers();
    }
  }, [userGroupMembersStatus, backgroundTasks, getGroupMembers]);

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
  const toast = useToast();
  const isDesktop = useBreakpointValue({ base: false, md: true });
  return (
    <Box className={styles['group']}  w={{md: '40%'}}>
      <Box
        padding="20px 0 0 0"
        position={'sticky'}
        top={'0px'}
        bgColor={mainColor}
        zIndex={'2'}
        boxShadow={`0px 0px 20px 20px ${mainColor}`}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <AccountTabHeader color={mainTextColor}>
          Группа {homeGroup?.group_name}
        </AccountTabHeader>
        <Button
          onClick={() =>
            shareGroupMembers(
              userGroupMembers,
              toast,
              homeGroup?.group_name,
              isDesktop
            )
          }
          size="sm"
          variant="ghost"
          color="#3182CE"
          fontSize="16px"
        >
          <Share2Icon />
        </Button>
      </Box>
      <Box
        w="100%"
        style={{ scrollbarWidth: 'none' }}
        overflowY="auto"
        h="90vh"
        padding="10px 0 70px 0"
      >
        <BgTasksLoader
          status={{
            fetchStatus: userGroupMembersStatus,
            backgroundTaskStatus:
              backgroundTasks.find((task) => task.name === 'group_members')
                ?.status ?? 'IDLE',
          }}
          hasData={userGroupMembers.length > 1}
        >
          <Box pt="10px" display="flex" flexDirection="column" gap="10px">
            {userGroupMembers.map((groupMember) => (
              <React.Fragment key={groupMember.id}>
                <Box
                  position="relative"
                  display="flex"
                  alignItems="center"
                  gap="10px"
                  onClick={() => copyToast(groupMember.full_name, toast)}
                  _active={{ opacity: 0.5, transition: '0.2s' }}
                >
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
                    {groupMember.is_leader ? (
                      <CrownIcon
                        position="absolute"
                        top="-14px"
                        left="-2px"
                        zIndex="1"
                        transform="rotate(-23deg)"
                        color="yellow.500"
                      />
                    ) : null}
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
                    w="80%"
                  >
                    <Text fontWeight="bold" w="95%" color={mainTextColor}>
                      {groupMember.full_name}
                    </Text>
                  </Box>
                  <CopyIcon position="absolute" right="0" />
                </Box>
                <Divider />
              </React.Fragment>
            ))}
          </Box>
        </BgTasksLoader>
      </Box>
    </Box>
  );
}
