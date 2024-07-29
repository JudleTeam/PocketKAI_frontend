import { useGroup } from '@/entities';
import {
  Box,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
export function Group() {
    const {homeGroup} = useGroup()
  const mainText = useColorModeValue('light.main_text', 'dark.main_text');
  const urls = [
    {value: 'Учебный план:', label: homeGroup?.syllabus_url},
    {value: 'Календарный учебный график:', label: homeGroup?.study_schedule_url}
  ]
  return(
    <Box>
        <Text fontSize='24px' fontWeight='bold' color={mainText}>Группа {homeGroup?.group_name}</Text>
        {urls.map(url => (
          url.label && 
          <Box color={mainText}>
            <Text fontWeight='medium'>{url.value}</Text>
            <a target='_blank' href={url.label}>{url.label}</a>
          </Box> 
        ))}
    </Box>
  )
}
