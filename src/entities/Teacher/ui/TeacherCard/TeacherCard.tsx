import { Box, Text, Avatar } from '@chakra-ui/react';
import { ArrowIcon } from '@/shared/assets';
import { LessonTypes } from '@/shared/constants';
import { TeacherDrawer } from '../TeacherDrawer/TeacherDrawer';
import React, { memo, useEffect, useState } from 'react';
import { Drawer, DrawerContent, DrawerTrigger } from '@/shared/ui/drawer';
import { useColor, useDisclosure } from '@/shared/lib';
import { TeachersType, useMetaThemeColor } from '@/shared';
import { useTeachers } from '../../model/teacher.store';

export const TeacherCard = memo(function TeacherCard({
  disciplineInfo,
}: {
  disciplineInfo: TeachersType;
}) {
  const { disciplineId, teacher, parsed_types, original_types } =
    disciplineInfo;
  const { isOpen, setIsOpen } = useDisclosure();
  const { clearTeacherSchedule } = useTeachers()
  const [activeSnapPoint, setActiveSnapPoint] = useState<string | number>(0.8);
  const { primaryColor, themeColor, mainColor, accentColor } = useColor();

  useMetaThemeColor(mainColor, isOpen, themeColor);

  useEffect(() => {
    const hashValue = location.hash.slice(1);
    const [teacherId, disciplineHashId] = hashValue.split('&');
    disciplineId.map((id) => {
      if (!isOpen && teacherId === teacher?.id && id === disciplineHashId) {
        setIsOpen(true);
      }
    });
  }, [disciplineId, teacher?.id, isOpen, setIsOpen]);

  useEffect(() => {
    clearTeacherSchedule()
  }, [isOpen])

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
          className="flex justify-between items-center py-[10px]"
          id={teacher?.id}
          transition="0.2s"
          _active={{ opacity: 0.5, transition: '0.2s' }}
        >
          <div className="flex items-center gap-[10px]">
            <Avatar bg={accentColor} />
            <div>
              <Text
                color={primaryColor}
                fontWeight="medium"
                fontSize={'clamp(15px, 4vw, 18px)'}
              >
                {teacher?.name ?? 'Преподаватель кафедры'}
              </Text>
              <Box
                color={primaryColor}
                fontWeight="medium"
                fontSize="14px"
                display="flex"
                flexWrap="wrap"
                gap="0 10px"
              >
                {parsed_types
                  ? parsed_types.map((parsed_type) => (
                    <React.Fragment key={parsed_type}>
                      {LessonTypes && LessonTypes[parsed_type]}{' '}
                    </React.Fragment>
                  ))
                  : original_types.map((original_type) => (
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
          disciplineInfo={disciplineInfo}
          activeSnapPoint={activeSnapPoint}
          setActiveSnapPoint={setActiveSnapPoint}
        />
      </DrawerContent>
    </Drawer>
  );
});
