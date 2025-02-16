import { scheduleActions, settingsActions } from '@/shared';
import { Text } from '@chakra-ui/react';
import React from 'react';
import ActionBlock from './ActionBlock';
import s from './BurgerActions.module.scss';
import { useSettings } from '@/entities';
import { useLocation } from 'react-router-dom';

const BurgerActions: React.FC = () => {
  const { preferencedScheduleView } = useSettings();
  const defaultPath =
    preferencedScheduleView === 'timeline' ? 'schedule' : 'schedule/full';

  const { pathname } = useLocation();

  return (
    <div className={s.root}>
      <Text className={s.root__title}>Расписание</Text>
      <div className={s.root__items}>
        {scheduleActions.map((item) =>
          pathname.slice(1) !== item.path && item.path !== defaultPath ? (
            <ActionBlock key={item.label} item={item} />
          ) : (
            pathname.slice(1) !== item.path &&
            item.path === defaultPath && (
              <ActionBlock key={item.label} item={item} />
            )
          )
        )}
      </div>
      <Text className={s.root__title}>Дополнительно</Text>
      <div className={s.root__items}>
        {settingsActions.map((item) => (
          <ActionBlock key={item.label} item={item} />
        ))}
      </div>
    </div>
  );
};

export default BurgerActions;
