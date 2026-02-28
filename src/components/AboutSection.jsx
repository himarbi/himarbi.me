import {
    Box,
    SimpleGrid,
    Heading,
    Text,
    VStack,
    usePrefersReducedMotion,
    Wrap,
    WrapItem,
    Badge,
    useColorModeValue
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { skillsList } from '../data/skills';

const MotionBox = motion(Box);

const AboutSection = () => {
    const prefersReducedMotion = usePrefersReducedMotion();

    const bg = useColorModeValue('white', 'gray.900');
    const titleColor = useColorModeValue('gray.900', 'white');
    const subtitleColor = useColorModeValue('brand.500', 'brand.300');
    const textColor = useColorModeValue('gray.700', 'gray.300');
    const headingColor = useColorModeValue('gray.800', 'gray.100');

    const featureBg = useColorModeValue('bg', 'gray.800');
    const featureBorder = useColorModeValue('gray.200', 'whiteAlpha.200');
    const featureHoverBorder = useColorModeValue('brand.200', 'brand.500');
    const categoryTitleColor = useColorModeValue('brand.600', 'brand.300');

    const badgeBg = useColorModeValue('gray.100', 'whiteAlpha.200');
    const badgeColor = useColorModeValue('gray.700', 'whiteAlpha.900');
    const badgeHoverBg = useColorModeValue('gray.200', 'whiteAlpha.300');

    const featureHoverBoxShadow = useColorModeValue('md', 'dark-lg');

    return (
        <Box id="about" py={20} bg={bg}>
            <Box maxW="1280px" mx="auto" px={{ base: 6, md: 8 }}>
                <MotionBox
                    initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                >
                    <Heading as="h2" size="2xl" mb={12} textAlign="center" color={titleColor}>
                        Behind the Code & Arsenal
                    </Heading>
                </MotionBox>

                <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={12} alignItems="center">
                    <MotionBox
                        initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                    >
                        <VStack align={{ base: 'center', lg: 'flex-start' }} textAlign={{ base: 'center', lg: 'left' }} spacing={6}>
                            <Text fontSize="xl" fontWeight="semibold" color={subtitleColor}>
                                What I bring to the table
                            </Text>
                            <Text fontSize="lg" color={textColor} lineHeight="tall">
                                As a motivated Junior Developer, my core focus is bridging the gap between elegant design and clean technical architecture. I believe that performance and accessibility are not afterthoughts, but foundational pillars of good UI engineering.
                            </Text>
                            <Text fontSize="lg" color={textColor} lineHeight="tall">
                                I have spent my recent time honing my skills in modern tools like React and JavaScript to deliver products that look great and feel incredibly responsive.
                            </Text>

                            <Box mt={4}>
                                <Text fontWeight="bold" mb={3} color={headingColor} textAlign={{ base: 'center', lg: 'left' }}>Core Technologies</Text>
                                <Wrap spacing={2} justify={{ base: 'center', lg: 'flex-start' }}>
                                    {['HTML', 'CSS', 'Bootstrap', 'JavaScript', 'React', 'Python', 'Java', 'SQL', 'Git', 'GitHub', 'CLI'].map((tech) => (
                                        <WrapItem key={tech}>
                                            <Badge colorScheme="blue" variant="subtle" px={3} py={1} borderRadius="md" transition="all 0.2s" _hover={{ transform: 'scale(1.05)', bg: badgeHoverBg }}>
                                                {tech}
                                            </Badge>
                                        </WrapItem>
                                    ))}
                                </Wrap>
                            </Box>
                        </VStack>
                    </MotionBox>

                    <MotionBox
                        initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                    >
                        <VStack spacing={6} align="stretch">
                            {skillsList.map((category, index) => (
                                <Box
                                    key={index}
                                    p={6}
                                    bg={featureBg}
                                    borderRadius="xl"
                                    border="1px solid"
                                    borderColor={featureBorder}
                                    transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                                    _hover={{ boxShadow: featureHoverBoxShadow, transform: 'translateX(4px)', borderColor: featureHoverBorder }}
                                >
                                    <Heading as="h3" size="md" mb={4} color={categoryTitleColor}>
                                        {category.category}
                                    </Heading>
                                    <Wrap spacing={3}>
                                        {category.skills.map((skill) => (
                                            <WrapItem key={skill}>
                                                <Badge
                                                    colorScheme="gray"
                                                    bg={badgeBg}
                                                    color={badgeColor}
                                                    px={4}
                                                    py={2}
                                                    borderRadius="full"
                                                    fontSize="sm"
                                                    fontWeight="medium"
                                                    textTransform="none"
                                                    transition="all 0.2s"
                                                    _hover={{ transform: 'scale(1.05)', bg: badgeHoverBg }}
                                                >
                                                    {skill}
                                                </Badge>
                                            </WrapItem>
                                        ))}
                                    </Wrap>
                                </Box>
                            ))}
                        </VStack>
                    </MotionBox>
                </SimpleGrid>
            </Box>
        </Box>
    );
};

export default AboutSection;
