import { ExamType } from "@/shared"
import { HStack, Text, useChakra, useColorModeValue, } from "@chakra-ui/react"
import { getLessonBuilding } from "@/shared/lib"
import { getExamState } from "../../lib/getExamState"
import { lessonStateIcons } from "@/shared/constants"
import { examStateLine } from "../../constants/examStateLine"
import { DateTime } from "luxon"
import styles from './ExamCard.module.scss'
export function ExamCard({exam}:{exam:ExamType}){
    const {theme} = useChakra()
    const mainTextColor = useColorModeValue(theme.colors.light.main_text, theme.colors.dark.main_text)
    return(
        <HStack
          className={styles['exam-card']}
          alignItems="flex-start"
        >
          <div className={styles['exam-card__time']}>
            <Text
              className={styles['exam-card__time--start']}
              color={mainTextColor}
            >
              {exam.time
                ? DateTime.fromISO(exam.time).toFormat('HH:mm')
                : 'Н/Д'}
            </Text>
          </div>
          <div className={styles['exam-card__timeline']}>
            {lessonStateIcons[getExamState(exam).state]}
            {examStateLine(getExamState(exam).color)}
          </div>
          <div className={styles['exam-card__info']}>
            <Text
              color={mainTextColor}
              fontWeight="bold"
              lineHeight={1.3}
              className={styles['exam-card__name']}
            >
              {exam.discipline.name}
            </Text>
            <Text color={mainTextColor} fontWeight={'medium'}>
              {getLessonBuilding(
                exam.building_number,
                exam.audience_number
              )}
            </Text>
          </div>
        </HStack>
    )
}