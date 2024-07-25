import React, { useEffect } from 'react';
import { Box, Text, Divider, useDisclosure } from '@chakra-ui/react';
import { useUser, accountActions } from '@/entities';
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
export function Account() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { user, logout } = useUser();
  const handleClick = () => {
    logout();
  };
  useEffect(() => {}, [localStorage.getItem('user-token')]);
  return (
    <Box className={styles['account']}>
      <Box className={styles['account__header']} bgColor="blue.500">
        {user ? (
          <>
            <Text
              textAlign="center"
              fontSize="24px"
              fontWeight="bold"
              color="#fff"
            >
              {user.full_name}
            </Text>
            <Text
              fontSize="18px"
              fontWeight="medium"
              color="#fff"
              textAlign="center"
            >
              {user.status}
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
      <Box className={styles['account__user-actions']}>
        {user ? (
          <Box display="flex" flexDirection="column">
            {USER_ACTIONS.map((action, index) => (
              <React.Fragment key={action.label}>
                {accountActions({
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
              bgColor: 'gray.100',
              transition: '0.2s',
              borderRadius: '8px',
            }}
          >
            <Text
              as={'span'}
              display="flex"
              gap="10px"
              color="blue.900"
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
        position="fixed"
        top={user ? '480px' : '400px'}
      >
        {ACCOUNT_ACTIONS.map((action, index) => (
          <React.Fragment key={action.label}>
            {accountActions({
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
                color="red.900"
                fontSize="16px"
                fontWeight="medium"
                transition="0.2s"
                _active={{
                  transition: '0.2s',
                  bgColor: 'gray.100',
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
      <UiDrawer
        isOpen={isOpen}
        onClose={onClose}
        drawerActions={() => Auth(onClose)}
      />
    </Box>
  );
}
