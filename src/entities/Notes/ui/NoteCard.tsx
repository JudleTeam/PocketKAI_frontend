import {
  AnalyticsEvent,
  ClickSource,
  Dialog,
  DialogContent,
  Lesson,
  Note,
  NoteFormData,
  useColor,
  useDisclosure,
} from '@/shared';
import { Box, Button, Text } from '@chakra-ui/react';
import { EditIcon } from '@/shared/assets/chakraIcons/EditIcon';
import { DeleteIcon } from '@chakra-ui/icons';
import { useNotes } from '../model/notes.store';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { NoteForm } from '@/widgets';
import { useForm } from 'react-hook-form';
import { memo, useEffect } from 'react';
import { useYaMetrika } from '@/entities';

type NoteCardProps = {
  note: Note;
  isActive: boolean;
  onClick: () => void;
  lesson?: Lesson;
  isTimeline: boolean;
  dayDate?: string;
  isOther?: boolean;
  isNotesPage?: boolean;
};

const NoteCard: React.FC<NoteCardProps> = memo(
  ({
    note,
    onClick,
    isActive,
    lesson,
    isTimeline,
    dayDate,
    isOther,
    isNotesPage,
  }) => {
    const { deleteNote } = useNotes();
    const { cardColor, accentColor, primaryColor, noteColor, mainColor } =
      useColor();
    const onDiscipline = note.date ? false : true;
    const {
      register,
      handleSubmit,
      reset,
      watch,
      formState: { errors },
    } = useForm<NoteFormData>({
      defaultValues: {
        title: note.title,
        description: note.description,
        onDiscipline,
        onThisLesson: note.date === dayDate,
      },
    });
    const { sendEvent } = useYaMetrika();
    const { editNote } = useNotes();
    const { isOpen, setIsOpen } = useDisclosure();

    useEffect(() => {
      reset({
        title: note.title,
        description: note.description,
        onDiscipline,
        onThisLesson: note.date === dayDate,
      });
    }, [note, reset, dayDate, onDiscipline]);

    const handleEditNote = (data: NoteFormData) => {
      const noteData = {
        title: data.title,
        description: data.description,
        onDiscipline: data.onDiscipline,
        lesson: lesson ? lesson : undefined,
        isTimeline,
        dayDate: data.onThisLesson ? dayDate : note.date,
      };
      editNote(note.id, noteData);
      sendEvent(AnalyticsEvent.noteEdit, {
        click_source: isNotesPage
          ? ClickSource.notes
          : ClickSource.lessonDrawer,
      });
      reset();
      setIsOpen(false);
    };

    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <Box
          onClick={() => {
            if (isOpen) setIsOpen(false);
            else onClick();
          }}
          backgroundColor={isActive ? accentColor : cardColor}
          padding={'20px'}
          borderRadius={'24px'}
          display={'flex'}
          minHeight={'16dvh'}
          flexDirection={'column'}
          justifyContent={'space-between'}
          transition="transform 0.3s ease"
          cursor="pointer"
          transform={isActive ? 'translateY(-5px)' : 'none'}
        >
          <Box display="flex" flexDir="column" gap="5px">
            {isOther && (
              <Text
                color={isActive ? mainColor : noteColor}
                noOfLines={isActive ? 10 : 2}
                fontSize={'12px'}
                lineHeight={1}
              >
                {note.disciplineName}
                {', гр. '}
                {isActive && note.groupName}
              </Text>
            )}
            <Text
              whiteSpace="normal"
              wordBreak="break-word"
              color={isActive ? mainColor : primaryColor}
              fontWeight="medium"
              noOfLines={isActive ? 5 : 2}
            >
              {note.title}
            </Text>
          </Box>
          {isActive && (
            <Box py="10px" whiteSpace="pre-wrap">
              <Text color={mainColor}>{note.description}</Text>
            </Box>
          )}
          <Box
            display={'flex'}
            justifyContent={
              note.date && isActive ? 'space-between' : 'flex-end'
            }
            alignItems={'center'}
          >
            {note.date && (
              <Text
                textAlign={isActive ? 'left' : 'right'}
                color={isActive ? mainColor : noteColor}
              >
                {note.date}
              </Text>
            )}
            {isActive && (
              <Box display={'flex'} gap={'10px'}>
                <DialogTrigger asChild>
                  <Button
                    backgroundColor={mainColor}
                    padding="0px 40px"
                    borderRadius={'24px'}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <EditIcon w={'18px'} h={'18px'} color={accentColor} />
                  </Button>
                </DialogTrigger>
                <Button
                  backgroundColor={mainColor}
                  padding="0px 40px"
                  borderRadius={'24px'}
                  onClick={() => {
                    deleteNote(note.id);
                    sendEvent(AnalyticsEvent.noteDelete, {
                      click_source: isNotesPage
                        ? ClickSource.notes
                        : ClickSource.lessonDrawer,
                    });
                  }}
                >
                  <DeleteIcon w={'18px'} h={'18px'} color={'red.500'} />
                </Button>
              </Box>
            )}
          </Box>
          <DialogContent
            className="sbg-l-main dark:bg-d-main rounded-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <NoteForm
              handleSubmit={handleSubmit(handleEditNote)}
              register={register}
              errors={errors}
              isTimeline={isTimeline}
              watch={watch}
              isEdit
              onDiscipline={onDiscipline}
            />
          </DialogContent>
        </Box>
      </Dialog>
    );
  }
);

export default NoteCard;
