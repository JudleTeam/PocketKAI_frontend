import {
  Box,
  Divider,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  AccordionItem,
  useBreakpointValue,
} from '@chakra-ui/react';
import { AccountTabHeader, useColor } from '@/shared/lib';
import { getFAQ } from './lib/getFAQ';
import React from 'react';
import styles from './FrequentQuestions.module.scss';
import { useYaMetrika } from '@/entities';

export function FrequentQuestions() {
  const { mainColor, cardColor, primaryColor } = useColor();
  const isDesktop = useBreakpointValue({ base: false, md: true });
  const { sendEvent } = useYaMetrika();
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
        <AccountTabHeader color={primaryColor}>Частые вопросы</AccountTabHeader>
      </Box>
      <Accordion
        w="100%"
        bgColor={cardColor}
        borderRadius="8px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        allowMultiple
      >
        {getFAQ(sendEvent).map((item, index) => (
          <React.Fragment key={item.label}>
            <AccordionItem w="100%" border="0px">
              <AccordionButton padding="20px">
                <Box
                  as="span"
                  color={primaryColor}
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
                color={primaryColor}
                pb={4}
              >
                {item.value}
              </AccordionPanel>
            </AccordionItem>
            <Divider
              w="90%"
              opacity={index === getFAQ(sendEvent).length - 1 ? '0' : '1'}
            />
          </React.Fragment>
        ))}
      </Accordion>
    </Box>
  );
}
