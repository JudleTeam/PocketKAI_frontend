import { useGroup } from '@/entities';
import { Box, Text, useToast } from '@chakra-ui/react';
import { useChakra, useColorModeValue } from '@chakra-ui/react';
import { getSpecialtyDetails } from './lib/getSpecialtyDetails';
import { AccountTabHeader } from '@/shared/lib';
import styles from './Speciality.module.scss';
import { CopyIcon } from '@chakra-ui/icons';
import { CopyToast } from '@/shared';
export function Speciality() {
  const toast = useToast();
  const { homeGroup } = useGroup();
  const { theme } = useChakra();
  const mainTextColor = useColorModeValue('light.main_text', 'dark.main_text');
  const mainColor = useColorModeValue(
    theme.colors.light.main,
    theme.colors.dark.main
  );
  const card = useColorModeValue(
    theme.colors.light.card,
    theme.colors.dark.card
  );
  const specialityDetails = getSpecialtyDetails(homeGroup);
  const urls = [
    { label: 'Учебный план ', value: homeGroup?.syllabus_url },
    {
      label: 'Календарный учебный график',
      value: homeGroup?.study_schedule_url,
    },
    {
      label: 'Образовательная программа',
      value: homeGroup?.educational_program_url,
    },
  ];
  return (
    <Box className={styles['speciality']}>
      <Box
        padding="20px 0 0 0"
        position={'sticky'}
        top={'0px'}
        bgColor={mainColor}
        zIndex={'1'}
        boxShadow={`0px 0px 10px 10px ${mainColor}`}
      >
        <AccountTabHeader color={mainTextColor}>Специальность</AccountTabHeader>
      </Box>
      <Box
        bgColor={card}
        borderRadius="8px"
        padding="10px"
        display="flex"
        flexDirection="column"
        gap="10px"
        fontWeight="medium"
      >
        <Text color={mainTextColor} fontSize="20px" fontWeight="bold">
          Информация
        </Text>
        {specialityDetails.map((detail) => (
          <Box key={detail.label}>
            <Text fontSize="14px" color={'gray.500'}>
              {detail.label}
            </Text>
            <Text color={mainTextColor} fontSize="16px">
              {detail.value}
            </Text>
          </Box>
        ))}
      </Box>
      <Box
        bgColor={card}
        padding="10px"
        borderRadius="8px"
        display="flex"
        flexDirection="column"
        gap="10px"
      >
        <Text color={mainTextColor} fontSize="20px" fontWeight="bold">
          Документы
        </Text>
        {urls.map(
          (url) =>
            url.value && (
              <Box fontWeight="medium" key={url.label}>
                <Text color={'gray.500'} fontSize="14px">
                  {url.label}
                </Text>
                <a
                  style={{
                    color: mainTextColor,
                    textDecoration: 'underline',
                    fontSize: '16px',
                  }}
                  onClick={() => CopyToast(url.value || '', toast)}
                >
                  {url.value} <CopyIcon />
                </a>
              </Box>
            )
        )}
      </Box>
    </Box>
  );
}
