import { SearchTeacher } from '@/features';
import { Box } from '@chakra-ui/react';

export function SearchedTeachers() {
  return (
    <Box w={{md: '40%'}} p={{base: "20px 0 10px 0", md: "50px 0 10px 0"}}>
      <SearchTeacher />
    </Box>
  );
}
