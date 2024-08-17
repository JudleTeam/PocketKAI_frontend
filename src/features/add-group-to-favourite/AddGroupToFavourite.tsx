import {
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  Box,
  Heading,
  Stack,
  ModalFooter,
  Button,
  Divider,
  RadioGroup,
  Radio,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import React, { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import Select, { StylesConfig } from 'react-select';
import { useGroup, useSchedule, useUser } from '@/entities';
import { GroupShort, SelectItem } from '@/shared';
import { useColor } from '@/shared/lib';
type IFormInput = {
  group: SelectItem<GroupShort>;
  addToFavourite: boolean;
  radio: string;
};
export function AddGroupToFavourite(onClose: () => void) {
  const {
    searchedGroups,
    suggestGroupByName,
    favouriteGroups,
    removeGroupFromFavourite,
    addGroupToFavourite,
    setCurrentGroup,
    getGroupByName,
    currentGroup,
  } = useGroup();
  const { resetScheduleState } = useSchedule();
  const { userAuthStatus } = useUser();
  const { resetField, handleSubmit, control, getValues, register } =
    useForm<IFormInput>();
  const [isOpen, setIsOpen] = useState(false);
  const [selectGroup, setSelectGroup] = useState<string | undefined>(
    currentGroup?.group_name
  );
  const handleInputChange = (newValue: string) => {
    suggestGroupByName({ group_name: newValue });
    setIsOpen(true);
  };
  const handleFavoriteClick = () => {
    const selectedGroup = getValues('group');
    if (selectedGroup) {
      addGroupToFavourite(selectedGroup.value, userAuthStatus);
      setIsOpen(false);
      resetField('group');
      setSelectGroup(selectedGroup.value.group_name);
    }
  };
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const groupValue = data.group;
    const radioValue = data.radio;
    const group =
      groupValue?.value ||
      favouriteGroups.find((group) => group.group_name === radioValue);
    if (group) {
      setCurrentGroup(group);
      resetField('group');
    }
    if (!group && selectGroup) {
      const groupByName = getGroupByName(selectGroup);
      setCurrentGroup(await groupByName);
    }
    setIsOpen(false);
    resetScheduleState();
    onClose();
  };
  const { mainTextColor, tabColor } = useColor();
  const customStyles: StylesConfig = {
    option: (provided) => ({
      ...provided,
      color: '#000',
    }),
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ModalHeader fontSize={'24px'} fontWeight={'600'} color={mainTextColor}>
        Выбор группы
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Controller
          name="group"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              placeholder="Введите группу"
              onInputChange={handleInputChange}
              noOptionsMessage={() => 'Ничего не найдено'}
              options={searchedGroups.map((group) => ({
                label: group.group_name,
                value: group,
              }))}
              styles={customStyles}
            />
          )}
        />
        <Box>
          <Heading
            py={'15px'}
            fontSize={'20px'}
            fontWeight={'600'}
            color={mainTextColor}
          >
            Избранные группы
          </Heading>
          <RadioGroup value={selectGroup} onChange={setSelectGroup}>
            <Stack fontSize={'18px'} fontWeight={'500'} color={mainTextColor}>
              {favouriteGroups.map((group) => (
                <React.Fragment key={group.id}>
                  <Radio
                    {...register('radio')}
                    key={group.id}
                    value={group.group_name}
                    py={'5px'}
                    w={'100%'}
                  >
                    <Box
                      display={'flex'}
                      justifyContent={'space-between'}
                      alignItems={'center'}
                      w={'100%'}
                    >
                      <Text fontSize={'20px'} fontWeight={'normal'}>
                        {group.group_name}
                      </Text>
                      <DeleteIcon
                        w={'20px'}
                        onClick={(e) => {
                          e.stopPropagation();
                          removeGroupFromFavourite(group, userAuthStatus);
                        }}
                      />
                    </Box>
                  </Radio>
                  <Divider />
                </React.Fragment>
              ))}
            </Stack>
          </RadioGroup>
        </Box>
      </ModalBody>
      <ModalFooter w="100%" display="flex" flexWrap={'wrap'} gap="10px">
        <Button
          w="100%"
          bg={tabColor}
          display={isOpen ? 'block' : 'none'}
          color={mainTextColor}
          onClick={handleFavoriteClick}
        >
          Добавить в избранное
        </Button>
        <Box w="100%" display={'flex'} justifyContent="space-between">
          <Button w="48%" colorScheme="blue" type="submit">
            Сохранить
          </Button>
          <Button
            w="48%"
            colorScheme="blue"
            variant="outline"
            onClick={onClose}
          >
            Отмена
          </Button>
        </Box>
      </ModalFooter>
    </form>
  );
}
