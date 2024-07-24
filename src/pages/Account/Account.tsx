import { useUser } from "@/entities/User/user.store"
import { Box, Text, Divider } from "@chakra-ui/react"
import { GraduationCapIcon } from "@/shared/assets/chakraIcons/GraduationCapIcon"
import { AccountIcon } from "@/shared/assets/chakraIcons/AccountIcon"
import { ArrowIcon } from "@/shared/assets/chakraIcons/ArrowIcon"
import { ACCOUNT_ACTIONS } from "@/shared/constants"
import { useDisclosure } from "@chakra-ui/react"
import { UiDrawer } from "@/shared/ui/ui-drawer/UiDrawer"
import { Auth } from "@/features/auth/Auth"
import { useEffect } from "react"
import { accountAcion } from "@/entities/User/constants/accountActions"
import { ExitIcon } from "@/shared/assets/chakraIcons/ExitIcon"
import { USER_ACTIONS } from "@/shared/constants"
export function Account(){
    const {isOpen, onClose, onOpen} = useDisclosure();
    const {user, logOutOfAccount} = useUser()
    const handleClick = () => {
        logOutOfAccount()
    }
    useEffect(()=> {}, [user])
    console.log(user)
    return(<>
        <Box h='300px'>
        <Box 
            position='fixed' 
            display='flex' 
            flexDirection='column' 
            justifyContent='center' 
            alignItems='center' 
            left='0' 
            top='0' 
            w='100vw' 
            h='300px' 
            bgColor='blue.500'
        >
            {user ? (<>
                <Text
                    textAlign='center'
                    fontSize='24px'
                    fontWeight='bold'
                    color='#fff'
                >{user.full_name}</Text>
                <Text
                    fontSize='18px'
                    fontWeight='medium'
                    color='#fff'
                    textAlign='center'
                >{user.status}</Text>
            </>) 
            : 
            (<>
            <GraduationCapIcon w='100px' h='100px' color='#fff'/>
                <Text
                fontSize='24px'
                color='#fff'
                fontWeight='bold'
                >Войдите в аккаунт</Text></>)}
        </Box>
        </Box>
        <Box 
            position='fixed' 
            top='275px' 
            w='90%' 
            bgColor='#fff' 
            boxShadow='0 0 5px 2px #00000020' 
            borderRadius='8px'
        >
        {user ? 
        (<Box  
            display='flex' 
            flexDirection='column' 
        >
            {USER_ACTIONS.map((action, index) => accountAcion({action, index, lastIndex: USER_ACTIONS.length-1}))}
        </Box>):
        (<Box 
            display='flex' 
            justifyContent='space-between'
            onClick={onOpen} 
            padding='15px 20px'
            transition='0.2s'
            _active={{
                bgColor: 'gray.100',
                transition:'0.2s',
                borderRadius: '8px'
            }}
        >
                <Text as={'span'} display='flex' gap='10px' color='blue.900' fontSize='16px' fontWeight='medium'><AccountIcon w='24px' h='24px' color='gray.400'/>Войти в аккаунт</Text>
                <ArrowIcon transform='rotate(90deg)' color='gray.400' w='24px' h='24px'/>
        </Box>)}
        </Box>
        <Box 
            w='90%' 
            bgColor='#fff' 
            display='flex' 
            flexDirection='column' 
            position='fixed' 
            top={user ? '480px' : '400px'}
            boxShadow='0 0 5px 2px #00000020' 
            borderRadius='8px'
        >
            {ACCOUNT_ACTIONS.map((action, index) => accountAcion({action, index, lastIndex: ACCOUNT_ACTIONS.length-1}))}
            {user ? (
                <>
                <button onClick={() => handleClick()}><Text 
                    as={'span'} 
                    padding='15px 20px' 
                    display='flex' 
                    gap='10px' 
                    color='red.900' 
                    fontSize='16px' 
                    fontWeight='medium'
                    transition='0.2s'
                    _active={{
                        transition:'0.2s',
                        bgColor: 'gray.100',
                        borderRadius: '0 0 8px 8px'
                    }}
                ><ExitIcon color='red.400' w='24px' h='24px'/>Выйти из аккаунта</Text></button>
                </>
            ) 
            : null}
        </Box>
        <UiDrawer isOpen={isOpen} onClose={onClose} drawerActions={() => Auth(onClose)}/>
    </>)
}