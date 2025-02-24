import { ChevronLeftIcon } from '@chakra-ui/icons';
import { Flex, Box } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';

export const AccountTabHeader = ({
  color,
  children,
}: PropsWithChildren<{ color: string }>) => {
  const navigate = useNavigate();
  return (
    <Flex
      zIndex={'1'}
      position={'sticky'}
      top={'0px'}
      alignItems={'center'}
      gap="5px"
    >
      <ChevronLeftIcon
        fontSize={'24px'}
        color={color}
        cursor={'pointer'}
        onClick={() => navigate(-1)}
      />
      <Box w={'100%'} fontSize="24px" fontWeight="bold" color={color}>
        {children}
      </Box>
    </Flex>
  );
};
