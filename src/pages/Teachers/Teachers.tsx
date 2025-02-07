import { Box, Tab, TabList, Tabs } from '@chakra-ui/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useColor } from '@/shared/lib';
import s from './Teachers.module.scss';
import { GroupTeachers, SearchedTeachers } from '@/widgets';
import { SwiperSlide, Swiper } from 'swiper/react';
import { Swiper as SwiperInstance } from 'swiper/types';
import 'swiper/css';

export function Teachers() {
  const {
    mainColor,
    blueLightElementColor,
    blueVeryLightColor,
    secondElementLightColor,
  } = useColor();
  const swiperRef = useRef<SwiperInstance | null>(null);
  const [activeTab, setActiveTab] = useState<number>(0);
  const weekSelected = {
    color: secondElementLightColor,
    bgColor: blueVeryLightColor,
  };

  const handleTabChange = useCallback((index: number) => {
    setActiveTab(index);
    swiperRef.current?.slideTo(index);
  }, []);

  useEffect(() => {
    document.getElementById('teacher')?.scrollIntoView();
  }, []);

  return (
    <Tabs
      id="teacher"
      className={s.root}
      alignItems={{ md: 'center' }}
      pt={{ md: '40px' }}
      defaultIndex={0}
      variant="unstyled"
      index={activeTab}
      onChange={handleTabChange}
    >
      <Box
        className={s.root__list}
        pt={{ md: '10px' }}
        alignItems={{ md: 'center' }}
        bgColor={mainColor}
        boxShadow={`0 5px 5px 5px ${mainColor}`}
      >
        <TabList
          className={s.root__center}
          w={{ base: '100%', md: '70%', lg: '40%' }}
        >
          <Tab
            className={s.root__item}
            _selected={weekSelected}
            color={blueLightElementColor}
            onClick={() => {
              handleTabChange(0);
            }}
          >
            Ваши педагоги
          </Tab>
          <Tab
            outlineColor={'none'}
            className={s.root__item}
            _selected={weekSelected}
            color={blueLightElementColor}
            onClick={() => {
              handleTabChange(1);
            }}
          >
            Поиск педагога
          </Tab>
        </TabList>
      </Box>
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        className={s.root__swiper}
        onSlideChange={({ activeIndex }) => setActiveTab(activeIndex)}
      >
        <SwiperSlide className={s.root__slide}>
          <GroupTeachers />
        </SwiperSlide>
        <SwiperSlide className={s.root__slide}>
          <SearchedTeachers />
        </SwiperSlide>
      </Swiper>
    </Tabs>
  );
}
