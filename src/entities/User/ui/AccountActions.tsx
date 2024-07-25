import { Divider, Text, HStack } from '@chakra-ui/react';
import { ComponentWithAs } from '@chakra-ui/react';
import { IconProps } from '@chakra-ui/react';
import { ArrowIcon } from '@/shared/assets/chakraIcons/ArrowIcon';
import { Link } from 'react-router-dom';
type ActionType = {
  label: string;
  path: string;
  icon: ComponentWithAs<'svg', IconProps>;
};
export function accountActions({
  tab,
  main_text,
  action,
  index,
  lastIndex,
}: {
  tab: string;
  main_text: string;
  action: ActionType;
  index: number;
  lastIndex: number;
}) {
  const Icon = action.icon;
  return (
    <>
      <HStack
        as={Link}
        to={action.path}
        padding="15px 20px"
        display="flex"
        justifyContent="space-between"
        transition="0.2s"
        _active={{
          bgColor: tab,
          transition: '0.2s',
          borderRadius:
            index === 0
              ? '8px 8px 0 0'
              : index === lastIndex
              ? '0 0 8px 8px'
              : '',
        }}
      >
        <Text
          as={'span'}
          display="flex"
          gap="10px"
          color={main_text}
          fontSize="16px"
          fontWeight="medium"
        >
          <Icon w="24px" h="24px" color="gray.400" />
          {action.label}
        </Text>
        <ArrowIcon
          transform="rotate(90deg)"
          color="gray.400"
          w="24px"
          h="24px"
        />
      </HStack>
      {lastIndex !== index && <Divider w="90%" alignSelf="center" />}
    </>
  );
}
