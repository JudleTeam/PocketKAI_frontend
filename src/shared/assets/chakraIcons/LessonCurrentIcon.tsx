import { createIcon } from '@chakra-ui/react';
import { motion } from 'framer-motion';
export const LessonCurrentIcon = createIcon({
  displayName: 'LessonCurrentIcon',
  viewBox: '0 0 24 24',
  path: (
    <motion.path
      animate={{
        scale: [1, 1.02, 1.05, 1.1, 1.05, 1.02, 1],
      }}
      transition={{
        duration: 2,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatDelay: 1,
      }}
      d="m12 2c-5.53 0-10 4.47-10 10 0 5.53 4.47 10 10 10 5.53 0 10-4.47 10-10 0-5.53-4.47-10-10-10zm0 18c-4.42 0-8-3.58-8-8 0-4.42 3.58-8 8-8 4.42 0 8 3.58 8 8 0 4.42-3.58 8-8 8zm-.0002-13.833c-3.2258 0-5.8333 2.6075-5.8333 5.8333 0 3.2259 2.6075 5.8334 5.8333 5.8334 3.2259 0 5.8334-2.6075 5.8334-5.8334 0-3.2258-2.6075-5.8333-5.8334-5.8333z"
      fill="currentColor"
    />
  ),
});
