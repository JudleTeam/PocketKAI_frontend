import { useColor } from '@/shared';
import { TabList, Tab } from '@chakra-ui/react';

type WeekTabsProps = {
  handleTabChange: (index: number) => void;
};
const WeekTabs: React.FC<WeekTabsProps> = ({ handleTabChange }) => {
  const {
    drawerColor,
    secondElementColor,
    secondElementLightColor,
    cardColor,
  } = useColor();

  return (
    <TabList
      padding="5px"
      position="sticky"
      top="0"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      backgroundColor={drawerColor}
      zIndex={100}
      boxShadow={`0 0 10px 10px ${drawerColor}`}
    >
      <Tab
        _selected={{
          color: secondElementLightColor,
          boxShadow: `0 0 5px 0 rgba(0, 0, 0, 0.2)`,
          borderRadius: '4px',
          bgColor: cardColor,
        }}
        fontSize={'clamp(14px, 4vw, 20px)'}
        color={secondElementColor}
        fontWeight="medium"
        onClick={() => {
          handleTabChange(0);
        }}
      >
        Чётная неделя
      </Tab>
      <Tab
        _selected={{
          color: secondElementLightColor,
          boxShadow: `0 0 5px 0 rgba(0, 0, 0, 0.2)`,
          borderRadius: '4px',
          bgColor: cardColor,
        }}
        fontSize={'clamp(14px, 4vw, 20px)'}
        color={secondElementColor}
        fontWeight="medium"
        onClick={() => {
          handleTabChange(1);
        }}
      >
        Нечётная неделя
      </Tab>
    </TabList>
  );
};

export default WeekTabs;
