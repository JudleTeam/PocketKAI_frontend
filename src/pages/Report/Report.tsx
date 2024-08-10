import {
  Box,
  useChakra,
  useColorModeValue,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { AccountTabHeader } from '@/shared/lib';
import styles from './Report.module.scss';
export function Report() {
  const { theme } = useChakra();
  const { colorMode } = useColorMode();
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
          Форма обратной связи
        </AccountTabHeader>
      </Box>
      <Box
        overflowY={'auto'}
        padding="0 0 50px 0"
        style={{ scrollbarWidth: 'none' }}
      >
        <Box>
          <iframe
            style={{ borderRadius: '8px', overflowY: 'auto' }}
            src={
              colorMode === 'light'
                ? 'https://forms.yandex.ru/cloud/66b65dab84227c1b171b2fc2/?iframe=1'
                : 'https://forms.yandex.ru/cloud/66b790f384227c34e21b2f91/?iframe=1'
            }
            height="100%"
            frameBorder="0"
            width="100%"
            name="ya-form-66b65dab84227c1b171b2fc2"
          ></iframe>
        </Box>
        <Text fontWeight="bold" color={mainTextColor}>
          Или сразу напишите нам -{' '}
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
