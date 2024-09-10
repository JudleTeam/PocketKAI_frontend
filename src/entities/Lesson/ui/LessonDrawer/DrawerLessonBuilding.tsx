import { useCommon } from '@/entities';
import { copyToast, Lesson } from '@/shared';
import { getLessonBuilding, useColor } from '@/shared/lib';
import { CopyIcon } from '@chakra-ui/icons';
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
  useToast,
} from '@chakra-ui/react';
import { MapPin } from 'lucide-react';
import { useEffect } from 'react';

export function DrawerLessonBuilding({ lesson }: { lesson: Lesson }) {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { buildings, buildingsStatus, getBuildings } = useCommon();
  const { mainTextColor } = useColor();
  const toast = useToast();
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
          <Text
            fontSize={'15px'}
            fontWeight={'medium'}
            color={mainTextColor}
            onClick={() => copyToast(lessonBuildingAddress, toast)}
          >
            {lessonBuildingAddress}
            <CopyIcon ml={1.5} opacity={0.5} />
          </Text>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
