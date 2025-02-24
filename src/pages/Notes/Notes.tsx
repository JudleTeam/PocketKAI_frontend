import { useGroup, useNotes, useYaMetrika } from '@/entities';
import { useEffect, useMemo } from 'react';
import { aggregateNotes } from './lib/aggregateNotes';
import { NotesList } from '@/widgets';
import {
  Box,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import {
  AccountTabHeader,
  AnalyticsEvent,
  IdleMessage,
  Loader,
  useColor,
} from '@/shared';
import s from './Notes.module.scss';
import { ElipsisIcon } from '@/shared/assets/chakraIcons/ElipsisIcon';

export function Notes() {
  const { primaryColor, mainColor, accentColor, secondaryColor } = useColor();
  const {
    groupDisciplines,
    currentGroup,
    groupDisciplinesStatus,
    getGroupDisciplines,
  } = useGroup();

  const { notes, findNoteInGroup, deleteAllNotes, deleteNotesForGroup } =
    useNotes();
  const { sendEvent } = useYaMetrika();

  useEffect(() => {
    if (currentGroup && groupDisciplinesStatus === 'idle') {
      getGroupDisciplines(currentGroup.id);
    }
  }, [currentGroup, groupDisciplinesStatus, getGroupDisciplines]);

  const aggregatedNotes = useMemo(() => {
    if (groupDisciplines && notes.length > 0) {
      return aggregateNotes({ groupDisciplines, notes });
    }
    return [];
  }, [groupDisciplines, notes]);

  const isGroupExists =
    currentGroup && findNoteInGroup(currentGroup.group_name);

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
          <AccountTabHeader color={primaryColor}>
            <Box display="flex" justifyContent={'space-between'}>
              <Text>Ваши заметки</Text>
              {notes.length > 0 && (
                <Menu>
                  <MenuButton>
                    <ElipsisIcon />
                  </MenuButton>
                  <MenuList
                    fontSize={'14px'}
                    fontWeight={'regular'}
                    backgroundColor={mainColor}
                    borderRadius={'16px '}
                    padding={0}
                  >
                    {isGroupExists && (
                      <MenuItem
                        onClick={() => {
                          deleteNotesForGroup(currentGroup.group_name);
                          sendEvent(AnalyticsEvent.noteDeleteAll);
                        }}
                        backgroundColor={mainColor}
                        color={accentColor}
                        py={'15px'}
                        borderRadius={'16px 16px 0 0'}
                        _hover={{ backgroundColor: secondaryColor }}
                        _focus={{ backgroundColor: secondaryColor }}
                      >
                        Удалить заметки группы
                      </MenuItem>
                    )}
                    <MenuItem
                      onClick={() => {
                        deleteAllNotes();
                        sendEvent(AnalyticsEvent.noteDeleteAll);
                      }}
                      backgroundColor={mainColor}
                      color={accentColor}
                      py={'15px'}
                      borderRadius={isGroupExists ? '0 0 16px 16px' : '16px'}
                      _hover={{ backgroundColor: secondaryColor }}
                      _focus={{ backgroundColor: secondaryColor }}
                    >
                      Удалить все заметки
                    </MenuItem>
                  </MenuList>
                </Menu>
              )}
            </Box>
          </AccountTabHeader>
        </Box>
        {notes.length < 1 ? (
          <Box
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            h="60dvh"
          >
            <Text fontSize={'18px'} color={primaryColor}>
              Список заметок пуст!
            </Text>
          </Box>
        ) : (
          aggregatedNotes.map(({ discipline, disciplineNotes }) => {
            if (disciplineNotes.length < 1) return;
            return (
              <Box key={discipline.id} w={{ base: '100%', md: '40%' }}>
                <Text
                  className={s.root__disciplineName}
                  color={primaryColor}
                  noOfLines={2}
                >
                  {discipline.name}
                </Text>
                <NotesList
                  isOther={discipline.id === 'uncategorized'}
                  isNotesPage
                  notes={disciplineNotes}
                  isTimeline={false}
                />
              </Box>
            );
          })
        )}
      </Box>
    </Loader>
  );
}
