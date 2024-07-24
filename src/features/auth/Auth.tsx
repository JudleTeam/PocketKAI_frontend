import {
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Text,
    Input,
    Box,
    Button,
DrawerOverlay,
DrawerContent,
DrawerHeader,
DrawerBody,
DrawerFooter,
DrawerCloseButton
} from '@chakra-ui/react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
type IFormInput = {
    login: string,
    password: string
};
import { useUser } from '@/entities/User/user.store';
export function Auth(onClose: () => void){
    const { resetField, handleSubmit, control } = useForm<IFormInput>();
    const {postAuthLogin, getMeStudent} = useUser();
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        const token = await postAuthLogin(data);
        await getMeStudent(token)
        resetField('login');
        resetField('password');
        onClose();
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <DrawerOverlay />
            <DrawerContent h='65%' borderRadius='16px 16px 0 0' padding='20px 0 0 0'>
            <DrawerCloseButton />
            <DrawerHeader fontSize={'24px'} fontWeight={'600'} color={'blue.900'}>
                Вход в аккаунт
            </DrawerHeader>
            <DrawerBody
                display='flex'
                flexDirection='column'
                gap='20px'
            >
            <Controller
            name="login"
            control={control}
            render={({ field }) => (
                <Input
                {...field}
                placeholder="Введите логин"
                />
            )}
            />
            <Controller
            name="password"
            control={control}
            render={({ field }) => (
                <Input
                {...field}
                type='password'
                placeholder="Введите пароль"
                />
            )}
            />
            </DrawerBody>
            <DrawerFooter w='100%' display='flex' justifyContent='center' >
                <Button w="50%" colorScheme="blue" mr={3} type="submit">
                    Войти
                </Button>
                <Button w="50%" colorScheme="blue" variant="outline" onClick={onClose}>
                    Отмена
                </Button>
            </DrawerFooter>
            </DrawerContent>
        </form>
    )
}