import { Box, Text, Divider, Avatar } from '@chakra-ui/react';
import { ArrowIcon } from '@/shared/assets';
import { Teacher } from '@/shared';
import { Drawer, DrawerContent, DrawerTrigger } from '@/shared/ui/drawer';
import { useEffect } from 'react';
import { SearchedTeacherDrawer } from '../SearchedTeacherDrawer/SearchedTeacherDrawer';
import { useColor, useDisclosure } from '@/shared/lib';

export function SearchedTeacherCard({ teacher }: { teacher: Teacher }) {
  const { isOpen, setIsOpen } = useDisclosure();
  const { mainTextColor, themeColor, mainColor, mainElementColor } = useColor();
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
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Box
          onClick={() => setIsOpen(true)}
          transition="0.1s"
          _active={{ opacity: 0.5, transition: '0.1s' }}
        >
          <Box
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
      </DrawerTrigger>
      <DrawerContent>
        <SearchedTeacherDrawer teacher={teacher} />
      </DrawerContent>
    </Drawer>
  );
}
