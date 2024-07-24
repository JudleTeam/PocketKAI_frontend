import { Divider, Text, HStack } from "@chakra-ui/react";
import { ComponentWithAs } from "@chakra-ui/react";
import { IconProps } from "@chakra-ui/react";
import { ArrowIcon } from "@/shared/assets/chakraIcons/ArrowIcon";

type ActionType = {
    label: string;
    path: string;
    icon: ComponentWithAs<"svg", IconProps>;
}
export function accountAcion({action, index, lastIndex}:{action:ActionType, index: number, lastIndex:number}){
    const Icon = action.icon;
    return (
        <>
            <HStack padding='15px 20px' display='flex' justifyContent='space-between' 
            transition='0.2s'
            _active={{
                bgColor: 'gray.100',
                transition:'0.2s',
                borderRadius: index === 0 ? '8px 8px 0 0' : index === lastIndex ? '0 0 8px 8px' : ''
            }}>
                <Text as={'span'} display='flex' gap='10px' color='blue.900' fontSize='16px' fontWeight='medium'>
                    <Icon w='24px' h='24px' color='gray.400'/>
                    {action.label}
                    </Text>
                <ArrowIcon transform='rotate(90deg)' color='gray.400' w='24px' h='24px'/>
            </HStack>
            {lastIndex !== index ? <Divider w='90%' alignSelf='center'></Divider> : null }
        </>
    )
}