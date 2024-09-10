import { useCommon } from '@/entities';
import { Lesson } from '@/shared';
import { getLessonBuilding, useColor } from '@/shared/lib';
import {
  Box,
  Icon,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { MapPin } from 'lucide-react';
import { useEffect } from 'react';

export function DrawerLessonBuilding({ lesson }: { lesson: Lesson }) {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { buildings, buildingsStatus, getBuildings } = useCommon();
  const { mainTextColor } = useColor();
  const popoverColor = useColorModeValue('gray.50', 'gray.700');
  const lessonBuildingAddress = lesson.building_number
    ? buildings[lesson.building_number]
    : 'Неизвестно';
  useEffect(() => {
    if (buildingsStatus === 'idle') {
      getBuildings();
    }
  }, [buildingsStatus, getBuildings]);
  return (
    <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <PopoverTrigger>
        <Box display={'flex'} alignItems="center" gap={1}>
          <Text>
            {getLessonBuilding(lesson.building_number, lesson.audience_number)}
          </Text>
          <Icon as={MapPin} />
        </Box>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody fontSize="14px" textAlign={'left'} bgColor={popoverColor}>
          <Text fontSize={'16px'} fontWeight={'semibold'} color={mainTextColor}>
            {lesson.building_number}{' '}
            {lesson.building_number?.length === 1 ? 'здание' : ''}
          </Text>
          <Text fontSize={'14px'} fontWeight={'medium'} color={mainTextColor}>
            {lessonBuildingAddress}
          </Text>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
