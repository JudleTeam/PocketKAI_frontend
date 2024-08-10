import { useGroup } from '@/entities';
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useColor } from '@/shared/lib';
import styles from './Teachers.module.scss';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { GroupTeachers, SearchedTeachers } from '@/widgets';

export function Teachers() {
  const { mainTextColor, mainColor } = useColor();
  const { currentGroup } = useGroup();
  const [layoutType, setLayoutType] = useState<'group' | 'searched'>('group');

  return (
    <Box id="teacher" className={styles['teachers']}>
      <Menu>
        <Box
          position="fixed"
          textAlign="left"
          w="90%"
          zIndex="1"
          boxShadow={`0px 0px 10px 10px ${mainColor}`}
          bgColor={mainColor}
        >
          <MenuButton
            as={Button}
            p={0}
            rightIcon={<ChevronDownIcon />}
            fontSize="20px"
            fontWeight="bold"
            color={mainTextColor}
            bgColor={mainColor}
          >
            {layoutType === 'group'
              ? `Преподаватели ${currentGroup?.group_name ? `гр. ${currentGroup.group_name}` : '' }`
              : 'Поиск преподов'}
          </MenuButton>
        </Box>
        <MenuList>
          <MenuOptionGroup type="radio" value={layoutType}>
            <MenuItemOption
              value="group"
              onClick={() => setLayoutType('group')}
            >
              Преподы группы
            </MenuItemOption>
            <MenuItemOption
              value="searched"
              onClick={() => setLayoutType('searched')}
            >
              Поиск преподов
            </MenuItemOption>
          </MenuOptionGroup>
        </MenuList>
      </Menu>

      {layoutType === 'group' && <GroupTeachers />}
      {layoutType === 'searched' && <SearchedTeachers />}
    </Box>
  );
}
