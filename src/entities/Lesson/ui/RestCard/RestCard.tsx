import { HStack, Text } from "@chakra-ui/react"
import styles from './RestCard.module.scss'
import { getRestState } from "../../lib/getRestState"
import { RestIcon } from "@/shared/assets/chakraIcons/RestIcon"
import { lessonStateIcons } from "../../constants/lessonStateIcons"
import { lessonStateLine } from "../../constants/lessonStateLine"

export function RestCard({dayDate}:{dayDate:string}){
    return(
        <HStack className={styles["rest-card"]} alignItems="flex-start">
      <div className={styles["rest-card__time-stub"]} ></div>
      <div className={styles['rest-card__timeline']}>
        {lessonStateIcons[getRestState(dayDate).state]}
        {lessonStateLine(getRestState(dayDate).color)}
      </div>
      <div className={styles['rest-card__info']}>
        <Text
          color="blue.900"
          fontWeight="bold"
          lineHeight={1.3}
          className={styles['rest-card__name']}
        >
            Выходной
        </Text>
        <Text color="blue.900" fontWeight={'medium'}>
          Здание: Дом Ауд: Кровать
        </Text>
        <Text 
        as={'span'}
        color="#1FB725"
        display="flex"
        alignItems="center"
        gap="5px"
        fontWeight={'meduim'}>
          <RestIcon/> 
          Отдых
        </Text>
      </div>
    </HStack>
    )
}