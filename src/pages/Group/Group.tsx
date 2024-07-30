import { useGroup } from '@/entities';
import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import { AccountTabHeader } from '@/shared/lib';
export function Group() {
  const { homeGroup } = useGroup();
  const mainTextColor = useColorModeValue('light.main_text', 'dark.main_text');
  const secondElementColor = useColorModeValue(
    'light.second_element',
    'dark.second_element'
  );
  const card = useColorModeValue('light.card', 'dark.card');
  const urls = [
    { value: 'Учебный план ', label: homeGroup?.syllabus_url },
    {
      value: 'Календарный учебный график',
      label: homeGroup?.study_schedule_url,
    },
    {
      value: 'Образовательная программа',
      label: homeGroup?.educational_program_url,
    },
  ];
  return (
    <Box display="flex" flexDirection="column" gap="20px">
      <AccountTabHeader color={mainTextColor}>
        Группа {homeGroup?.group_name}
      </AccountTabHeader>
      <Box
        bgColor={card}
        padding="10px"
        borderRadius="8px"
        display="flex"
        flexDirection="column"
        gap="10px"
      >
        <Text color={mainTextColor} fontSize="22px" fontWeight="bold">
          Документы
        </Text>
        {urls.map(
          (url) =>
            url.label && (
              <Box fontWeight="medium" key={url.label}>
                <Text color={secondElementColor}>{url.value}</Text>
                <a
                  style={{ color: mainTextColor, textDecoration: 'underline' }}
                  href={url.label}
                  target="_blank"
                  download
                >
                  {url.label}
                </a>
              </Box>
            )
        )}
      </Box>
    </Box>
  );
}
