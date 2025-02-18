import { Box, Text, Divider, useBreakpointValue } from '@chakra-ui/react';
import { AccountTabHeader, useColor } from '@/shared/lib';
import styles from './AboutUs.module.scss';
import { useYaMetrika } from '@/entities';
import { AnalyticsEvent, ClickSource } from '@/shared';

export function AboutUs() {
  const { mainColor, primaryColor, accentColor } = useColor();
  const isDesktop = useBreakpointValue({ base: false, md: true });
  const { sendEvent } = useYaMetrika();
  return (
    <Box className={styles['about']} style={isDesktop ? { width: '40%' } : {}}>
      <Box
        padding="20px 0 0 0"
        position={'sticky'}
        top={'0px'}
        bgColor={mainColor}
        zIndex={'1'}
        boxShadow={`0px 0px 10px 10px ${mainColor}`}
      >
        <AccountTabHeader color={primaryColor}>О нас</AccountTabHeader>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        gap="20px"
        color={primaryColor}
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
          Персонализация: Не можете жить без тёмной темы? Мы сделали настройки
          приложения под ваши личные предпочтения!
        </Text>
        <Divider />
        <Text>
          Мы верим, что технологии должны облегчать жизнь и делать её удобнее.
          Каждую функцию мы разрабатываем с любовью и вниманием к деталям,
          учитывая обратную связь пользователей.
        </Text>
        <Divider />
        <Text>
          Следите за нашими обновлениями и новыми проектами в нашем{' '}
          <a
            onClick={() => {
              sendEvent(AnalyticsEvent.feedbackGoToTg, {
                click_source: ClickSource.aboutUs,
              });
            }}
            href="https://t.me/pocket_kai"
            target="_blank"
            style={{ textDecoration: 'underline', color: accentColor }}
          >
            Telegram-канале PocketKAI
          </a>
          . Мы всегда открыты для ваших предложений и комментариев, которые
          помогают нам становиться лучше!
        </Text>
      </Box>
    </Box>
  );
}
