import {
  Input,
  Button,
  useColorModeValue,
  Spinner,
  Text,
  Box,
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
import { getErrorText } from './lib/getErrorText';
export function Auth({ onClose }: { onClose: () => void }) {
  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IFormInput>();
  const { userAuthStatus, error, login, getMe } = useUser();
  const navigate = useNavigate();
  const [phrase, setPhrase] = useState(getRandomPhrase());
  useEffect(() => {
    const interval = setInterval(() => {
      setPhrase(getRandomPhrase());
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const {
    homeGroupStatus,
    currentGroup,
    getGroupById,
    addGroupToFavourite,
    synchronizeFavouriteGroupsOnAuth,
    setCurrentGroup,
  } = useGroup();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const validData = {
      login: data.login.trim(),
      password: data.password.trim(),
    };
    const status = await login(validData);
    if (status === 200) {
      const user = await getMe();
      if (user.group_id && homeGroupStatus === 'idle') {
        const group = await getGroupById(user.group_id);
        if (group && !currentGroup) {
          addGroupToFavourite(group, userAuthStatus);
          setCurrentGroup(group);
        }
        await synchronizeFavouriteGroupsOnAuth();
      }
      reset();
      onClose();
      navigate('/account', { replace: true });
    }
  };
  const mainTextColor = useColorModeValue('light.main_text', 'dark.main_text');
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1">
      <Box
        fontSize={'24px'}
        fontWeight={'600'}
        color={mainTextColor}
        mx={'auto'}
        mt={4}
        textAlign={'center'}
        mb={5}
      >
        Вход в аккаунт
      </Box>
      {userAuthStatus === 'loading' && (
        <Box
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
        </Box>
      )}

      {userAuthStatus === 'success' && (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap="20px"
        >
          <CheckCircleIcon w="80px" h="80px" color="green.500" />
          <Text>Успешно</Text>
        </Box>
      )}

      {(userAuthStatus === 'idle' || userAuthStatus === 'error') && (
        <div className="flex flex-col gap-5">
          <Box display="flex" flexDirection="column" gap="20px">
            {<Text textAlign={'center'}>{!!error && getErrorText(error)}</Text>}
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
          </Box>
          <Box w="100%" display="flex" justifyContent="center">
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
          </Box>
        </div>
      )}
    </form>
  );
}
