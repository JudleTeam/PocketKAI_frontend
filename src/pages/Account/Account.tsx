import React, { useEffect } from 'react';
import { Box, Text, Divider, useDisclosure } from '@chakra-ui/react';
import { useUser, accountActions, useGroup } from '@/entities';
import { Auth } from '@/features';
import {
  GraduationCapIcon,
  AccountIcon,
  ArrowIcon,
  ExitIcon,
} from '@/shared/assets';
import { ACCOUNT_ACTIONS, USER_ACTIONS } from '@/shared/constants';
import { UiDrawer } from '@/shared/ui/ui-drawer/UiDrawer';
import styles from './Account.module.scss';
import { useColorModeValue } from '@chakra-ui/react';
export function Account() {
  const { homeGroup, getGroupById, homeGroupStatus } = useGroup();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { user, logout } = useUser();
  const accountActionsColor = useColorModeValue(
    'light.account_actions',
    'dark.account_actions'
  );
  const mainTextColor = useColorModeValue('light.main_text', 'dark.main_text');
  const tab = useColorModeValue('light.tab', 'dark.tab');
  const mainElementColor = useColorModeValue(
    'light.main_element',
    'dark.main_element'
  );
  const exitButtonColor = useColorModeValue(
    'light.exit_button',
    'dark.exit_button'
  );
  const handleClick = () => {
    logout();
  };
  useEffect(() => {
    if (user?.group_id && homeGroupStatus === 'idle') {
      getGroupById(user?.group_id);
    }
  }, [homeGroupStatus, getGroupById, user?.group_id]);
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
      <Box
        className={styles['account__user-actions']}
        bgColor={accountActionsColor}
      >
        {user ? (
          <Box display="flex" flexDirection="column">
            {USER_ACTIONS.map((action, index) => (
              <React.Fragment key={action.label}>
                {accountActions({
                  tab,
                  mainTextColor,
                  action,
                  index,
                  lastIndex: USER_ACTIONS.length - 1,
                })}
              </React.Fragment>
            ))}
          </Box>
        ) : (
          <Box
            display="flex"
            justifyContent="space-between"
            onClick={onOpen}
            padding="15px 20px"
            transition="0.2s"
            _active={{
              bgColor: tab,
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
              <AccountIcon w="24px" h="24px" color="gray.400" />
              Войти в аккаунт
            </Text>
            <ArrowIcon
              transform="rotate(90deg)"
              color="gray.400"
              w="24px"
              h="24px"
            />
          </Box>
        )}
      </Box>
      <Box
        className={styles['account__account-actions']}
        bgColor={accountActionsColor}
        top={user ? '480px' : '400px'}
      >
        {ACCOUNT_ACTIONS.map((action, index) => (
          <React.Fragment key={action.label}>
            {accountActions({
              tab,
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
            <button onClick={() => handleClick()}>
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
                  bgColor: tab,
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
      <Box h='10px' w='100%' position='absolute' top={user ? '755px' : '630px'}></Box>
      <UiDrawer
        isOpen={isOpen}
        onClose={onClose}
        drawerActions={Auth(onClose)}
      />
    </Box>
  );
}
