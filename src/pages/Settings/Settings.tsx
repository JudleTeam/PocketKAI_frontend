import { Button, Text, Box } from "@chakra-ui/react"
import { useColorMode } from "@chakra-ui/react"
export function Settings(){
    const {toggleColorMode, colorMode} = useColorMode()
    return(
        <Box display='flex' flexDirection='column' gap='10px'>
            <Text fontSize='18px' fontWeight='bold'>Изменить тему приложения</Text>
            <Button onClick={toggleColorMode}>
         {colorMode === 'light' ? 'Тёмная' : 'Светлая'} тема
      </Button>
        </Box>
    )
}