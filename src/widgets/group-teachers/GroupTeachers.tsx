import { useGroup, TeacherCard } from '@/entities';
import { Box, Text } from '@chakra-ui/react';
import { useEffect, useMemo } from 'react';
import { IdleMessage, Loader, useColor } from '@/shared';
import { aggregateTeachers } from './lib/aggregateTeachers';
import s from './GroupTeachers.module.scss';

export function GroupTeachers() {
  const { primaryColor } = useColor();
  const {
    currentGroup,
    groupDisciplines,
    groupDisciplinesStatus,
    getGroupDisciplines,
  } = useGroup();

  useEffect(() => {
    if (currentGroup && groupDisciplinesStatus === 'idle') {
      getGroupDisciplines(currentGroup.id);
    }
  }, [currentGroup, groupDisciplinesStatus, getGroupDisciplines]);

  const aggregatedTeachers = useMemo(() => {
    if (groupDisciplines) {
      return aggregateTeachers(groupDisciplines);
    }
    return [];
  }, [groupDisciplines]);

  return (
    <Loader status={groupDisciplinesStatus} idleMessage={<IdleMessage />}>
      <Box w={{ md: '70%', lg: '40%' }} id="teacher">
        <Box className={s.root} pt={{ base: '15px', md: '15px' }} pb={'15px'}>
          {aggregatedTeachers.map(({ discipline, teachers }) => (
            <Box key={discipline.id}>
              <Text
                className={s.root__disciplineName}
                color={primaryColor}
                noOfLines={2}
              >
                {discipline.name}
              </Text>
              {teachers.map((disciplineInfo, index) => (
                <TeacherCard disciplineInfo={disciplineInfo} key={index} />
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    </Loader>
  );
}
