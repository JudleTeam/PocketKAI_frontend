import {
  Box,
  Text,
  Button,
  useBreakpointValue,
  Tabs,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { useGroup, useYaMetrika } from '@/entities';
import { DateTime } from 'luxon';
import {
  AnalyticsEvent,
  getTodayDate,
  getWeekParity,
  TabListHeader,
} from '@/shared';
import s from './HiddenLessons.module.scss';
import { useColor } from '@/shared/lib';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Swiper as SwiperInstance } from 'swiper/types';
import 'swiper/css';
import { getLessonsForGroup } from './lib/getLessonsForGroup';
import { SwiperSlide, Swiper } from 'swiper/react';
import HiddenLessonsList from './components/HiddenLessonsList.tsx/HiddenLessonsList';
import { ElipsisIcon } from '@/shared/assets/chakraIcons/ElipsisIcon';

export function HiddenLessons() {
  const today = getTodayDate();
  // const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);
  const { mainColor, primaryColor, accentColor, secondaryColor } = useColor();

  const weekNumber = DateTime.now().setZone('Europe/Moscow').weekNumber;
  const currentParity = getWeekParity();
  const swiperRef = useRef<SwiperInstance | null>(null);
  const [weekParity, setWeekParity] = useState<'odd' | 'even'>(currentParity);
  const { sendEvent } = useYaMetrika();

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

  return (
    <Box className={s['hidden']} style={isDesktop ? { width: '40%' } : {}}>
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
                padding="10px 0"
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
                <Menu>
                  <MenuButton>
                    <ElipsisIcon />
                  </MenuButton>
                  <MenuList
                    fontSize={'14px'}
                    backgroundColor={mainColor}
                    borderRadius={'16px '}
                    padding={0}
                    zIndex={50}
                  >
                    {currentGroup && (
                      <MenuItem
                        onClick={() => {
                          deleteGroupHiddenLesson(currentGroup?.group_name);
                          sendEvent(AnalyticsEvent.lessonDeleteHidden);
                        }}
                        backgroundColor={mainColor}
                        color={accentColor}
                        py={'15px'}
                        borderRadius={'16px 16px 0 0'}
                        fontWeight="600"
                        _hover={{ backgroundColor: secondaryColor }}
                        _focus={{ backgroundColor: secondaryColor }}
                      >
                        Вернуть пары группы
                      </MenuItem>
                    )}
                    {hiddenLessons.length > 0 && (
                      <MenuItem
                        onClick={() => {
                          deleteAllHiddenLesson();
                          sendEvent(AnalyticsEvent.lessonDeleteHidden);
                        }}
                        backgroundColor={mainColor}
                        color={accentColor}
                        py={'15px'}
                        fontWeight="600"
                        borderRadius={'0 0 16px 16px'}
                        _hover={{ backgroundColor: secondaryColor }}
                        _focus={{ backgroundColor: secondaryColor }}
                      >
                        Вернуть все пары
                      </MenuItem>
                    )}
                  </MenuList>
                </Menu>
              </Box>
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
                  {parity.week_days.length > 0 ? (
                    <HiddenLessonsList weekDays={parity.week_days} />
                  ) : (
                    <Box
                      h={'40dvh'}
                      display={'flex'}
                      alignItems={'center'}
                      justifyContent={'center'}
                    >
                      <Text w={'50%'} textAlign={'center'}>
                        На этой неделе нет скрытых пар
                      </Text>
                    </Box>
                  )}
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
                onClick={() => {
                  deleteAllHiddenLesson();
                  sendEvent(AnalyticsEvent.lessonDeleteHidden);
                }}
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
