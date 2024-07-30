import { Box, useChakra, useColorModeValue, Text } from '@chakra-ui/react';
import { AccountTabHeader } from '@/shared/lib';
import styles from './Report.module.scss';
export function Report() {
  const { theme } = useChakra();
  const mainColor = useColorModeValue(
    theme.colors.light.main,
    theme.colors.dark.main
  );
  const mainTextColor = useColorModeValue(
    theme.colors.light.main_text,
    theme.colors.dark.main_text
  );
  return (
    <Box className={styles['report']}>
      <Box
        padding="20px 0 0 0"
        position={'sticky'}
        top={'0px'}
        bgColor={mainColor}
        zIndex={'1'}
        boxShadow={`0px 0px 10px 10px ${mainColor}`}
      >
        <AccountTabHeader color={mainTextColor}>
          Сообщение об ошибке
        </AccountTabHeader>
      </Box>
      <Text fontWeight="bold" color={mainTextColor}>
        Служба поддержки -{' '}
        <a
          style={{ textDecoration: 'underline' }}
          href="https://t.me/kai_pup_help"
        >
          @kai_pup_help
        </a>
      </Text>
    </Box>
  );
}
