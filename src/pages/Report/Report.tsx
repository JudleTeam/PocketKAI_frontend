import { Box, Text, useBreakpointValue, useColorMode } from '@chakra-ui/react';
import { AccountTabHeader, useColor, useMetaThemeColor } from '@/shared/lib';
import styles from './Report.module.scss';

export function Report() {
  const { colorMode } = useColorMode();
  const { mainColor, primaryColor } = useColor();

  useMetaThemeColor(mainColor);
  const isDesktop = useBreakpointValue({ base: false, md: true });
  return (
    <Box className={styles['report']} style={isDesktop ? { width: '40%' } : {}}>
      <Box
        padding="20px 0 0 0"
        position={'sticky'}
        top={'0px'}
        bgColor={mainColor}
        zIndex={'1'}
        boxShadow={`0px 0px 10px 10px ${mainColor}`}
      >
        <AccountTabHeader color={primaryColor}>
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
                ? 'https://forms.yandex.ru/cloud/66b65dab84227c1b171b2fc2/?iframe=1&version=2.0.0-hotfix'
                : 'https://forms.yandex.ru/cloud/66b790f384227c34e21b2f91/?iframe=1&version=2.0.0-hotfix'
            }
            height="100%"
            frameBorder="0"
            width="100%"
            name="ya-form-66b65dab84227c1b171b2fc2"
          ></iframe>
        </Box>
        <Text pt="10px" fontWeight="bold" color={primaryColor}>
          Или сразу напишите нам -{' '}
          <a
            style={{ textDecoration: 'underline' }}
            href="https://t.me/pocket_kai_help"
            target="_blank"
          >
            @pocket_kai_help
          </a>
        </Text>
      </Box>
    </Box>
  );
}
