import {
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  Box,
  Heading,
  RadioGroup,
  Stack,
  Radio,
  ModalFooter,
  Button,
  Divider,
  Input,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import React, { useState, useEffect } from 'react';
import { useGroup } from '../../model/group.store';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import Select from 'react-select';
type IFormInput = {
  group_name: OptionType,
}
type OptionType = {
  label: string;
  value: string;
};
export function SelectGroupAction(onClose: () => void) {
  const [value, setValue] = useState('');
  const {groups_name, suggestGroupByName} = useGroup();
  const [options, setOptions] = useState<OptionType[]>([])
  const {resetField, handleSubmit, control} = useForm<IFormInput>()
  const [favoriteGroups, setFavoriteGroups] = useState<string[]>([]);
  useEffect(() => {
    suggestGroupByName({group_name: value})
    setOptions(groups_name.map((group, id) => ({
      label: group.group_name,
      value: group.group_name,
    })))
  }, [value]);
  useEffect(() => {
    const storedGroups = localStorage.getItem('favoriteGroups');
    if (storedGroups) {
      setFavoriteGroups(JSON.parse(storedGroups));
    }
  }, []);
  const addItem = (groupName: string) => {
    if (!favoriteGroups.includes(groupName)){
      const newFavoriteGroups = [...favoriteGroups, groupName];
      setFavoriteGroups(newFavoriteGroups);
      localStorage.setItem('favoriteGroups', JSON.stringify(newFavoriteGroups));
    }
  };
  const handleInputChange = (newValue:string) => {
    setValue(newValue)
    console.log(value)
  }
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    addItem(data.group_name.value)
    resetField('group_name')
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ModalHeader
        fontSize={'24px'}
        fontWeight={'600'}
        fontFamily={'Montserrat'}
        color={'#1A365D'}
      >
        Выбор группы
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
      <Controller
        name="group_name"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            placeholder="Введите группу"
            onInputChange={handleInputChange}
            options={options}
            onChange={(selectedOption) => field.onChange(selectedOption)}
          />
        )}
      />
      <Box>
        {favoriteGroups.length > 0 ? 
        <Heading
          padding={'15px 0'}
          fontSize={'20px'}
          fontWeight={'600'}
          fontFamily={'Montserrat'}
          color={'#1A365D'}
        >
          Избранные группы
        </Heading>
        : 
        <></>
        }
        <Stack
          fontSize={'18px'}
          fontWeight={'500'}
          fontFamily={'Montserrat'}
          color={'#1A365D'}
        >
        {favoriteGroups.map((group, index) => (
          <>
          <Box 
            key={index}
            w={'100%'}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
            padding={'5px 0;'}
          >
            <Text>{group}</Text>
            <DeleteIcon 
              w={'20px'} 
              onClick={() => {
                const updatedGroups = favoriteGroups.filter((item) => item !== group);
                setFavoriteGroups(updatedGroups);
                localStorage.setItem('favoriteGroups', JSON.stringify(updatedGroups));
              }}
            />
          </Box>
          <Divider />
          </>
        ))}
        </Stack>
      </Box>
      </ModalBody>
      <ModalFooter fontFamily={'Montserrat'}>
        <Button w="40%" colorScheme="blue" mr={3} type='submit'>
          Сохранить
        </Button>
        <Button w="40%" colorScheme="blue" variant="outline" onClick={onClose}>
          Отмена
        </Button>
      </ModalFooter>
    </form>
  );
}
