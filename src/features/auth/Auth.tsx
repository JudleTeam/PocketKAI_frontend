import {
  Input,
  Button,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  DrawerCloseButton,
  useColorModeValue,
} from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
type IFormInput = {
  login: string;
  password: string;
};
import { useUser } from '@/entities';
export function Auth(onClose: () => void) {
  const { reset, handleSubmit, register } = useForm<IFormInput>();
  const { login, getMe } = useUser();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await login(data);
    await getMe();
    reset();
    onClose();
  };
  const mainTextColor = useColorModeValue('light.main_text', 'dark.main_text');
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DrawerOverlay />
      <DrawerContent h="65%" borderRadius="16px 16px 0 0" padding="20px 0 0 0">
        <DrawerCloseButton />
        <DrawerHeader
          fontSize={'24px'}
          fontWeight={'600'}
          color={mainTextColor}
        >
          Вход в аккаунт
        </DrawerHeader>
        <DrawerBody display="flex" flexDirection="column" gap="20px">
          <Input {...register('login')} placeholder="Введите логин" />

          <Input
            {...register('password')}
            type="password"
            placeholder="Введите пароль"
          />
        </DrawerBody>
        <DrawerFooter w="100%" display="flex" justifyContent="center">
          <Button w="50%" colorScheme="blue" mr={3} type="submit">
            Войти
          </Button>
          <Button
            w="50%"
            colorScheme="blue"
            variant="outline"
            onClick={onClose}
          >
            Отмена
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </form>
  );
}
