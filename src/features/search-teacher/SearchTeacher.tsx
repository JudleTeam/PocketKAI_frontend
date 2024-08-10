import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';

import { useTeachers } from '@/entities';
import { debounce } from 'lodash';
import { useEffect, useRef } from 'react';
import { SearchedTeacherCard } from '@/entities';
import { DeleteIcon } from '@chakra-ui/icons';
import { Loader } from '@/shared/ui/loader/Loader';

export function SearchTeacher() {
  const { suggestTeacherByName, searchedTeachers, searchedTeachersStatus } =
    useTeachers();
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedSuggestTeacherByName = debounce((value) => {
    suggestTeacherByName(value);
  }, 200);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSuggestTeacherByName(event.target.value);
  };

  const handleInputClear = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    debouncedSuggestTeacherByName('');
  };

  useEffect(() => {
    return () => {
      debouncedSuggestTeacherByName.cancel();
    };
  }, []);

  return (
    <>
      <InputGroup padding="5px">
        <Input
          placeholder="Поиск преподавателя"
          onChange={handleInputChange}
          ref={inputRef}
        />
        {inputRef.current?.value && (
          <InputRightElement width="4.5rem">
            <IconButton
              aria-label="clear"
              top="50%"
              transform={'translate(0, -50%)'}
              h="2rem"
              size="sm"
              icon={<DeleteIcon />}
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
    </>
  );
}
