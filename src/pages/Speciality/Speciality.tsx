import { useGroup, useUser } from '@/entities';
import { Box, Text, useToast } from '@chakra-ui/react';
import { useChakra, useColorModeValue } from '@chakra-ui/react';
import { getSpecialtyDetails } from './lib/getSpecialtyDetails';
import { AccountTabHeader } from '@/shared/lib';
import styles from './Speciality.module.scss';
import { CopyIcon } from '@chakra-ui/icons';
import { copyToast } from '@/shared';
import { BgTasksLoader } from '@/shared/ui/loader/BgTasksLoader';
import { useEffect } from 'react';
export function Speciality() {
  const toast = useToast();
  const { homeGroup, getGroupById } = useGroup();
  const { backgroundTasks } = useUser();
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
  const hasGroupDocuments = !!(
    homeGroup?.educational_program_url ||
    homeGroup?.study_schedule_url ||
    homeGroup?.syllabus_url
  );
  useEffect(() => {
    const groupDocsBgTaskStatus = backgroundTasks.find(
      (task) => task.name === 'group_documents'
    )?.status;
    if (
      groupDocsBgTaskStatus === 'SUCCESS' &&
      !hasGroupDocuments &&
      homeGroup?.id
    ) {
      getGroupById(homeGroup?.id);
    }
  }, [backgroundTasks, homeGroup?.id, hasGroupDocuments, getGroupById]);

  const specialityDetails = getSpecialtyDetails(homeGroup);
  const urls = [
    { label: 'Учебный план ', value: homeGroup?.syllabus_url ?? 'Неизвестно' },
    {
      label: 'Календарный учебный график',
      value: homeGroup?.study_schedule_url ?? 'Неизвестно',
    },
    {
      label: 'Образовательная программа',
      value: homeGroup?.educational_program_url ?? 'Неизвестно',
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

      <Box display={'flex'} flexDirection={'column'} gap={'20px'}>
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
            <Box
              key={detail.label}
              onClick={() => detail.value && copyToast(detail.value, toast)}
            >
              <Text fontSize="14px" color={'gray.500'}>
                {detail.label} {detail.value ? <CopyIcon /> : null}
              </Text>
              <Text color={mainTextColor} fontSize="16px">
                {detail.value}
              </Text>
            </Box>
          ))}
        </Box>

        <Box
          position={'relative'}
          minH={'200px'}
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
          <BgTasksLoader
            status={{
              fetchStatus: 'success',
              backgroundTaskStatus:
                backgroundTasks.find((task) => task.name === 'group_documents')
                  ?.status ?? 'FAILED',
            }}
            hasData={hasGroupDocuments}
          >
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
                      onClick={() => copyToast(url.value || '', toast)}
                    >
                      {url.value} <CopyIcon />
                    </a>
                  </Box>
                )
            )}
          </BgTasksLoader>
        </Box>
      </Box>
    </Box>
  );
}
