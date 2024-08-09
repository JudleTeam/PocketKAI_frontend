import {
  Box,
  Text,
  Divider,
  Avatar,
  useColorModeValue,
  useChakra,
} from '@chakra-ui/react';
import { ArrowIcon } from '@/shared/assets';
import { Teacher } from '@/shared';
import { UiDrawer } from '@/shared/ui/ui-drawer/UiDrawer';
import { useDisclosure } from '@chakra-ui/react';

import { useEffect } from 'react';
import { SearchedTeacherDrawer } from '../SearchedTeacherDrawer/SearchedTeacherDrawer';

export function SearchedTeacherCard({ teacher }: { teacher: Teacher }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const mainTextColor = useColorModeValue('light.main_text', 'dark.main_text');
  const mainElementColor = useColorModeValue(
    'light.main_element',
    'dark.main_element'
  );
  const themeColor = useColorModeValue('#858585', '#0E1117');
  const { theme } = useChakra();
  const mainColor = useColorModeValue(
    theme.colors.light.main,
    theme.colors.dark.main
  );
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

  return (
    <>
      <Box>
        <Box
          onClick={onOpen}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          padding="10px 0"
        >
          <Box display="flex" gap="10px" alignItems="center">
            <Avatar bg={mainElementColor} />
            <Box>
              <Text color={mainTextColor} fontWeight="medium" fontSize="14px">
                {teacher?.name}
              </Text>
              <Box fontSize="14px"></Box>
            </Box>
          </Box>
          <ArrowIcon transform="rotate(90deg)"></ArrowIcon>
        </Box>
        <Divider />
      </Box>
      <UiDrawer
        isOpen={isOpen}
        onClose={onClose}
        drawerActions={<SearchedTeacherDrawer teacher={teacher} />}
      />
    </>
  );
}
