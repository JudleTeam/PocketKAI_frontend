import { GroupDisciplines, Notes } from '@/shared';

export type AggreagateType = {
  discipline: GroupDisciplines;
  disciplineNotes: Notes;
};

type AggregateProps = {
  groupDisciplines: GroupDisciplines[];
  notes: Notes;
};

export const aggregateNotes = ({
  groupDisciplines,
  notes,
}: AggregateProps): AggreagateType[] => {
  const aggregated = groupDisciplines.map((discipline) => {
    const disciplineNotes = notes.filter(
      (item) => item.disciplineId === discipline.id
    );
    return { discipline, disciplineNotes: disciplineNotes };
  });

  const uncategorizedNotes = notes.filter(
    (note) =>
      !groupDisciplines.some(
        (discipline) => discipline.id === note.disciplineId
      )
  );

  if (uncategorizedNotes.length > 0) {
    aggregated.push({
      discipline: {
        id: 'uncategorized',
        name: 'Прочее',
      } as GroupDisciplines,
      disciplineNotes: uncategorizedNotes,
    });
  }

  return aggregated;
};
