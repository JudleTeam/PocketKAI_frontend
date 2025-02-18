import { AnalyticsEvent, ClickSource } from '@/shared';
import { ReactNode } from 'react';

type FAQType = {
  label: string;
  value: ReactNode;
};

export function getFAQ(
  sendEvent: (event: AnalyticsEvent, payload?: Record<string, any>) => void
): FAQType[] {
  return [
    {
      label: 'Что значит воскл. знак или желтая подсветка у пары в расписании?',
      value:
        'Пара подсвечивается жёлтым цветом (полное расписание) или восклицательным знаком (таймлайн), когда полученные от КАИ данные по расписанию не могут быть точными на 100%. Такие пары лучше проверить самостоятельно.',
    },
    {
      label: 'В расписании ошибка. Что делать?',
      value: (
        <span>
          В навигационном меню и в каждой паре есть кнопка сообщить об ошибке,
          где вы можете написать нам об этой проблеме с помощью формы или{' '}
          <a
            onClick={() => {
              sendEvent(AnalyticsEvent.feedbackGoToTg, {
                click_source: ClickSource.faq,
              });
            }}
            href="https://t.me/pocket_kai_help"
            target="_blank"
          >
            нам в поддержку
          </a>
          , и мы оперативно решим вашу проблему!
        </span>
      ),
    },
    {
      label: 'Как вас поддержать?',
      value: (
        <span>
          Мы рады, что вам нравится наше приложение!
          <p>Вы можете поддержать разработчика</p>
          <p>
            1. Сделав донат на{' '}
            <a href="https://www.tinkoff.ru/cf/8X3o9T0FjaS" target="_blank">
              наш счёт
            </a>
          </p>
          <p>2. Рассказав друзьям о нашем приложении</p>
          <p>
            3. Подписавшись на наш Telegram-канал:{' '}
            <a
              onClick={() => {
                sendEvent(AnalyticsEvent.feedbackGoToTg, {
                  click_source: ClickSource.faq,
                });
              }}
              href="https://t.me/pocket_kai"
              target="_blank"
            >
              @pocket_kai
            </a>
          </p>
          Любая поддержка помогает нам улучшать приложение и добавлять новые
          возможности. Спасибо!
        </span>
      ),
    },
    {
      label: 'Как установить приложение?',
      value: (
        <ul
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            listStyleType: 'none',
          }}
        >
          <p>
            Установить наше приложение очень просто, так как оно является
            Progressive Web App (PWA). Чтобы установить через APK переходите в
            наш{' '}
            <a
              onClick={() => {
                sendEvent(AnalyticsEvent.feedbackGoToTg, {
                  click_source: ClickSource.faq,
                });
              }}
              href="https://t.me/pocket_kai"
              target="_blank"
            >
              Telegram-канал
            </a>
            или на страницу в{' '}
            <a
              href="https://www.rustore.ru/catalog/app/ru.pocket_kai.www"
              target="_blank"
            >
              RuStore
            </a>
            .
          </p>
          Вот как это сделать на разных платформах и браузерах:
          <li style={{ fontWeight: '500' }}>Для Android (Google Chrome):</li>
          Откройте приложение в браузере Chrome. Нажмите на три точки в верхнем
          правом углу экрана. Выберите «Добавить на главный экран». Подтвердите
          установку, нажав «Установить».
          <li style={{ fontWeight: '500' }}>Для iOS (Safari):</li>
          Откройте приложение в браузере Safari. Нажмите на значок «Поделиться»
          (квадрат с стрелкой вверх) в нижней части экрана. Выберите «На экран
          «Домой»». Подтвердите, нажав «Добавить».
          <li style={{ fontWeight: '500' }}>
            Для Windows и Mac (Google Chrome):
          </li>
          Откройте приложение в браузере Chrome. В правом верхнем углу нажмите
          на значок установки (обычно в виде плюса или монитора с стрелкой).
          Нажмите «Установить», и приложение будет добавлено на рабочий стол или
          в меню «Пуск».
          <li style={{ fontWeight: '500' }}>
            Для Windows и Mac (Microsoft Edge):
          </li>
          Откройте приложение в браузере Edge. Нажмите на три точки в правом
          верхнем углу. Выберите «Приложения» - «Установить это сайт как
          приложение». Подтвердите установку.
          <li style={{ fontWeight: '500' }}>Для macOS (Safari):</li>
          Откройте приложение в браузере Safari. В верхнем меню выберите «Файл»
          - «Добавить на экран «Домой»». Приложение будет добавлено в Dock как
          отдельная иконка.
        </ul>
      ),
    },
  ];
}
