import { Box, SimpleGrid, Heading, Text, Wrap, WrapItem, Badge, usePrefersReducedMotion, useColorModeValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { skillsList } from '../data/skills';

const MotionBox = motion(Box);

const SkillsSection = () => {
    const prefersReducedMotion = usePrefersReducedMotion();

    const bg = useColorModeValue('bg', 'gray.900');
    const cardBg = useColorModeValue('white', 'gray.800');
    const titleColor = useColorModeValue('gray.900', 'white');
    const subtitleColor = useColorModeValue('muted', 'gray.400');
    const borderColor = useColorModeValue('gray.200', 'whiteAlpha.200');
    const hoverBorderColor = useColorModeValue('brand.200', 'brand.500');

    const categoryTitleColor = useColorModeValue('brand.600', 'brand.300');

    const badgeBg = useColorModeValue('gray.100', 'whiteAlpha.200');
    const badgeColor = useColorModeValue('gray.700', 'whiteAlpha.900');

    const cardBoxShadow = useColorModeValue('lg', 'dark-lg');
    const cardHoverBoxShadow = useColorModeValue('xl', 'dark-lg');
    const badgeHoverBg = useColorModeValue('gray.200', 'whiteAlpha.300');

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.95, y: 15 },
        show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4 } },
    };

    return (
        <Box id="skills" py={20} bg={bg}>
            <Box maxW="1280px" mx="auto" px={{ base: 6, md: 8 }}>
                <MotionBox
                    initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                >
                    <Heading as="h2" size="2xl" mb={4} textAlign="center" color={titleColor}>
                        Technical Arsenal
                    </Heading>
                    <Text fontSize="lg" color={subtitleColor} textAlign="center" maxW="2xl" mx="auto" mb={12}>
                        A curated list of my specialized skills and the tools I use to build robust applications.
                    </Text>
                </MotionBox>

                <motion.div
                    variants={prefersReducedMotion ? {} : containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-50px' }}
                >
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
                        {skillsList.map((category) => (
                            <MotionBox
                                key={category.category}
                                variants={itemVariants}
                                bg={cardBg}
                                p={8}
                                borderRadius="2xl"
                                boxShadow={cardBoxShadow}
                                border="1px solid"
                                borderColor={borderColor}
                                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                                _hover={{ transform: 'translateY(-4px)', boxShadow: cardHoverBoxShadow, borderColor: hoverBorderColor }}
                            >
                                <Heading as="h3" size="md" mb={6} color={categoryTitleColor}>
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
                            </MotionBox>
                        ))}
                    </SimpleGrid>
                </motion.div>
            </Box>
        </Box>
    );
};

export default SkillsSection;
