import { SHORT_WEEK_DAYS } from '@/shared/constants';
import { Box, TabList, Tab, HStack } from '@chakra-ui/react';
import s from './TabListHeader.module.scss';
import { useColor } from '@/shared';
import React, { useCallback } from 'react';
import { useLocation } from 'react-router-dom';

type TabListHeaderProps = {
  top?: string;
  pt?: string;
  currentDay?: string;
  currentParity?: string;
  currentDayOfWeek?: string;
  weekParity?: string;
  handleTabChange: (index: number) => void;
  handleClick?: (dayName: string, index: number) => void;
};

export const TabListHeader: React.FC<TabListHeaderProps> = ({
  currentDay,
  currentParity,
  currentDayOfWeek,
  weekParity,
  handleTabChange,
  handleClick,
  top,
  pt,
}) => {
  const {
    mainColor,
    secondElementColor,
    blueLightElementColor,
    secondElementLightColor,
    blueVeryLightColor,
  } = useColor();

  const isCurrentDay = useCallback(
    (dayName: string) => {
      return currentDay === dayName + weekParity;
    },
    [currentDay, weekParity]
  );

  const { pathname } = useLocation();
  const weekSelected = {
    color: secondElementLightColor,
    bgColor: blueVeryLightColor,
  };

  return (
    <Box
      className={s.root__list}
      top={top && top}
      pt={{ base: pt && pt, md: '35px' }}
      alignItems={{ md: 'center' }}
      bgColor={mainColor}
      boxShadow={`0 5px 5px 5px ${mainColor}`}
    >
      <TabList className={s.root__center} w={{ md: '70%', lg: '100%' }}>
        <Tab
          className={s.root__item}
          _selected={weekSelected}
          color={blueLightElementColor}
          onClick={() => {
            handleTabChange(0);
          }}
        >
          Чётная неделя
        </Tab>
        <Tab
          className={s.root__item}
          _selected={weekSelected}
          color={blueLightElementColor}
          onClick={() => {
            handleTabChange(1);
          }}
        >
          Нечётная неделя
        </Tab>
      </TabList>
      {pathname === '/schedule/full' && currentDayOfWeek && (
        <HStack w={{ md: '70%', lg: '40%' }} justifyContent="space-between">
          {Object.entries(SHORT_WEEK_DAYS).map((day, index) => (
            <Box
              className={s.root__daybar}
              key={day[0] + weekParity}
              color={
                currentDayOfWeek + currentParity === day[0] + weekParity
                  ? secondElementLightColor
                  : secondElementColor
              }
              bgColor={isCurrentDay(day[0]) ? blueVeryLightColor : ''}
            >
              <button onClick={() => handleClick && handleClick(day[0], index)}>
                {day[1]}
              </button>
            </Box>
          ))}
        </HStack>
      )}
    </Box>
  );
};
