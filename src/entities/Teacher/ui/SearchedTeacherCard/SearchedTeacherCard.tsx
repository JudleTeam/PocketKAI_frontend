import { Box, Text, Divider, Avatar } from '@chakra-ui/react';
import { ArrowIcon } from '@/shared/assets';
import { Teacher, useMetaThemeColor } from '@/shared';
import { Drawer, DrawerContent, DrawerTrigger } from '@/shared/ui/drawer';
import { useState } from 'react';
import { SearchedTeacherDrawer } from '../SearchedTeacherDrawer/SearchedTeacherDrawer';
import { useColor, useDisclosure } from '@/shared/lib';

export function SearchedTeacherCard({ teacher }: { teacher: Teacher }) {
  const { isOpen, setIsOpen } = useDisclosure();
  const [activeSnapPoint, setActiveSnapPoint] = useState<string | number>(0.8);
  const { primaryColor, themeColor, mainColor, accentColor } = useColor();

  useMetaThemeColor(mainColor, isOpen, themeColor);

  return (
    <Drawer
      open={isOpen}
      onOpenChange={setIsOpen}
      activeSnapPoint={activeSnapPoint}
      setActiveSnapPoint={(newSnapPoint) =>
        setActiveSnapPoint(newSnapPoint ?? 0.8)
      }
    >
      <DrawerTrigger asChild>
        <Box
          cursor={'pointer'}
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
              <Avatar bg={accentColor} />
              <Box>
                <Text
                  color={primaryColor}
                  fontWeight="medium"
                  fontSize={'clamp(14px, 4vw, 18px)'}
                >
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
        <SearchedTeacherDrawer
          teacher={teacher}
          activeSnapPoint={activeSnapPoint}
          setActiveSnapPoint={setActiveSnapPoint}
        />
      </DrawerContent>
    </Drawer>
  );
}
