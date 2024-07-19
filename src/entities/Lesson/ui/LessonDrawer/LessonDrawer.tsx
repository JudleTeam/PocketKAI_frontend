import { Lesson } from "@/shared"
import { DateTime } from "luxon"
import { useRef } from "react"
import { getLessonBuilding } from "../../lib/getLessonBuilding"
import { LessonTypes } from "../../constants/lessonTypes"
import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Text, VStack,
    Button,
    Box,
    Link,
    Tabs, TabList, TabPanels, Tab, TabPanel
} from '@chakra-ui/react'

export function LessonDrawer({dayDate, lesson, isOpen, onClose}:{dayDate: string, lesson: Lesson, isOpen: boolean, onClose: () => void}){
    const specificDate = DateTime.fromISO(dayDate)
    const formattedDate = specificDate.toFormat('d MMMM', { locale: 'ru' })
    const parityTypes = {
      odd: 'Нечётная неделя',
      even: 'Чётная неделя',
      any: 'Каждая неделя'
    }
    const btnRef = useRef<HTMLButtonElement>(null)
    return (
      <>
        <Drawer
          isOpen={isOpen}
          placement='bottom'
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent minH='70vh' maxH='100%' borderRadius='16px 16px 0 0' display='flex' flexDirection='column' alignItems='center'>
            <DrawerCloseButton/>
            <DrawerHeader 
            w='95%'
            padding='40px 0 0 0'
            color='blue.900' 
            display='flex'
            flexDirection='column'
            gap='5px'>
              <Text
              fontSize='24px'
              fontWeight='bold'
              >{lesson.discipline.name}</Text>
              <Text
              fontSize='24px'
              fontWeight='medium'
              >{lesson.start_time?.slice(0, -3)} {lesson.end_time && '-'} {lesson.end_time?.slice(0, -3)}</Text>
              <Box
                display='flex'
                justifyContent='space-between'
                fontSize='16px'
                padding='10px 0'
              >
                  <VStack
                    w='45%'
                    display='flex'
                    alignItems='start'
                    gap='2px'
                    textAlign='start' 
                  >
                    <Text>{formattedDate}</Text>
                    <Text>{parityTypes[lesson.parsed_parity]}</Text>
                  </VStack>
                  <VStack
                  w='55%'
                  display='flex'
                  alignItems='end'
                  gap='2px'
                  textAlign='end' 
                  >
                    <Text>{getLessonBuilding(lesson.building_number, lesson.audience_number)}</Text>
                    <Text>{lesson.parsed_lesson_type && LessonTypes[lesson.parsed_lesson_type]}</Text>
                  </VStack>
              </Box>
              {lesson.parsed_dates && <Text fontWeight='medium' fontSize='18px'>Новые даты: {lesson.parsed_dates}</Text>}
                <Link padding='10px 0' fontSize='14px' fontWeight='medium' color='orange.300' href="#">Сообщить об ошибке</Link>
              {
                lesson.teacher && 
                <Box 
                  boxShadow='0px 0px 5px 5px #00000020'
                  borderRadius='16px'
                  padding='14px'
                >
                  <Text 
                  fontSize='16px'
                  fontWeight='medium'
                  >{lesson?.teacher?.name}</Text>
                  <Text
                    fontSize='12px'
                    fontWeight='medium'
                  >{lesson.department?.name}</Text>
                  
                </Box>
              }
            </DrawerHeader>
            <DrawerBody>
              <Tabs>
                <TabList>
                  <Tab
                    fontWeight='medium'
                  >Домашняя работа</Tab>
                  <Tab>Важная информация</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <Button
                    variant='outline'
                    colorScheme='blue.600'
                    color='blue.600'
                    width='100%'
                    >Добавить домашнюю работу</Button>
                  </TabPanel>
                  <TabPanel>
                  <Button
                    variant='outline'
                    colorScheme='blue.600'
                    color='blue.600'
                    width='100%'
                    >Добавить заметку</Button>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    )
  }