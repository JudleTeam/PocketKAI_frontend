import { Box, Text, Avatar } from '@chakra-ui/react';
import { ArrowIcon } from '@/shared/assets';
import { LessonTypes } from '@/shared/constants';
import { TeacherDrawer } from '../TeacherDrawer/TeacherDrawer';
import React, { memo, useEffect } from 'react';
import { TeacherDisciplineType } from '../../model/types';
import { Drawer, DrawerContent, DrawerTrigger } from '@/shared/ui/drawer';
import { useColor, useDisclosure } from '@/shared/lib';

export const TeacherCard = memo(function TeacherCard({
  disciplineType,
  disciplineName,
  disciplineId,
}: {
  disciplineType: TeacherDisciplineType;
  disciplineName: string;
  disciplineId: string[];
}) {
  const { isOpen, setIsOpen } = useDisclosure();

  const { mainTextColor, themeColor, mainColor, mainElementColor } = useColor();
  useEffect(() => {
    const hashValue = location.hash.slice(1);
    const [teacherId, disciplineHashId] = hashValue.split('&');
    disciplineId.map((id) => {
      if (
        !isOpen &&
        teacherId === disciplineType.teacher?.id &&
        id === disciplineHashId
      ) {
        setIsOpen(true);
      }
    });
  }, [disciplineId, disciplineType.teacher?.id, isOpen, setIsOpen]);
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
          className="flex justify-between items-center py-[10px]"
          id={disciplineType.teacher?.id}
          transition="0.2s"
          _active={{ opacity: 0.5, transition: '0.2s' }}
        >
          <div className="flex items-center gap-[10px]">
            <Avatar bg={mainElementColor} />
            <div>
              <Text color={mainTextColor} fontWeight="medium" fontSize="16px">
                {disciplineType.teacher?.name ?? 'Преподаватель кафедры'}
              </Text>
              <Box
                color={mainTextColor}
                fontWeight="medium"
                fontSize="14px"
                display="flex"
                flexWrap="wrap"
                gap="0 10px"
              >
                {disciplineType.parsed_types
                  ? disciplineType.parsed_types.map((parsed_type) => (
                      <React.Fragment key={parsed_type}>
                        {LessonTypes && LessonTypes[parsed_type]}{' '}
                      </React.Fragment>
                    ))
                  : disciplineType.original_types.map((original_type) => (
                      <React.Fragment key={original_type}>
                        {original_type}{' '}
                      </React.Fragment>
                    ))}
              </Box>
            </div>
          </div>
          <ArrowIcon transform="rotate(90deg)" />
        </Box>
      </DrawerTrigger>
      <DrawerContent>
        <TeacherDrawer
          disciplineName={disciplineName}
          disciplineType={disciplineType}
        />
      </DrawerContent>
    </Drawer>
  );
});
