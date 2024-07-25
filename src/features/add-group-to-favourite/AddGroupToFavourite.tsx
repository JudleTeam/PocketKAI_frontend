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
  Checkbox,
  RadioGroup,
  Radio,
  useColorModeValue,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import Select from 'react-select';
import { useGroup } from '@/entities';
import { GroupShort, SelectItem } from '@/shared';
type IFormInput = {
  group: SelectItem<GroupShort>;
  addToFavourite: boolean;
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
  const { resetField, handleSubmit, control, register } = useForm<IFormInput>();

  const handleInputChange = (newValue: string) => {
    suggestGroupByName({ group_name: newValue });
  };
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    if (data.addToFavourite) {
      addGroupToFavourite(data.group.value);
    }
    setCurrentGroup(data.group.value);
    resetField('group');
    onClose();
  };
  const main_text = useColorModeValue('light.main_text', 'dark.main_text');
  const customStyles = {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    option: (provided) => ({
      ...provided,
      color: '#000',
    }),
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ModalHeader fontSize={'24px'} fontWeight={'600'} color={main_text}>
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
        <Checkbox
          display={'flex'}
          flexDir={'row-reverse'}
          justifyContent={'space-between'}
          spacing={0}
          mt={2}
          iconSize={'lg'}
          {...register('addToFavourite')}
        >
          Добавить группу в избранное?
        </Checkbox>
        <Box>
          <Heading
            py={'15px'}
            fontSize={'20px'}
            fontWeight={'600'}
            color={main_text}
          >
            Избранные группы
          </Heading>

          <RadioGroup
            onChange={(groupName) => getGroupByName(groupName)}
            value={currentGroup?.group_name}
          >
            <Stack fontSize={'18px'} fontWeight={'500'} color={main_text}>
              {favouriteGroups.map((group) => (
                <React.Fragment key={group.id}>
                  <Radio
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
                        onClick={() => {
                          removeGroupFromFavourite(group);
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
      <ModalFooter>
        <Button w="40%" colorScheme="blue" mr={3} type="submit">
          Сохранить
        </Button>
        <Button w="40%" colorScheme="blue" variant="outline" onClick={onClose}>
          Отмена
        </Button>
      </ModalFooter>
    </form>
  );
}
