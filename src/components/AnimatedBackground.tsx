import { Box, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const MotionBox = motion(Box);
const MotionText = motion(Text);

interface Position {
  x: number;
  y: number;
}

const getRandomPosition = (): Position => {
  // No-go zone: center 40% width, 40% height (form area)
  const noGoLeft = 30;
  const noGoRight = 70;
  const noGoTop = 25;
  const noGoBottom = 65;
  let x, y;
  let tries = 0;
  do {
    x = 10 + Math.random() * 80;
    y = 10 + Math.random() * 70;
    tries++;
    // Avoid infinite loop in rare case
    if (tries > 20) break;
  } while (x > noGoLeft && x < noGoRight && y > noGoTop && y < noGoBottom);
  return { x, y };
};

const checklistItems = [
  "Plan your day",
  "Set priorities",
  "Break down tasks",
  "Track progress",
  "Review and adjust",
  "Celebrate wins"
];

export const AnimatedBackground = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [position, setPosition] = useState<Position>(getRandomPosition());
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let fadeOutTimeout: number;
    let nextTimeout: number;

    // Fade in
    setVisible(true);
    // Fade out after 1.8s
    fadeOutTimeout = setTimeout(() => setVisible(false), 1800);
    // Move to next item after 2.2s
    nextTimeout = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % checklistItems.length);
      setPosition(getRandomPosition());
      setVisible(true);
    }, 2200);

    return () => {
      clearTimeout(fadeOutTimeout);
      clearTimeout(nextTimeout);
    };
  }, [currentIndex]);

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      zIndex={-1}
      overflow="hidden"
      bg="linear-gradient(135deg, #E6F6FF 0%, #F0F9FF 100%)"
    >
      <MotionBox
        position="absolute"
        left={`${position.x}%`}
        top={`${position.y}%`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: visible ? 1 : 0, scale: visible ? 1.1 : 0.8 }}
        transition={{ duration: 0.4 }}
        display="flex"
        alignItems="center"
        gap={3}
        transform="translate(-50%, -50%)"
        zIndex={0}
        pointerEvents="none"
      >
        <motion.svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(66, 153, 225, 0.8)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: visible ? 1 : 0, opacity: visible ? 1 : 0.5 }}
          transition={{ duration: 0.4 }}
        >
          <motion.path
            d="M20 6L9 17L4 12"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: visible ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          />
        </motion.svg>
        <MotionText
          initial={{ opacity: 0 }}
          animate={{ opacity: visible ? 1 : 0.5 }}
          transition={{ duration: 0.4 }}
          color="blue.500"
          fontSize="2xl"
          fontWeight="bold"
          textShadow="0 0 10px rgba(66, 153, 225, 0.3)"
        >
          {checklistItems[currentIndex]}
        </MotionText>
      </MotionBox>
    </Box>
  );
}; 