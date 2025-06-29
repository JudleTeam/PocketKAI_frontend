import { useGroup, useNotes, useYaMetrika } from '@/entities';
import {
  Dialog,
  useColor,
  useDisclosure,
  DialogContent,
  DialogTrigger,
  Lesson,
  NoteFormData,
  AnalyticsEvent,
} from '@/shared';
import { NoteForm } from '@/widgets';
import { Box, Button } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

type AddNoteProps = {
  isTimeline: boolean;
  lesson: Lesson;
  dayDate?: string;
};

const AddNote: React.FC<AddNoteProps> = ({ isTimeline, lesson, dayDate }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NoteFormData>();
  const { accentColor, secondaryColor, mainColor } = useColor();
  const { currentGroup } = useGroup();
  const { addNote } = useNotes();
  const { isOpen, setIsOpen } = useDisclosure();
  const { sendEvent } = useYaMetrika();

  const handleAddNote = (data: NoteFormData) => {
    const noteData = {
      title: data.title,
      description: data.description,
      onDiscipline: data.onDiscipline,
      lesson,
      dayDate,
      isTimeline,
      group: currentGroup,
    };

    const result = addNote(noteData);
    if (result) {
      sendEvent(AnalyticsEvent.noteCreate);
      reset();
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Box
          zIndex={'20'}
          w={'100%'}
          boxShadow={`0px 5px 5px 5px ${mainColor}`}
        >
          <Button
            w="100%"
            color={accentColor}
            backgroundColor={secondaryColor}
            borderRadius={'24px'}
            py={4}
          >
            Создать заметку
          </Button>
        </Box>
      </DialogTrigger>
      <DialogContent className="sbg-l-main dark:bg-d-main rounded-xl">
        <NoteForm
          handleSubmit={handleSubmit(handleAddNote)}
          register={register}
          errors={errors}
          isTimeline={isTimeline}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddNote;
