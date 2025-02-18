import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
} from '@chakra-ui/react';
import { CloudIcon } from '@/shared/assets/chakraIcons/CloudIcon';
import { isScheduleOutdated, isScheduleOutdatedInternet } from '@/entities';
import { Schedule, useColor } from '@/shared';

type BadgeContentProps = {
  schedule: Schedule;
};

export const BadgeContent: React.FC<BadgeContentProps> = ({ schedule }) => {
  const { infoColor } = useColor()
  return (
    <>
      {(isScheduleOutdated(schedule.parsed_at) ||
        isScheduleOutdatedInternet()) && (
          <Popover>
            <PopoverTrigger>
              <CloudIcon color={infoColor} w={25} h={25} />
            </PopoverTrigger>
            <PopoverContent marginY={{ base: '10px', md: '0px' }}>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverBody>
                {isScheduleOutdatedInternet() ? (
                  <p>
                    Расписание устарело, чтобы увидеть актуальное расписание -
                    включите интернет.
                  </p>
                ) : (
                  <p>
                    Расписание устарело, проблема на нашей стороне, следите за
                    актуальными новостями!
                  </p>
                )}
              </PopoverBody>
            </PopoverContent>
          </Popover>
        )}
    </>
  );
};
