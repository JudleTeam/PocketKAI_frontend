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
      <Box overflowY={'auto'} padding='0 0 50px 0' style={{scrollbarWidth:'none'}}>
       <Box>
       <iframe
          style={{ borderRadius: '8px', overflowY: 'auto' }}
          src="https://forms.yandex.ru/cloud/66b65dab84227c1b171b2fc2/?iframe=1&theme=%23000000"
           height="100%"
          frameBorder="0"
          width="100%"
          name="ya-form-66b65dab84227c1b171b2fc2"
        ></iframe>
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
    </Box>
  );
}
