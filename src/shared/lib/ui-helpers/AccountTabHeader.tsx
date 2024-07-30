import { ChevronLeftIcon } from '@chakra-ui/icons';
import { Flex, Text } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';

export const AccountTabHeader = ({
  color,
  children,
}: PropsWithChildren<{ color: string}>) => {
  const navigate = useNavigate();
  return (
    <Flex  zIndex={'1'} position={'sticky'} top={'0px'} alignItems={'center'} gap="5px">
      <ChevronLeftIcon
        fontSize={'24px'}
        color={color}
        onClick={() => navigate(-1)}
      />
      <Text fontSize="24px" fontWeight="bold" color={color}>
        {children}
      </Text>
    </Flex>
  );
};
