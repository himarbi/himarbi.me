import { Box, Flex, Heading, Text, VStack, HStack, Icon, usePrefersReducedMotion, useColorModeValue } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { motion } from 'framer-motion';
import { FiAward, FiExternalLink } from 'react-icons/fi';
import { certificationsList } from '../data/certifications';

const MotionBox = motion(Box);

const scrollAnimation = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(calc(-100% - 32px)); }
`;

// Repeat the list to ensure it's wide enough for larger screens
const baseRepeat = [...certificationsList, ...certificationsList, ...certificationsList];

const CertificationsSection = () => {
    const prefersReducedMotion = usePrefersReducedMotion();

    const bg = useColorModeValue('white', 'gray.900');
    const titleColor = useColorModeValue('gray.900', 'white');
    const subtitleColor = useColorModeValue('muted', 'gray.400');

    const cardBg = useColorModeValue('white', 'gray.800');
    const cardBorder = useColorModeValue('gray.200', 'whiteAlpha.200');
    const hoverBorderColor = useColorModeValue('brand.200', 'brand.500');

    const cardTitle = useColorModeValue('gray.800', 'white');
    const cardIssuer = useColorModeValue('brand.600', 'brand.300');
    const cardDesc = useColorModeValue('gray.600', 'gray.400');
    const dateBg = useColorModeValue('gray.100', 'whiteAlpha.200');
    const dateColor = useColorModeValue('gray.700', 'whiteAlpha.900');

    const cardBoxShadow = useColorModeValue('md', 'dark-lg');
    const cardHoverBoxShadow = useColorModeValue('xl', 'dark-lg');

    return (
        <Box id="certifications" py={20} bg={bg} overflow="hidden">
            <Box maxW="1280px" mx="auto" px={{ base: 6, md: 8 }} mb={16}>
                <MotionBox
                    initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                >
                    <Heading as="h2" size="2xl" mb={4} textAlign="center" color={titleColor}>
                        Certifications Showcase
                    </Heading>
                    <Text fontSize="lg" color={subtitleColor} textAlign="center" maxW="2xl" mx="auto">
                        A collection of my professional achievements and proven technical capabilities.
                    </Text>
                </MotionBox>
            </Box>

            {/* Scrolling Marquee Container */}
            <Box
                position="relative"
                w="full"
                py={4}
                sx={{
                    _hover: { '.marquee-content': { animationPlayState: 'paused' } },
                    // Fade masks for the edges
                    maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
                }}
            >
                <Flex gap="32px" w="max-content">
                    {/* First Scrolling Block */}
                    <Flex
                        gap="32px"
                        className="marquee-content"
                        animation={prefersReducedMotion ? 'none' : `${scrollAnimation} 40s linear infinite`}
                    >
                        {baseRepeat.map((cert, index) => (
                            <Box
                                key={`first-${cert.id}-${index}`}
                                w={{ base: "300px", md: "400px" }}
                                flexShrink={0}
                                bg={cardBg}
                                p={8}
                                borderRadius="2xl"
                                boxShadow={cardBoxShadow}
                                border="1px solid"
                                borderColor={cardBorder}
                                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                                _hover={{ transform: 'translateY(-6px)', boxShadow: cardHoverBoxShadow, borderColor: hoverBorderColor }}
                                position="relative"
                                display="flex"
                                flexDirection="column"
                            >
                                <Icon as={FiAward} boxSize={10} color={cardIssuer} mb={6} opacity="0.8" />

                                <HStack justify="space-between" align="start" mb={4}>
                                    <VStack align="start" spacing={1}>
                                        <Heading as="h3" size="md" color={cardTitle} lineHeight="tall">
                                            {cert.title}
                                        </Heading>
                                        <Text fontSize="sm" fontWeight="bold" color={cardIssuer} textTransform="uppercase" letterSpacing="wide">
                                            {cert.issuer}
                                        </Text>
                                    </VStack>
                                </HStack>

                                <Text fontSize="md" color={cardDesc} mb={6} flex="1">
                                    {cert.description}
                                </Text>

                                <HStack justify="space-between" mt="auto" pt={4}>
                                    <Text fontSize="sm" fontWeight="semibold" bg={dateBg} color={dateColor} px={3} py={1} borderRadius="md">
                                        Received: {cert.date}
                                    </Text>
                                    {cert.link && cert.link !== "#" && (
                                        <Box as="a" href={cert.link} target="_blank" rel="noopener noreferrer" color="brand.500" _hover={{ color: 'brand.600' }} transition="color 0.2s">
                                            <Icon as={FiExternalLink} boxSize={5} />
                                        </Box>
                                    )}
                                </HStack>
                            </Box>
                        ))}
                    </Flex>

                    {/* Second Scrolling Block (Duplicate) */}
                    <Flex
                        gap="32px"
                        className="marquee-content"
                        aria-hidden="true"
                        animation={prefersReducedMotion ? 'none' : `${scrollAnimation} 40s linear infinite`}
                    >
                        {baseRepeat.map((cert, index) => (
                            <Box
                                key={`second-${cert.id}-${index}`}
                                w={{ base: "300px", md: "400px" }}
                                flexShrink={0}
                                bg={cardBg}
                                p={8}
                                borderRadius="2xl"
                                boxShadow={cardBoxShadow}
                                border="1px solid"
                                borderColor={cardBorder}
                                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                                _hover={{ transform: 'translateY(-6px)', boxShadow: cardHoverBoxShadow, borderColor: hoverBorderColor }}
                                position="relative"
                                display="flex"
                                flexDirection="column"
                            >
                                <Icon as={FiAward} boxSize={10} color={cardIssuer} mb={6} opacity="0.8" />

                                <HStack justify="space-between" align="start" mb={4}>
                                    <VStack align="start" spacing={1}>
                                        <Heading as="h3" size="md" color={cardTitle} lineHeight="tall">
                                            {cert.title}
                                        </Heading>
                                        <Text fontSize="sm" fontWeight="bold" color={cardIssuer} textTransform="uppercase" letterSpacing="wide">
                                            {cert.issuer}
                                        </Text>
                                    </VStack>
                                </HStack>

                                <Text fontSize="md" color={cardDesc} mb={6} flex="1">
                                    {cert.description}
                                </Text>

                                <HStack justify="space-between" mt="auto" pt={4}>
                                    <Text fontSize="sm" fontWeight="semibold" bg={dateBg} color={dateColor} px={3} py={1} borderRadius="md">
                                        Received: {cert.date}
                                    </Text>
                                    {cert.link && cert.link !== "#" && (
                                        <Box as="a" href={cert.link} target="_blank" rel="noopener noreferrer" color="brand.500" _hover={{ color: 'brand.600' }} transition="color 0.2s">
                                            <Icon as={FiExternalLink} boxSize={5} />
                                        </Box>
                                    )}
                                </HStack>
                            </Box>
                        ))}
                    </Flex>
                </Flex>
            </Box>
        </Box>
    );
};

export default CertificationsSection;
