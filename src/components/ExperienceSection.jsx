import { Box, Heading, Text, VStack, HStack, Circle, Divider, usePrefersReducedMotion, useColorModeValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { experienceList } from '../data/experience';

const MotionBox = motion(Box);
const MotionHStack = motion(HStack);

const ExperienceSection = () => {
    const prefersReducedMotion = usePrefersReducedMotion();

    const bg = useColorModeValue('white', 'gray.900');
    const titleColor = useColorModeValue('gray.900', 'white');
    const subtitleColor = useColorModeValue('muted', 'gray.400');

    const cardBg = useColorModeValue('white', 'gray.800');
    const cardBorder = useColorModeValue('gray.200', 'whiteAlpha.200');
    const cardTitle = useColorModeValue('gray.800', 'white');
    const cardCompany = useColorModeValue('gray.600', 'gray.400');
    const cardText = useColorModeValue('gray.700', 'gray.300');

    const dateBg = useColorModeValue('brand.50', 'whiteAlpha.100');
    const dateColor = useColorModeValue('brand.600', 'brand.300');
    const lineBg = useColorModeValue('brand.100', 'whiteAlpha.200');

    const cardBoxShadow = useColorModeValue('md', 'dark-lg');
    const cardHoverBoxShadow = useColorModeValue('xl', 'dark-lg');

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: prefersReducedMotion ? 0 : -30 },
        show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
    };

    return (
        <Box id="experience" py={20} bg={bg}>
            <Box maxW="1000px" mx="auto" px={{ base: 6, md: 8 }}>
                <MotionBox
                    initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                >
                    <Heading as="h2" size="2xl" mb={4} textAlign="center" color={titleColor}>
                        Professional Journey
                    </Heading>
                    <Text fontSize="lg" color={subtitleColor} textAlign="center" maxW="2xl" mx="auto" mb={16}>
                        A timeline of my growth and contributions leading engineering teams to success.
                    </Text>
                </MotionBox>

                <motion.div
                    variants={prefersReducedMotion ? {} : containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-100px' }}
                >
                    <VStack spacing={0} align="stretch" position="relative">
                        {/* Timeline Line */}
                        <Box
                            position="absolute"
                            left={{ base: "10px", md: "24px" }}
                            top="0"
                            bottom="0"
                            w="2px"
                            bg={lineBg}
                            zIndex={0}
                        />

                        {experienceList.map((exp, index) => (
                            <MotionHStack
                                key={exp.id}
                                variants={itemVariants}
                                align="flex-start"
                                spacing={{ base: 4, md: 10 }}
                                position="relative"
                                pb={index === experienceList.length - 1 ? 0 : 12}
                                zIndex={1}
                            >
                                {/* Timeline Dot */}
                                <Circle
                                    size={{ base: "20px", md: "50px" }}
                                    bg={cardBg}
                                    border="4px solid"
                                    borderColor="brand.500"
                                    boxShadow="md"
                                    mt={1}
                                />

                                {/* Content Card */}
                                <Box
                                    bg={cardBg}
                                    p={{ base: 6, md: 8 }}
                                    borderRadius="2xl"
                                    boxShadow={cardBoxShadow}
                                    border="1px solid"
                                    borderColor={cardBorder}
                                    flex="1"
                                    transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                                    _hover={{ boxShadow: cardHoverBoxShadow, transform: 'translateY(-2px)' }}
                                >
                                    <HStack justify="space-between" align="center" mb={2} wrap="wrap">
                                        <Heading as="h3" size="lg" color={cardTitle}>
                                            {exp.role}
                                        </Heading>
                                        <Text fontSize="sm" fontWeight="bold" color={dateColor} bg={dateBg} px={3} py={1} borderRadius="full">
                                            {exp.date}
                                        </Text>
                                    </HStack>
                                    <Text fontSize="md" fontWeight="bold" color={cardCompany} mb={4} textTransform="uppercase" letterSpacing="wide">
                                        {exp.company}
                                    </Text>
                                    <Divider mb={4} borderColor={cardBorder} />
                                    <VStack align="flex-start" spacing={3}>
                                        {exp.achievements.map((achievement, i) => (
                                            <HStack key={i} align="flex-start" spacing={3}>
                                                <Box color="brand.500" mt={1}>•</Box>
                                                <Text color={cardText} fontSize="md" lineHeight="tall">{achievement}</Text>
                                            </HStack>
                                        ))}
                                    </VStack>
                                </Box>
                            </MotionHStack>
                        ))}
                    </VStack>
                </motion.div>
            </Box>
        </Box>
    );
};

export default ExperienceSection;
