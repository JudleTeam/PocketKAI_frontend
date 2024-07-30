import {
  Box,
  useChakra,
  Divider,
  useColorModeValue,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  AccordionItem,
} from '@chakra-ui/react';
import { AccountTabHeader } from '@/shared/lib';
import React from 'react';
import styles from './FrequentQuestions.module.scss';
export function FrequentQuestions() {
  const { theme } = useChakra();
  const mainColor = useColorModeValue(
    theme.colors.light.main,
    theme.colors.dark.main
  );
  const mainTextColor = useColorModeValue(
    theme.colors.light.main_text,
    theme.colors.dark.main_text
  );
  const card = useColorModeValue('light.card', 'dark.card');
  const accordion = [
    { label: 'Как открыть приложение', value: 'Item' },
    { label: 'Как посмотреть расписание', value: 'Item' },
    { label: 'Как войти в аккаунт', value: 'Item' },
    { label: 'Как посмотреть преподавателей', value: 'Item' },
    { label: 'Как посмотреть задания', value: 'Item' },
    { label: 'Как написать заметки', value: 'Item' },
  ];
  return (
    <Box className={styles['faq']}>
      <Box
        padding="20px 0 0 0"
        position={'sticky'}
        top={'0px'}
        bgColor={mainColor}
        zIndex={'1'}
        boxShadow={`0px 0px 10px 10px ${mainColor}`}
      >
        <AccountTabHeader color={mainTextColor}>
          Частые вопросы
        </AccountTabHeader>
      </Box>
      <Accordion
        w="100%"
        bgColor={card}
        borderRadius="8px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        allowMultiple
      >
        {accordion.map((item, index) => (
          <React.Fragment key={item.label}>
            <AccordionItem w="100%" border="0px">
              <h2>
                <AccordionButton padding="20px">
                  <Box
                    as="span"
                    color={mainTextColor}
                    flex="1"
                    textAlign="left"
                    fontWeight='medium'
                  >
                    {item.label}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel color={mainTextColor} pb={4}>
                {item.value}
              </AccordionPanel>
            </AccordionItem>
            <Divider
              w="90%"
              opacity={index === accordion.length - 1 ? '0' : '1'}
            />
          </React.Fragment>
        ))}
      </Accordion>
    </Box>
  );
}
