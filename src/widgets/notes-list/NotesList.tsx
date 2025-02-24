import { NoteCard } from '@/entities';

import { Grid, GridItem, Box } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { Lesson, Notes } from '@/shared';

type NoteListProps = {
  notes: Notes;
  lesson?: Lesson;
  isTimeline: boolean;
  dayDate?: string;
  isNotesPage?: boolean;
  isOther?: boolean;
};

const NotesList: React.FC<NoteListProps> = ({
  notes,
  lesson,
  isTimeline,
  dayDate,
  isNotesPage,
  isOther,
}) => {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleCardClick = (id: string) => {
    setActiveCardId(id === activeCardId ? null : id);
  };

  useEffect(() => {
    if (activeCardId && containerRef.current) {
      console.log(activeCardId);
      const activeElement = containerRef.current.querySelector(
        `[data-note-id="${activeCardId}"]`
      );
      if (activeElement) {
        activeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [activeCardId]);

  return (
    <Box
      ref={containerRef}
      h={isNotesPage ? 'auto' : '55dvh'}
      overflowY={'auto'}
      pt={'10px'}
      mb="10px"
      style={{ scrollbarWidth: 'none' }}
    >
      <Grid
        overflowY={'auto'}
        pt={'10px'}
        mb="10px"
        templateColumns="repeat(2, 1fr)"
        gap={'10px'}
      >
        {notes.map((note) => {
          const isActive = note.id === activeCardId;
          return (
            <GridItem
              colSpan={isActive ? 2 : 1}
              order={isActive ? -1 : 'initial'}
              scrollMarginTop={'15px'}
              key={note.id}
              data-note-id={note.id}
            >
              <NoteCard
                isOther={isOther}
                note={note}
                isActive={isActive}
                onClick={() => handleCardClick(note.id)}
                lesson={lesson}
                isTimeline={isTimeline}
                dayDate={dayDate}
                isNotesPage={isNotesPage}
              />
            </GridItem>
          );
        })}
      </Grid>
    </Box>
  );
};

export default NotesList;
