import {
  Box,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';

import { useTeachers } from '@/entities';
import { debounce } from 'lodash';
import { useCallback, useEffect, useRef } from 'react';
import { SearchedTeacherCard } from '@/entities';
import { DeleteIcon } from '@chakra-ui/icons';
import { Loader } from '@/shared/ui/loader/Loader';
import { useColor } from '@/shared';

export function SearchTeacher() {
  const { suggestTeacherByName, searchedTeachers, searchedTeachersStatus } =
    useTeachers();
  const { navIconColor, blueVeryLightColor } = useColor();
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedSuggestTeacherByName = debounce((value) => {
    suggestTeacherByName(value);
  }, 200);

  useEffect(() => {
    return () => {
      debouncedSuggestTeacherByName.cancel();
    };
  }, [debouncedSuggestTeacherByName]);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      debouncedSuggestTeacherByName(event.target.value);
    },
    [debouncedSuggestTeacherByName]
  );

  const handleInputClear = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    debouncedSuggestTeacherByName('');
  }, [debouncedSuggestTeacherByName]);

  return (
    <Box pb={6}>
      <InputGroup padding="5px">
        <Input
          placeholder="Поиск преподавателя"
          onChange={handleInputChange}
          ref={inputRef}
          borderRadius={'24px'}
        />
        {inputRef.current?.value && (
          <InputRightElement width="4.5rem">
            <IconButton
              aria-label="clear"
              top="50%"
              transform={'translate(0, -50%)'}
              size="sm"
              borderRadius={'24px'}
              backgroundColor={blueVeryLightColor}
              icon={<DeleteIcon color={navIconColor} />}
              onClick={handleInputClear}
            />
          </InputRightElement>
        )}
      </InputGroup>
      <Loader status={searchedTeachersStatus} idleMessage="Ничего не найдено">
        {searchedTeachers?.map((teacher) => (
          <SearchedTeacherCard key={teacher.id} teacher={teacher} />
        ))}
      </Loader>
    </Box>
  );
}
