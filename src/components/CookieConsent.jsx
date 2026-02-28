import { useState, useEffect } from 'react';
import { Box, Flex, Text, Button, useColorModeValue, Container, HStack, Icon, Slide } from '@chakra-ui/react';
import { FaCookieBite } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';

const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [hasConsented, setHasConsented] = useState(() => {
        return localStorage.getItem('himarbi_cookie_consent') === 'true';
    });

    useEffect(() => {
        // Delay showing logic slightly so it organically pops up after entry
        if (hasConsented) return;

        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 1500);

        return () => clearTimeout(timer);
    }, [hasConsented]);

    const handleAccept = () => {
        localStorage.setItem('himarbi_cookie_consent', 'true');
        setIsVisible(false);
        setTimeout(() => setHasConsented(true), 400); // Unmount after sliding out
    };

    if (hasConsented) return null;

    const bg = useColorModeValue('white', 'gray.800');
    const border = useColorModeValue('gray.200', 'gray.700');
    const shadow = useColorModeValue('2xl', 'dark-lg');
    const color = useColorModeValue('gray.700', 'gray.100');

    return (
        <Slide direction="bottom" in={isVisible} style={{ zIndex: 10000, margin: '20px' }}>
            <Container maxW="container.md" centerContent>
                <Box
                    bg={bg}
                    p={{ base: 4, md: 5 }}
                    width="full"
                    borderRadius="2xl"
                    boxShadow={shadow}
                    border="1px solid"
                    borderColor={border}
                >
                    <Flex direction={{ base: 'column', md: 'row' }} align="center" justify="space-between" gap={4}>
                        <HStack spacing={4} align="flex-start" flex={1}>
                            <Icon as={FaCookieBite} boxSize={8} color="brand.500" mt={1} />
                            <Box>
                                <Text fontWeight="bold" fontSize="md" mb={1} color={color}>
                                    We value your privacy
                                </Text>
                                <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
                                    This website uses cookies (including third-party Google AdSense tracking) to enhance your browsing experience and serve personalized ads. By interacting with the site, you agree to our{' '}
                                    <Text as={RouterLink} to="/privacy-policy" color="brand.500" fontWeight="bold" _hover={{ textDecoration: 'underline' }}>
                                        Privacy Policy
                                    </Text>.
                                </Text>
                            </Box>
                        </HStack>
                        <Button colorScheme="brand" onClick={handleAccept} px={8} borderRadius="full" size="md" w={{ base: 'full', md: 'auto' }}>
                            Accept All
                        </Button>
                    </Flex>
                </Box>
            </Container>
        </Slide>
    );
};

export default CookieConsent;
