import { useNotes } from '@/entities';
import {
  DialogDescription,
  DialogHeader,
  NoteFormData,
  useColor,
} from '@/shared';
import { Box, Button, Checkbox, Input, Text, Textarea } from '@chakra-ui/react';
import { FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';

type NoteFormProps = {
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  errors: FieldErrors<NoteFormData>;
  register: UseFormRegister<NoteFormData>;
  isTimeline: boolean;
  isEdit?: boolean;
  watch?: UseFormWatch<NoteFormData>;
  onDiscipline?: boolean;
};

const NoteForm: React.FC<NoteFormProps> = ({
  handleSubmit,
  errors,
  register,
  isTimeline,
  isEdit,
  watch,
  onDiscipline,
}) => {
  const { error } = useNotes();
  const { primaryColor, accentColor, secondaryColor, noteColor } = useColor();

  return (
    <>
      <DialogHeader>
        {' '}
        <Text
          color={primaryColor}
          fontWeight={'semibold'}
          fontSize={'large'}
          textAlign={'start'}
        >
          Заметка
        </Text>
      </DialogHeader>
      <DialogDescription>
        <Box
          as="form"
          display="flex"
          flexDir="column"
          gap="20px"
          onSubmit={handleSubmit}
        >
          <Box display="flex" flexDir="column" gap="15px">
            {' '}
            <Box>
              <Input
                borderRadius="24px"
                placeholder="Введите название"
                color={primaryColor}
                {...register('title', {
                  required: 'Название обязательно',
                  maxLength: { value: 50, message: 'Максимум 50 символов' },
                })}
              />
              {errors.title && (
                <Text
                  color="red.500"
                  fontSize="12px"
                  fontWeight="medium"
                  paddingLeft={4}
                >
                  {errors.title.message}
                </Text>
              )}
            </Box>
            <Box>
              <Textarea
                style={{ scrollbarWidth: 'none' }}
                whiteSpace="pre-wrap"
                borderRadius="16px"
                color={primaryColor}
                placeholder="Введите описание"
                {...register('description', {
                  maxLength: {
                    value: 1000,
                    message: 'Максимум 1.000 символов',
                  },
                })}
              />
              {errors.description && (
                <Text
                  color="red.500"
                  fontSize="12px"
                  fontWeight="medium"
                  paddingLeft={4}
                >
                  {errors.description.message}
                </Text>
              )}
            </Box>
          </Box>
          {(isTimeline ||
            (isEdit && isTimeline) ||
            (isEdit && !onDiscipline)) && (
            <Box display="flex" alignItems={'start'} gap="10px" paddingLeft={4}>
              <Checkbox {...register('onDiscipline')}>
                <Box lineHeight={1}>
                  <Text
                    fontWeight="medium"
                    fontSize="16px"
                    color={primaryColor}
                  >
                    На дисциплину
                  </Text>
                  <Text fontSize="12px" color={noteColor}>
                    {isEdit
                      ? 'По умолчанию остаётся на той же дате'
                      : 'По умолчанию идёт на текущую пару'}
                  </Text>
                </Box>
              </Checkbox>
            </Box>
          )}
          {isTimeline && isEdit && watch && !watch('onDiscipline') && (
            <Box display="flex" alignItems={'start'} gap="10px" paddingLeft={4}>
              <Checkbox {...register('onThisLesson')}>
                <Box lineHeight={1}>
                  <Text
                    fontWeight="medium"
                    fontSize="16px"
                    color={primaryColor}
                  >
                    На текущую пару
                  </Text>
                </Box>
              </Checkbox>
            </Box>
          )}
          <Button
            w={'100%'}
            color={accentColor}
            backgroundColor={secondaryColor}
            borderRadius={'24px'}
            type="submit"
          >
            {isEdit ? 'Сохранить' : 'Создать заметку'}
          </Button>
          {error && (
            <Text
              color="red.500"
              fontSize="12px"
              fontWeight="medium"
              paddingLeft={4}
            >
              {error}
            </Text>
          )}
        </Box>
      </DialogDescription>
    </>
  );
};

export default NoteForm;
