import { Button } from "@chakra-ui/react"
import { useColorMode } from "@chakra-ui/react"
export function Settings(){
    const {toggleColorMode, colorMode} = useColorMode()
    return(
        <Button onClick={toggleColorMode}>
        Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
      </Button>
    )
}