import { useSchedule } from '@/entities';
import { Box, useChakra, useColorModeValue, Text } from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import styles from './DatebarContent.module.scss';
import { MutableRefObject } from 'react';
import { Swiper as SwiperType } from 'swiper';
import { Nullable } from '@/shared';
import { DateTime } from 'luxon';

function getDayOfWeek(date: string) {
  const daysOfWeek = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
  const dayIndex = new Date(date).getDay();
  return daysOfWeek[dayIndex];
}
function isToday(date: string) {
  const day = DateTime.now().toFormat('yyyy-LL-dd');
  return day === date;
}
function isCurrentMonth(date:string){
  const month = DateTime.now().toFormat('LL');
  return month === date.slice(5,7);
}
export function DatebarContent({
  currentDay,
  setCurrentDay,
  swiperRef,
}: {
  currentDay: string;
  setCurrentDay: React.Dispatch<React.SetStateAction<string>>;
  swiperRef: MutableRefObject<Nullable<SwiperType>>;
}) {
  const { theme } = useChakra();
  const cardColor = useColorModeValue(
    theme.colors.light.card,
    theme.colors.dark.card
  );
  const secondElementLightColor = useColorModeValue(
    theme.colors.light.second_element_light,
    theme.colors.dark.second_element_light
  );
  const secondElementColor = useColorModeValue(
    theme.colors.light.second_element,
    theme.colors.dark.second_element
  );
  const blueLightElementColor = useColorModeValue(
    theme.colors.light.blue_light_element,
    theme.colors.dark.blue_light_element
  );
  const blackLightElementColor = useColorModeValue(
    theme.colors.light.black_light_element,
    theme.colors.dark.black_light_element
  );
  const { schedule } = useSchedule();
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
      className={`${styles['date-wrapper']}`}
    >
      {schedule?.days.map((day) => {
        return (
          <SwiperSlide key={day.date}>
            <Box w={'100%'}>
              <button
                style={
                  currentDay === day.date
                    ? {
                        backgroundColor: cardColor,
                        boxShadow: `0 0 5px 0 rgba(0, 0, 0, 0.2)`,
                      }
                    : {}
                }
                className={`${styles['date']} ${
                  isToday(day.date) ? styles['current'] : ''
                } ${currentDay === day.date ? styles['today'] : ''}`}
                onClick={() => {
                  document.getElementById(day.date)?.scrollIntoView();
                  setCurrentDay(day.date);
                }}
              >
                <Box display='flex'>
                <Text
                  color={
                    isToday(day.date)
                      ? secondElementLightColor
                      : secondElementColor
                  }
                >
                  {day.date.slice(-2)}
                </Text>
                {isCurrentMonth(day.date) ? null :  
                <Text 
                color={
                  isToday(day.date)
                    ? secondElementLightColor
                    : secondElementColor
                }
                fontSize='10px'
                >
                  {day.date.slice(5,7)}
                </Text>
                }
                </Box>
                <Text
                  color={
                    isToday(day.date)
                      ? blueLightElementColor
                      : blackLightElementColor
                  }
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
