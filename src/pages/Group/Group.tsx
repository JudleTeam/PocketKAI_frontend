import { useGroup } from '@/entities';
import { Box, Text, useChakra, useColorModeValue } from '@chakra-ui/react';
import { AccountTabHeader } from '@/shared/lib';
import styles from './Group.module.scss';
export function Group() {
  const { theme } = useChakra();
  const { homeGroup } = useGroup();
  const mainTextColor = useColorModeValue('light.main_text', 'dark.main_text');
  const mainColor = useColorModeValue(
    theme.colors.light.main,
    theme.colors.dark.main
  );
  return (
    <Box className={styles['group']}>
      <Box
        padding="20px 0 0 0"
        position={'sticky'}
        top={'0px'}
        bgColor={mainColor}
        zIndex={'1'}
        boxShadow={`0px 0px 10px 10px ${mainColor}`}
      >
        <AccountTabHeader color={mainTextColor}>
          Группа {homeGroup?.group_name}
        </AccountTabHeader>
      </Box>
      <Text>Здесь будут ваши одногруппники</Text>
    </Box>
  );
}
