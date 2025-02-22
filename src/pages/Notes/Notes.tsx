import { useGroup, useNotes } from '@/entities';
import { useEffect, useMemo } from 'react';
import { aggregateNotes } from './lib/aggregateNotes';
import { NotesList } from '@/widgets';
import { Box, Text } from '@chakra-ui/react';
import { AccountTabHeader, IdleMessage, Loader, useColor } from '@/shared';
import s from './Notes.module.scss';

export function Notes() {
  const { primaryColor, mainColor } = useColor();
  const {
    groupDisciplines,
    currentGroup,
    groupDisciplinesStatus,
    getGroupDisciplines,
  } = useGroup();
  const { notes } = useNotes();

  useEffect(() => {
    if (currentGroup && groupDisciplinesStatus === 'idle') {
      getGroupDisciplines(currentGroup.id);
    }
  }, [currentGroup, groupDisciplinesStatus, getGroupDisciplines]);

  const aggregatedNotes = useMemo(() => {
    if (groupDisciplines) {
      return aggregateNotes({ groupDisciplines, notes });
    }
    return [];
  }, [groupDisciplines, notes]);

  return (
    <Loader status={groupDisciplinesStatus} idleMessage={<IdleMessage />}>
      <Box className={s.root} pb={'15px'}>
        <Box
          w={{ base: '100%', md: '40%' }}
          position={'sticky'}
          top={'8dvh'}
          zIndex={'5'}
          bgColor={mainColor}
          boxShadow={`0px 5px 5px 5px ${mainColor}`}
        >
          {' '}
          <AccountTabHeader color={primaryColor}>Ваши заметки</AccountTabHeader>
        </Box>
        {aggregatedNotes.map(({ discipline, notes }) => {
          if (notes.length < 1) return;
          return (
            <Box key={discipline.id} w={{ base: '100%', md: '40%' }}>
              <Text
                className={s.root__disciplineName}
                color={primaryColor}
                noOfLines={2}
              >
                {discipline.name}
              </Text>
              <NotesList isNotePage notes={notes} isTimeline={false} />
            </Box>
          );
        })}
      </Box>
    </Loader>
  );
}
