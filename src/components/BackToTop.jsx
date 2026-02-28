import { useState, useEffect } from 'react';
import { IconButton, useColorModeValue } from '@chakra-ui/react';
import { ArrowUpIcon } from '@chakra-ui/icons';
import { motion, AnimatePresence } from 'framer-motion';

const MotionIconButton = motion(IconButton);

const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scrolled down
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    // Scroll to top smoothly
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <MotionIconButton
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    icon={<ArrowUpIcon boxSize={6} />}
                    onClick={scrollToTop}
                    position="fixed"
                    bottom={8}
                    right={8}
                    zIndex={9999}
                    colorScheme="brand"
                    bg={useColorModeValue('brand.500', 'brand.400')}
                    color="white"
                    isRound
                    size="lg"
                    boxShadow="xl"
                    aria-label="Back to top"
                    _hover={{
                        transform: 'translateY(-3px)',
                        boxShadow: 'dark-lg',
                        bg: useColorModeValue('brand.600', 'brand.300')
                    }}
                    _active={{
                        bg: useColorModeValue('brand.700', 'brand.400')
                    }}
                />
            )}
        </AnimatePresence>
    );
};

export default BackToTop;
