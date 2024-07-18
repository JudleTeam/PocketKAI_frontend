import { Text, Box } from "@chakra-ui/react";
import { Nullable } from "@/shared";
import { ReactNode } from 'react';

import { LectureIcon } from "@/shared/assets/chakraIcons/LectureIcon";
import { PracticeIcon } from "@/shared/assets/chakraIcons/PracticeIcon";
import { LabIcon } from "@/shared/assets/chakraIcons/LabIcon";
import { PhysEdIcon } from "@/shared/assets/chakraIcons/PhysEdIcon";
import { MilitaryIcon } from "@/shared/assets/chakraIcons/MilitaryIcon";
export const LessonTypes = {
    practice: <Box color="#2B6CB0" display='flex' alignItems='center' gap='5px'><PracticeIcon/>Практика</Box>,
    lecture: <Box  color="#6B46C1" display='flex' alignItems='center' gap='5px'><LectureIcon/>Лекция</Box>,
    lab_work: <Box color="#2C7A7B" display='flex' alignItems='center' gap='5px'><LabIcon/>Лаб. работа</Box>,
    consult: <Text color="#C05621">Консультация</Text>,
    phys_edu: <Box color="#46C1C1" display='flex' alignItems='center' gap='5px'><PhysEdIcon/>Спорт</Box>,
    course_work: <Text color="#4A5568">Курсовая работа</Text>,
    ind_task: <Text color="#B83280">Индивидуальная работа</Text>,
    military: <Box color="#C53030" display='flex' alignItems='center' gap='5px'><MilitaryIcon/>Военная кафедра</Box>,
    unknown: <></>
};

export const LessonBuildingType = (build: Nullable<string>, audience: Nullable<string>):ReactNode => {
    if(build === null && audience === null){
        return <></>
    }
    else if(build === null){
        return <>Аудитория: {audience}</>
    }
    else if(audience === null){
        return <>Здание: {build}</>
    }
    else if (build === audience){
        return <>Здание: {build}</>
    }
    else{
        return <>Здание: {build} Ауд: {audience}</>
    }
    return <></>
}