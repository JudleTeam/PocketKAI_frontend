import { Button } from "@chakra-ui/react"
import { useColor } from "@/shared"
import { useSchedule, useTeachers } from "@/entities"

export const TryAgainButton = ({ teacherId }: { teacherId?: string }) => {
    const { mainColor, accentColor } = useColor()
    const { clearSchedule } = useSchedule()
    const { clearTeacherSchedule } = useTeachers()
    const pathname = window.location.pathname

    const handleClick = () => {
        if (pathname.includes('/teacher') && teacherId) {
            clearTeacherSchedule()
        }
        else {
            clearSchedule()
        }
    }

    return (<Button
        onClick={() => handleClick()}
        color={mainColor}
        fontSize={'16px'}
        fontWeight={'medium'}
        paddingY="5px"
        paddingX="25px"
        borderRadius={24}
        bg={accentColor}
        _hover={{ bg: accentColor, boxShadow: 'outline' }}
        _focus={{ bg: accentColor }}>
        Попробуйте снова
    </Button>)
}