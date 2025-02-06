import { GroupDisciplines, TeachersType } from '@/shared';

export type AggreagateType = {
  discipline: GroupDisciplines;
  teachers: TeachersType[];
};

export const aggregateTeachers = (
  groupDisciplines: GroupDisciplines[]
): AggreagateType[] => {
  return groupDisciplines.map((discipline) => {
    const uniqueTeachers = new Map();

    discipline.types.forEach((disciplineType) => {
      const teacher = disciplineType.teacher || {
        id: `default-${discipline.id}`,
        name: 'Преподаватель кафедры',
      };

      const teacherId = teacher.id;

      if (!uniqueTeachers.has(teacherId)) {
        uniqueTeachers.set(teacherId, {
          teacher,
          parsed_types: [disciplineType.parsed_type],
          original_types: [disciplineType.original_type],
          disciplineName: discipline.name,
          disciplineId: [discipline.id],
        });
      } else {
        const existingTeacher = uniqueTeachers.get(teacherId);
        existingTeacher.parsed_types.push(disciplineType.parsed_type);
        existingTeacher.original_types.push(disciplineType.original_type);
        existingTeacher.disciplineId.push(discipline.id);
      }
    });

    return { discipline, teachers: Array.from(uniqueTeachers.values()) };
  });
};
