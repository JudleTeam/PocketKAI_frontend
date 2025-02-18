import { useSchedule, useYaMetrika } from '@/entities';
import { Box, Text } from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import s from './DatebarContent.module.scss';
import { MutableRefObject, useCallback } from 'react';
import { Swiper as SwiperType } from 'swiper';
import {
  AnalyticsEvent,
  Day,
  getDayOfWeek,
  isToday,
  Nullable,
  useColor,
} from '@/shared';
import { DateTime } from 'luxon';
import cn from 'classnames';

export function DatebarContent({
  currentDay,
  setCurrentDay,
  swiperRef,
}: {
  currentDay: string;
  setCurrentDay: React.Dispatch<React.SetStateAction<string>>;
  swiperRef: MutableRefObject<Nullable<SwiperType>>;
}) {
  const {
    secondaryColor,
    secondaryDayNumberColor,
    secondaryDayNameColor,
    currentDayNameColor,
    currentDayNumberColor,
  } = useColor();
  const { schedule } = useSchedule();
  const { sendEvent } = useYaMetrika();

  const handleClick = useCallback(
    (day: Day) => {
      document.getElementById(day.date)?.scrollIntoView();
      setCurrentDay(day.date);
    },
    [setCurrentDay]
  );

  const changeColor = (day: Day, todayColor: string, defaultColor: string) => {
    return isToday(day.date) ? todayColor : defaultColor;
  };

  const isCurrentMonth = (date: string) => {
    const month = DateTime.now().setZone('Europe/Moscow').toFormat('LL');
    return month === date.slice(5, 7);
  };

  return (
    <Swiper
      onSwiper={(swiper) => {
        swiperRef.current = swiper;
      }}
      slidesPerView={7}
      spaceBetween={10}
      slidesPerGroup={7}
      onSlideNextTransitionStart={(swiper) => {
        swiper.swipeDirection = 'next';
      }}
      onSlidePrevTransitionStart={(swiper) => {
        swiper.swipeDirection = 'prev';
      }}
      className={s.root}
    >
      {schedule?.days.map((day) => {
        return (
          <SwiperSlide key={day.date}>
            <Box w={'100%'}>
              <button
                style={
                  currentDay === day.date
                    ? {
                        backgroundColor: secondaryColor,
                      }
                    : {}
                }
                className={cn({
                  [s.root__date]: true,
                  [s.root__current]: currentDay === day.date,
                  [s.root__today]: isToday(day.date),
                })}
                onClick={() => {
                  handleClick(day);
                  sendEvent(AnalyticsEvent.scheduleClickDate);
                }}
              >
                <Box display="flex">
                  <Text
                    color={changeColor(
                      day,
                      currentDayNumberColor,
                      secondaryDayNumberColor
                    )}
                  >
                    {day.date.slice(-2)}
                  </Text>
                  {isCurrentMonth(day.date) ? null : (
                    <Text
                      color={changeColor(
                        day,
                        secondaryDayNumberColor,
                        secondaryDayNumberColor
                      )}
                      fontSize="10px"
                    >
                      {day.date.slice(5, 7)}
                    </Text>
                  )}
                </Box>
                <Text
                  color={changeColor(
                    day,
                    currentDayNameColor,
                    secondaryDayNameColor
                  )}
                >
                  {getDayOfWeek(day.date)}
                </Text>
              </button>
            </Box>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
