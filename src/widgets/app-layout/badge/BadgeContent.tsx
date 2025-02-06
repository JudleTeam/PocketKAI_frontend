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
import { Schedule } from '@/shared';

type BadgeContentProps = {
  schedule: Schedule;
};

export const BadgeContent: React.FC<BadgeContentProps> = ({ schedule }) => {
  return (
    <>
      {(isScheduleOutdated(schedule.parsed_at) ||
        isScheduleOutdatedInternet()) && (
        <Popover>
          <PopoverTrigger>
            <CloudIcon color="#F6AD55" w={25} h={25} />
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
