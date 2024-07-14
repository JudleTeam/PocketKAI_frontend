import { HStack } from "@chakra-ui/react"
import { ReactNode } from "react"
import styles from './Datebar.module.scss'
export function Datebar({datebarActions}:{datebarActions: ()=> ReactNode}){
    return(
        <HStack className={styles['datebar']} justifyContent={'space-around'}>
            {datebarActions()}
        </HStack>
    )
}