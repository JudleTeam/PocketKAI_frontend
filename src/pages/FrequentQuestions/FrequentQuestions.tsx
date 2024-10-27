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
  useBreakpointValue,
} from '@chakra-ui/react';
import { AccountTabHeader } from '@/shared/lib';
import { getFAQ } from './lib/getFAQ';
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
  const isDesktop = useBreakpointValue({ base: false, md: true });
  return (
    <Box className={styles['faq']} style={isDesktop ? { width: '40%' } : {}}>
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
        {getFAQ().map((item, index) => (
          <React.Fragment key={item.label}>
            <AccordionItem w="100%" border="0px">
              <AccordionButton padding="20px">
                <Box
                  as="span"
                  color={mainTextColor}
                  flex="1"
                  textAlign="left"
                  fontWeight="bold"
                >
                  {item.label}
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel
                className={styles['panel']}
                color={mainTextColor}
                pb={4}
              >
                {item.value}
              </AccordionPanel>
            </AccordionItem>
            <Divider
              w="90%"
              opacity={index === getFAQ().length - 1 ? '0' : '1'}
            />
          </React.Fragment>
        ))}
      </Accordion>
    </Box>
  );
}
