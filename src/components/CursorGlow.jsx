import { useState, useEffect } from 'react';
import { Box, usePrefersReducedMotion, useColorModeValue } from '@chakra-ui/react';
import { motion, useSpring } from 'framer-motion';

const MotionBox = motion(Box);

const CursorGlow = () => {
    const prefersReducedMotion = usePrefersReducedMotion();
    const cursorColor = useColorModeValue('rgba(37, 99, 235, 0.1)', 'rgba(96, 165, 250, 0.15)');

    const springConfig = { damping: 25, stiffness: 700 };
    const mouseX = useSpring(0, springConfig);
    const mouseY = useSpring(0, springConfig);

    useEffect(() => {
        if (prefersReducedMotion) return;

        const handleMouseMove = (e) => {
            mouseX.set(e.clientX - 150); // Offset by half the width/height to center
            mouseY.set(e.clientY - 150);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY, prefersReducedMotion]);

    if (prefersReducedMotion) return null;

    return (
        <MotionBox
            position="fixed"
            top={0}
            left={0}
            w="300px"
            h="300px"
            bg={`radial-gradient(circle, ${cursorColor} 0%, transparent 70%)`}
            borderRadius="full"
            pointerEvents="none"
            zIndex={9998} // Behind header but above content
            style={{
                x: mouseX,
                y: mouseY,
            }}
        />
    );
};

export default CursorGlow;
