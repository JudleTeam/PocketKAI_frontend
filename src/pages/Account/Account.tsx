import React, { useEffect } from 'react';
import { Box, Text, Divider } from '@chakra-ui/react';
import { useUser, accountActions, useGroup, useSchedule } from '@/entities';
import { Auth, AuthNotAvailable } from '@/features';
import {
  GraduationCapIcon,
  ProfileIcon,
  ArrowIcon,
  ExitIcon,
} from '@/shared/assets';
import { ACCOUNT_ACTIONS, USER_ACTIONS } from '@/shared/constants';
import styles from './Account.module.scss';
import { Drawer, DrawerContent, DrawerTrigger } from '@/shared/ui/drawer';
import { useColor, useDisclosure } from '@/shared/lib';
export function Account() {
  const { homeGroup } = useGroup();
  const { isOpen, setIsOpen, onClose } = useDisclosure();
  const { user, isLoginEnabled, logout, getIsLoginEnabled } = useUser();
  const { resetGroupState } = useGroup();
  const { resetScheduleState } = useSchedule();

  const {
    mainTextColor,
    tabColor,
    exitButtonColor,
    accountActionsColor,
    themeColor,
    mainColor,
    mainElementColor,
  } = useColor();
  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      if (isOpen) {
        metaThemeColor.setAttribute('content', themeColor);
      } else {
        metaThemeColor.setAttribute('content', mainColor);
      }
    }
  }, [themeColor, mainColor, isOpen]);

  useEffect(() => {
    getIsLoginEnabled();
  }, [getIsLoginEnabled]);
  return (
    <Box className={styles['account']}>
      <Box className={styles['account__header']} bgColor={mainElementColor}>
        {user ? (
          <>
            <Text
              textAlign="center"
              fontSize="24px"
              fontWeight="bold"
              color="#fff"
              w="65%"
            >
              {user.full_name}
            </Text>
            <Text
              w="65%"
              fontSize="18px"
              fontWeight="medium"
              color="#fff"
              textAlign="center"
            >
              {user.status}, {homeGroup?.group_name}
            </Text>
          </>
        ) : (
          <>
            <GraduationCapIcon w="100px" h="100px" color="#fff" />
            <Text fontSize="24px" color="#fff" fontWeight="bold">
              Войдите в аккаунт
            </Text>
          </>
        )}
      </Box>
      <Box className={styles['account__body']}>
        <Box
          className={styles['account__user-actions']}
          bgColor={accountActionsColor}
        >
          {user ? (
            <Box display="flex" flexDirection="column">
              {USER_ACTIONS.map((action, index) => (
                <React.Fragment key={action.label}>
                  {accountActions({
                    tabColor,
                    mainTextColor,
                    action,
                    index,
                    lastIndex: USER_ACTIONS.length - 1,
                  })}
                </React.Fragment>
              ))}
            </Box>
          ) : (
            <Drawer open={isOpen} onOpenChange={setIsOpen}>
              <DrawerTrigger asChild>
                <Box
                  onClick={() => setIsOpen(true)}
                  display="flex"
                  justifyContent="space-between"
                  padding="15px 20px"
                  transition="0.2s"
                  _active={{
                    bgColor: tabColor,
                    transition: '0.2s',
                    borderRadius: '8px',
                  }}
                >
                  <Text
                    as={'span'}
                    display="flex"
                    gap="10px"
                    color={mainTextColor}
                    fontSize="16px"
                    fontWeight="medium"
                  >
                    <ProfileIcon w="24px" h="24px" color="gray.400" />
                    Войти в аккаунт
                  </Text>
                  <ArrowIcon
                    transform="rotate(90deg)"
                    color="gray.400"
                    w="24px"
                    h="24px"
                  />
                </Box>
              </DrawerTrigger>
              <DrawerContent>
                {isLoginEnabled ? (
                  <Auth onClose={onClose} />
                ) : (
                  <AuthNotAvailable />
                )}
              </DrawerContent>
            </Drawer>
          )}
        </Box>
        <Box
          className={styles['account__account-actions']}
          bgColor={accountActionsColor}
          top={user ? '170px' : '80px'}
        >
          {ACCOUNT_ACTIONS.map((action, index) => (
            <React.Fragment key={action.label}>
              {accountActions({
                tabColor,
                mainTextColor,
                action,
                index,
                lastIndex: ACCOUNT_ACTIONS.length - 1,
              })}
            </React.Fragment>
          ))}
          {user && (
            <>
              <Divider w="90%" alignSelf="center" />
              <button
                onClick={() => {
                  logout();
                  resetGroupState();
                  resetScheduleState();
                }}
              >
                <Text
                  as={'span'}
                  padding="15px 20px"
                  display="flex"
                  gap="10px"
                  color={exitButtonColor}
                  fontSize="16px"
                  fontWeight="medium"
                  transition="0.2s"
                  _active={{
                    transition: '0.2s',
                    bgColor: tabColor,
                    borderRadius: '0 0 8px 8px',
                  }}
                >
                  <ExitIcon color="red.400" w="24px" h="24px" />
                  Выйти из аккаунта
                </Text>
              </button>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}
