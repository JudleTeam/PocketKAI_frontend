import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';
import { TourProvider } from '@reactour/tour';
import { steps } from './steps';
import { useColor } from '@/shared/lib';

export function StyledTourProvider({
  children,
}: React.PropsWithChildren<unknown>) {
  const { mainElementColor, mainColor } = useColor();
  return (
    <TourProvider
      steps={steps}
      onClickHighlighted={(e) => {
        e.stopPropagation();
      }}
      disableInteraction
      prevButton={({ currentStep, setCurrentStep, steps }) => {
        if (!steps?.length) return null;
        const first = currentStep === 0;
        return (
          <IconButton
            bgColor={mainElementColor}
            color={'#fff'}
            borderRadius={5}
            aria-label="Back"
            icon={<ArrowBackIcon w="20px" h="20px" />}
            onClick={() => {
              if (first) {
                setCurrentStep(() => steps.length - 1);
              } else {
                setCurrentStep((s) => s - 1);
              }
            }}
          />
        );
      }}
      nextButton={({ currentStep, stepsLength, setCurrentStep, steps }) => {
        const last = currentStep === stepsLength - 1;
        if (!steps?.length) return null;
        return (
          <IconButton
            bgColor={mainElementColor}
            color={'#fff'}
            borderRadius={5}
            aria-label="Next"
            icon={<ArrowForwardIcon w="20px" h="20px" />}
            disabled={last}
            onClick={() => {
              setCurrentStep((s) => (s === steps?.length - 1 ? 0 : s + 1));
            }}
          />
        );
      }}
      styles={{
        popover: (base) => ({
          ...base,
          '--reactour-accent': mainElementColor,
          backgroundColor: mainColor,
          borderRadius: '8px',
          padding: '30px 40px 20px 40px',
        }),
        close: (base) => ({
          ...base,
          width: '11px',
          right: 10,
          top: 10,
        }),
      }}
    >
      {children}
    </TourProvider>
  );
}
