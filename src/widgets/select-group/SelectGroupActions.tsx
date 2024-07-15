import { ModalHeader,
    ModalCloseButton,
    ModalBody,
    Input,
    Box,
    Heading, 
    RadioGroup,
    Stack,
    Radio,
    ModalFooter,
    Button,
    Divider
 } from "@chakra-ui/react"
 import { DeleteIcon } from "@chakra-ui/icons"

export function SelectGroupAction(onClose:() => void){
    return(
        <>
        <ModalHeader
      fontSize={'24px'}
      fontWeight={'600'}
      fontFamily={'Montserrat'}
      color={'#1A365D'}
      >Выбор группы</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Input fontFamily={'Montserrat'} placeholder='Введите группу'/>
        <Box>
          <Heading
            padding={'15px 0'}
            fontSize={'18px'}
            fontWeight={'600'}
            fontFamily={'Montserrat'}
            color={'#1A365D'}
          >Избранные группы</Heading>
            <RadioGroup>
              <Stack
                fontSize={'24px'}
                fontWeight={'500'}
                fontFamily={'Montserrat'}
                color={'#1A365D'}
              >
              <Box 
                w={'100%'}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'space-between'}
                padding={'5px 0;'}
              >
                <Radio value='1'>6210</Radio>
                <DeleteIcon w={'20px'}/>
              </Box>
              <Divider />
              <Box 
                w={'100%'}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'space-between'}
                padding={'5px 0;'}
              >
                <Radio value='2'>6210</Radio>
                <DeleteIcon w={'20px'}/>
              </Box>
              <Divider />
              <Box 
                w={'100%'}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'space-between'}
                padding={'5px 0;'}
              >
                <Radio value='3'>6203</Radio>
                <DeleteIcon w={'20px'}/>
              </Box>
              <Divider />
              </Stack>
            </RadioGroup>
        </Box>
      </ModalBody>

      <ModalFooter fontFamily={'Montserrat'}>
        <Button w='40%' colorScheme='blue' mr={3} onClick={onClose}>
          Сохранить
        </Button>
        <Button w='40%' colorScheme='blue' variant='outline' onClick={onClose}>Отмена</Button>
      </ModalFooter>
        </>
    )
}