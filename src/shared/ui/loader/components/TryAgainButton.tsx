import { Button } from "@chakra-ui/react"
import { useColor } from "@/shared"

export const TryAgainButton = () => {
    const { mainColor, accentColor } = useColor()
    return (<Button
        onClick={() => window.location.reload()}
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