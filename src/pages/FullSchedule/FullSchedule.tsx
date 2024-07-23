import { useSchedule } from "@/entities"
import { Tabs, Tab, TabList, Box, Text, VStack, HStack } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { WeekScheduleParams } from "@/entities/Schedule/model/types"
import { FullLessonCard } from "@/entities"
import styles from './FullSchedule.module.scss'
import { useCurrentWeekDay } from "./lib/useCurrentWeekDay"
import { useGroup } from "@/entities"
import { DateTime } from "luxon"
import { useScrollSpyFull } from "./lib/useScrollSpyFull"

  
export function FullSchedule(){
    const [weekParity, setWeekParity] = useState<WeekScheduleParams>({week_parity: 'even'})
    const {getWeekScheduleByName, weekSchedule} = useSchedule()
    const {currentGroup} = useGroup()
    const dayIndex = DateTime.now().setLocale('en').weekdayLong.toLowerCase()
    useEffect(() => {
        if(currentGroup){
            getWeekScheduleByName(currentGroup?.group_name, weekParity)
        }
    }, [currentGroup, weekParity])
    const weekDay = {
        monday: 'Понедельник',
        tuesday: 'Вторник',
        wednesday: 'Среда',
        thursday: 'Четверг',
        friday: 'Пятница',
        saturday: 'Суббота',
        sunday: 'Воскресенье'
    }
    const weekShortDay = {
        monday: 'Пн',
        tuesday: 'Вт',
        wednesday: 'Ср',
        thursday: 'Чт',
        friday: 'Пт',
        saturday: 'Сб',
        sunday: 'Вс'
    }
    const currentDayOfWeek = dayIndex
    const longDaysOfWeek = Object.keys(weekShortDay)
    useScrollSpyFull(longDaysOfWeek);
    const [currentDay, setCurrentDay] = useCurrentWeekDay();
    return(
        <Tabs 
            className={styles['full-schedule']} 
            variant='unstyled' 
        >
            <div className={styles['full-schedule__tab-list']}>
                <TabList 
                    display='flex' 
                    justifyContent='space-between' 
                    alignItems='center' 
                    position='sticky' 
                    top='10px'
                >
                    <Tab 
                        _selected={{ color: 'blue.500', fontSize: '16px', boxShadow: '0 0 5px 0px #00000020', borderRadius: '4px' }}
                        color='blue.900'
                        fontWeight='medium'
                        onClick={() => setWeekParity({week_parity: 'even'})}
                    >Чётная неделя</Tab>
                    <Tab 
                        _selected={{ color: 'blue.500', fontSize: '16px', boxShadow: '0 0 5px 0px #00000020', borderRadius: '4px' }}
                        color='blue.900'
                        fontWeight='medium'
                        onClick={() => setWeekParity({week_parity: 'odd'})}
                    >Нечётная неделя</Tab>
                </TabList>
                <HStack justifyContent='space-between'>
                    {Object.entries(weekShortDay).map(day => (
                        <Box
                            color={currentDayOfWeek === day[0] ? '#3182CE' : '#1A365D'}
                            fontSize='18px'
                            fontWeight='medium'
                            borderRadius='8px'
                            boxShadow={currentDay === day[0] ? '0 0 5px 0 #00000020' : ''}
                            padding={currentDay === day[0] ? '10px' : ''}
                        >
                            <button onClick={() => {setCurrentDay(day[0])
                            const target = document.getElementById(day[0])
                            {target && target.scrollIntoView()}
                            }}>{day[1]}</button>
                        </Box>
                    ))}
                </HStack>
            </div>
            {weekSchedule?.week_days && Object.entries(weekSchedule?.week_days).map((days) => (
                <div id={days[0]}>
                    <Text
                        color='blue.900'
                        fontWeight='medium'
                        fontSize='18px'
                    >{
                    //@ts-ignore
                        days[0] && weekDay[days[0]]}
                    </Text>
                    {days[1].length > 0 ? 
                    (<VStack gap='10px'>{days[1].map(lesson => (
                        <FullLessonCard lesson={lesson}/>
                    ))}</VStack>): 
                    (<Box
                        w='100%'
                        bgColor='#FAFAFA'
                        borderRadius='8px'
                        padding='10px 15px'
                        color='blue.900'
                        fontWeight='bold'
                        fontSize='18px'
                    >Время отдыхать</Box>)}
                </div>
            ))}
        </Tabs>
    )
}