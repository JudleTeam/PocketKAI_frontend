import { Box, Text, Button, useBreakpointValue, Tabs } from '@chakra-ui/react';
import { useGroup } from '@/entities';
import { DateTime } from 'luxon';
import { getTodayDate, getWeekParity, TabListHeader } from '@/shared';
import s from './HiddenLessons.module.scss';
import { useColor } from '@/shared/lib';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Swiper as SwiperInstance } from 'swiper/types';
import 'swiper/css';
import { getLessonsForGroup } from './lib/getLessonsForGroup';
import { SwiperSlide, Swiper } from 'swiper/react';
import HiddenLessonsList from './components/HiddenLessonsList.tsx/HiddenLessonsList';

export function HiddenLessons() {
  const today = getTodayDate();
  // const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);
  const { mainColor, primaryColor } = useColor();

  const weekNumber = DateTime.now().setZone('Europe/Moscow').weekNumber;
  const currentParity = getWeekParity();
  const swiperRef = useRef<SwiperInstance | null>(null);
  const [weekParity, setWeekParity] = useState<'odd' | 'even'>(currentParity);

  const {
    hiddenLessons,
    deleteAllHiddenLesson,
    updateHiddenLesson,
    deleteGroupHiddenLesson,
    currentGroup,
  } = useGroup();
  const isDesktop = useBreakpointValue({ base: false, md: true });
  useEffect(() => {
    updateHiddenLesson(today);
  }, [updateHiddenLesson, today]);

  const lessonsForCurrentGroup = getLessonsForGroup(
    hiddenLessons,
    currentGroup
  );

  const handleSwipeChange = useCallback((index: number) => {
    const parity = index === 0 ? 'even' : 'odd';
    setWeekParity(parity);
  }, []);

  const handleTabChange = useCallback((index: number) => {
    setWeekParity(index === 0 ? 'even' : 'odd');
    swiperRef.current?.slideTo(index);
  }, []);
  console.log(lessonsForCurrentGroup)
  return (
    <Box
      className={s['hidden']}
      style={isDesktop ? { width: '40%', paddingTop: '5vh' } : {}}
    >
      <Box w="100%">
        {lessonsForCurrentGroup ? (
          <Tabs
            className={s.tabs}
            alignItems={{ md: 'center' }}
            defaultIndex={weekNumber % 2}
            variant="unstyled"
            index={weekParity === 'even' ? 0 : 1}
            onChange={handleTabChange}
          >
            <Box
              position={'sticky'}
              display={'flex'}
              flexDir={'column'}
              gap="5px"
              w={'100%'}
              top={'0px'}
              bgColor={mainColor}
              zIndex={2}
            >
              <Box
                padding="10px 0 0 0"
                display={'flex'}
                alignItems={'center'}
                justifyContent={'space-between'}
              >
                <Text
                  color={primaryColor}
                  fontSize={'18px'}
                  fontWeight={'medium'}
                >
                  Скрытые пары
                </Text>
                {hiddenLessons.length > 0 && (
                  <Button
                    onClick={deleteAllHiddenLesson}
                    size="sm"
                    px="0"
                    py="0"
                    variant="ghost"
                    fontSize="16px"
                    color="#3182CE"
                  >
                    Вернуть все пары
                  </Button>
                )}
              </Box>
              {currentGroup && (
                <Button
                  alignSelf={'end'}
                  onClick={() =>
                    deleteGroupHiddenLesson(currentGroup?.group_name)
                  }
                  size="sm"
                  px="0"
                  variant="ghost"
                  fontSize="16px"
                  color="#3182CE"
                >
                  Вернуть пары группы
                </Button>
              )}
              <TabListHeader
                top="0"
                pt="0"
                currentParity={currentParity}
                handleTabChange={handleTabChange}
                weekParity={weekParity}
              />
            </Box>
            <Swiper
              autoHeight
              className={s.root__swiper}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={({ activeIndex }) =>
                handleSwipeChange(activeIndex)
              }
              initialSlide={weekParity === 'even' ? 0 : 1}
            >
              {lessonsForCurrentGroup.map((parity) => (
                <SwiperSlide className={s.root__slide} key={parity.week_parity}>
                  {parity.week_days.length > 0 ?
                    <HiddenLessonsList weekDays={parity.week_days} /> :
                    <Box h={'40dvh'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                      <Text w={'50%'} textAlign={'center'}>На этой неделе нет скрытых пар</Text>
                    </Box>}
                </SwiperSlide>
              ))}
            </Swiper>
          </Tabs>
        ) : hiddenLessons.length > 0 ? (
          <Box
            position={'sticky'}
            display={'flex'}
            flexDir={'column'}
            gap="5px"
            w={'100%'}
            top={'0px'}
            bgColor={mainColor}
            zIndex={2}
          >
            <Box
              padding="10px 0 0 0"
              display={'flex'}
              alignItems={'center'}
              justifyContent={'space-between'}
            >
              <Text
                color={primaryColor}
                fontSize={'18px'}
                fontWeight={'medium'}
              >
                Скрытые пары
              </Text>
              <Button
                onClick={deleteAllHiddenLesson}
                size="sm"
                px="0"
                py="0"
                variant="ghost"
                fontSize="16px"
                color="#3182CE"
              >
                Вернуть все пары
              </Button>
            </Box>
            <Box
              w="100%"
              h="60dvh"
              fontSize="18px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              textAlign="center"
              color={primaryColor}
            >
              В этой группе нет скрытых пар!
            </Box>
          </Box>
        ) : (
          <Box
            w="100%"
            h="60dvh"
            fontSize="18px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
            color={primaryColor}
          >
            Скрытых пар нет!
          </Box>
        )}
      </Box>
    </Box>
  );
}
