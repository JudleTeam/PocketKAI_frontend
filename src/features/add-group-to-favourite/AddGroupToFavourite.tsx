import {
  Text,
  Box,
  Stack,
  Button,
  Divider,
  RadioGroup,
  Radio,
  IconButton,
  useColorMode,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import Select, { StylesConfig } from 'react-select';
import { useGroup, useSchedule, useUser } from '@/entities';
import { GroupShort, SelectItem } from '@/shared';
import { useColor } from '@/shared/lib';

type AddGroupToFavouriteProps = {
  onClose: () => void;
};

type IFormInput = {
  group: SelectItem<GroupShort>;
  addToFavourite: boolean;
};

const AddGroupToFavourite: React.FC<AddGroupToFavouriteProps> = ({
  onClose,
}) => {
  const { colorMode } = useColorMode();
  const customStyles: StylesConfig = {
    control: (provided) => ({
      ...provided,
      borderRadius: '24px',
      padding: '0 10px',
      backgroundColor: colorMode === 'dark' ? '#2D3748' : '#fff',
      borderColor: colorMode === 'dark' ? '#4A5568' : '#E2E8F0',
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: '16px',
      overflow: 'hidden',
      backgroundColor: colorMode === 'dark' ? '#1A202C' : '#fff',
    }),
    option: (provided, { isFocused }) => ({
      ...provided,
      color: colorMode === 'dark' ? '#E2E8F0' : '#000',
      backgroundColor: isFocused
        ? colorMode === 'dark'
          ? '#2D3748'
          : '#EDF2F7'
        : 'transparent',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: colorMode === 'dark' ? '#E2E8F0' : '#000',
    }),
    input: (provided) => ({
      ...provided,
      color: colorMode === 'dark' ? '#E2E8F0' : '#000',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: colorMode === 'dark' ? '#9CA3AF' : '#6B7280',
    }),
  };

  const {
    searchedGroups,
    suggestGroupByName,
    favouriteGroups,
    removeGroupFromFavourite,
    addGroupToFavourite,
    setCurrentGroup,
    getGroupByName,
    currentGroup,
    isFavorite,
  } = useGroup();
  const { primaryColor, accentColor, mainColor, secondaryColor } = useColor();
  const { resetScheduleState } = useSchedule();
  const { userAuthStatus } = useUser();
  const { resetField, handleSubmit, control, getValues } =
    useForm<IFormInput>();
  const formRef = useRef<HTMLFormElement>(null);
  const [selectGroup, setSelectGroup] = useState<string | undefined>(
    currentGroup?.group_name
  );
  const handleInputChange = useCallback(
    (newValue: string) => {
      if (newValue) {
        suggestGroupByName({ group_name: newValue });
      }
    },
    [suggestGroupByName]
  );
  useEffect(() => {
    setSelectGroup(currentGroup?.group_name);
  }, [currentGroup]);

  const handleAddToFavouriteClick = () => {
    const selectedGroup = getValues('group');
    if (selectedGroup) {
      addGroupToFavourite(selectedGroup.value, userAuthStatus);
      //resetField('group');
      //setSelectGroup(selectedGroup.value.group_name);
      //setCurrentGroup(selectedGroup.value);
      //resetScheduleState();
      //onClose();
    }
  };
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const groupValue = data.group;
    const group = groupValue?.value;
    if (group) {
      setCurrentGroup(group);
      resetField('group');
    }
    if (!group && selectGroup) {
      const groupByName = getGroupByName(selectGroup);
      setCurrentGroup(await groupByName);
    }
    resetScheduleState();
    onClose();
  };

  const handleRadioGroupChange = (nextValue: string) => {
    setSelectGroup(nextValue);
    const group = favouriteGroups.find(
      (group) => group.group_name === nextValue
    );
    if (group) {
      setCurrentGroup(group);
      resetScheduleState();
      onClose();
      resetField('group');
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
      <Box display="flex" flexDirection="column" gap="20px">
        <Controller
          name="group"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              value={field.value || null}
              placeholder="Введите группу"
              onInputChange={handleInputChange}
              onChange={(selectedOption) => {
                field.onChange(selectedOption as SelectItem<GroupShort> | null);
                if (selectedOption) {
                  setSelectGroup(
                    (selectedOption as SelectItem<GroupShort>).label
                  );
                }
              }}
              noOptionsMessage={() => 'Ничего не найдено'}
              options={
                searchedGroups.map((group) => ({
                  label: group.group_name,
                  value: group,
                })) as SelectItem<GroupShort>[]
              }
              styles={customStyles}
            />
          )}
        />

        <Box w="100%" display="flex" flexWrap={'wrap'} gap="20px">
          {getValues('group') && !isFavorite(getValues('group').value) && (
            <Button
              w="100%"
              bg={secondaryColor}
              color={accentColor}
              onClick={handleAddToFavouriteClick}
              borderRadius="24px"
            >
              Добавить в избранное
            </Button>
          )}
          <Box w="100%" display={'flex'} justifyContent="space-between">
            <Button
              isDisabled={!getValues('group')}
              w="48%"
              bgColor={accentColor}
              type="submit"
              color={mainColor}
              borderRadius={'24px'}
            >
              Выбрать
            </Button>
            <Button
              w="48%"
              variant="outline"
              borderRadius={'24px'}
              borderColor={accentColor}
              color={accentColor}
              onClick={onClose}
            >
              Назад
            </Button>
          </Box>
        </Box>
        <Box>
          <Text
            display={favouriteGroups.length > 0 ? 'block' : 'none'}
            color={primaryColor}
            fontWeight={'semibold'}
            fontSize={'large'}
            textAlign={'start'}
          >
            Избранные группы
          </Text>
          <RadioGroup
            value={selectGroup}
            py="10px"
            onChange={handleRadioGroupChange}
          >
            <Stack fontSize={'18px'} fontWeight={'500'} color={primaryColor}>
              {favouriteGroups.map((group) => (
                <React.Fragment key={group.id}>
                  <Radio
                    key={group.id}
                    value={group.group_name}
                    py={'5px'}
                    w={'100%'}
                    _checked={{
                      bg: accentColor,
                      borderColor: accentColor,
                      position: 'relative',
                      _before: {
                        content: '""',
                        position: 'absolute',
                        width: '50%',
                        height: '50%',
                        borderRadius: '50%',
                        bg: mainColor,
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                      },
                    }}
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
                      <IconButton
                        borderRadius={'24px'}
                        bgColor={secondaryColor}
                        aria-label="Delete"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeGroupFromFavourite(group, userAuthStatus);
                        }}
                        icon={<DeleteIcon color={accentColor} />}
                      />
                    </Box>
                  </Radio>
                  <Divider />
                </React.Fragment>
              ))}
            </Stack>
          </RadioGroup>
        </Box>
      </Box>
    </form>
  );
};

export default AddGroupToFavourite;
