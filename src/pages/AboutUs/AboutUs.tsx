import {
  Box,
  useChakra,
  useColorModeValue,
  Text,
  Divider,
} from '@chakra-ui/react';
import { AccountTabHeader } from '@/shared/lib';
import styles from './AboutUs.module.scss';
export function AboutUs() {
  const { theme } = useChakra();
  const mainColor = useColorModeValue(
    theme.colors.light.main,
    theme.colors.dark.main
  );
  const mainTextColor = useColorModeValue(
    theme.colors.light.main_text,
    theme.colors.dark.main_text
  );
  return (
    <Box className={styles['about']}  w={{md: '40%'}}>
      <Box
        padding="20px 0 0 0"
        position={'sticky'}
        top={'0px'}
        bgColor={mainColor}
        zIndex={'1'}
        boxShadow={`0px 0px 10px 10px ${mainColor}`}
      >
        <AccountTabHeader color={mainTextColor}>О нас</AccountTabHeader>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        gap="20px"
        color={mainTextColor}
        fontWeight="medium"
        padding="20px 0 30px 0"
      >
        <Text>
          Вы находитесь в новом творении от Judle Team — приложение для
          просмотра расписания, разработанное с учетом потребностей студентов и
          преподавателей. Мы стремимся улучшить повседневную жизнь студентов с
          помощью следующих функций:
        </Text>
        <Divider />
        <Text>
          Таймлайн: Смотрите какие пары проходят прямо сейчас! Мы добавили ленту
          с парами, чтобы вам было удобнее отслеживать расписание. Кроме того,
          для любителей классики мы оставили возможность смотреть полное
          расписание по чётным и нечётным неделям!
        </Text>
        <Text>
          Доступность: Наше приложение является кроссплатформенным - вы можете
          пользоваться им на Ios, Android и даже ПК!
        </Text>
        <Text>
          Преподаватели: Ищите, находите и просматривайте расписание любого
          преподавателя! Преподаватели выбранной группы уже находятся в быстром
          доступе.
        </Text>
        <Text>
          Вход: Авторизация необязательна - расписание для любой группы можно
          посмотреть здесь и сейчас!
        </Text>
        <Text>
          Персонализация: Не можете жить без тёмной темы? Мы сделали настройки
          приложения под ваши личные предпочтения!
        </Text>
        <Text>
          Центр информации: Не помните свой номер в группе? Хотите посмотреть
          учебный план? Вся информация, доступная на сайте КАИ о вашей группе,
          специальности и вас, доступна и собрана в одном месте!
        </Text>
        <Divider />
        <Text>
          Мы верим, что технологии должны облегчать жизнь и делать её удобнее.
          Каждую функцию мы разрабатываем с любовью и вниманием к деталям,
          учитывая обратную связь пользователей.
        </Text>
        <Divider />
        <Text>
          Следите за нашими обновлениями и новыми проектами. Мы всегда открыты
          для ваших предложений и комментариев, которые помогают нам становиться
          лучше!
        </Text>
      </Box>
    </Box>
  );
}
