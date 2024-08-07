import {
  Input,
  Button,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  useColorModeValue,
  Spinner,
  Text,
  Box,
  useColorMode,
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { useForm, SubmitHandler } from 'react-hook-form';
type IFormInput = {
  login: string;
  password: string;
};
import { useGroup, useUser } from '@/entities';
import { useEffect, useState } from 'react';
import { getRandomPhrase } from './lib/getRandomPhrase';
import { useNavigate } from 'react-router-dom';
export function Auth(isOpen: boolean, onClose: () => void) {
  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IFormInput>();
  const { userAuthStatus, login, getMe } = useUser();
  const navigate = useNavigate();
  const [phrase, setPhrase] = useState(getRandomPhrase());
  const { colorMode } = useColorMode();
  const themeColor = useColorModeValue('#1A446B', '#122033');
  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor && isOpen) {
      metaThemeColor.setAttribute('content', themeColor);
    }
  }, [themeColor, colorMode, isOpen]);
  useEffect(() => {
    const interval = setInterval(() => {
      setPhrase(getRandomPhrase());
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const {
    getGroupById,
    homeGroupStatus,
    addGroupToFavourite,
    setCurrentGroup,
  } = useGroup();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await login(data);
    const user = await getMe();
    if (user.group_id && homeGroupStatus === 'idle') {
      const group = await getGroupById(user.group_id);
      if (group) {
        addGroupToFavourite(group);
        setCurrentGroup(group);
      }
    }
    reset();
    onClose();
    navigate('/account', { replace: true });
  };
  const mainTextColor = useColorModeValue('light.main_text', 'dark.main_text');
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DrawerHeader
        fontSize={'24px'}
        fontWeight={'600'}
        color={mainTextColor}
        margin={'0 auto'}
        textAlign={'center'}
      >
        Вход в аккаунт
      </DrawerHeader>
      {userAuthStatus === 'loading' && (
        <DrawerBody
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap="20px"
        >
          <Spinner size="xl" />
          <Box maxW="250px" textAlign={'center'}>
            <Text>{phrase}...</Text>
          </Box>
        </DrawerBody>
      )}

      {userAuthStatus === 'success' && (
        <DrawerBody
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap="20px"
        >
          <CheckCircleIcon w="80px" h="80px" color="green.500" />
          <Text>Успешно</Text>
        </DrawerBody>
      )}

      {userAuthStatus === 'idle' && (
        <>
          <DrawerBody display="flex" flexDirection="column" gap="20px">
            <Box>
              <Input
                {...register('login', { required: 'Это поле обязательно' })}
                placeholder="Введите логин"
              />
              {errors.login && (
                <Text fontSize={'14px'} color={'red.500'}>
                  {errors.login.message}
                </Text>
              )}
            </Box>
            <Box>
              <Input
                {...register('password', { required: 'Это поле обязательно' })}
                type="password"
                placeholder="Введите пароль"
              />
              {errors.login && (
                <Text fontSize={'14px'} color={'red.500'}>
                  {errors.login.message}
                </Text>
              )}
            </Box>
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
        </>
      )}
    </form>
  );
}
