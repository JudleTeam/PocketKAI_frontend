import { GroupDisciplines, Notes } from '@/shared';

export type AggreagateType = {
  discipline: GroupDisciplines;
  notes: Notes;
};

type AggregateProps = {
  groupDisciplines: GroupDisciplines[];
  notes: Notes;
};

export const aggregateNotes = ({
  groupDisciplines,
  notes,
}: AggregateProps): AggreagateType[] => {
  return groupDisciplines.map((discipline) => {
    const disciplineNotes = notes.filter(
      (item) => item.disciplineId === discipline.id
    );

    return { discipline, notes: disciplineNotes };
  });
};
