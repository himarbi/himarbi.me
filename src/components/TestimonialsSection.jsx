import { Box, SimpleGrid, Heading, Text, VStack, HStack, Avatar, Icon, usePrefersReducedMotion } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { testimonials } from '../data/testimonials';
import { FaQuoteLeft } from 'react-icons/fa';

const MotionBox = motion(Box);

const TestimonialsSection = () => {
    const prefersReducedMotion = usePrefersReducedMotion();

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
        hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <Box id="testimonials" py={20} bg="white">
            <Box maxW="1280px" mx="auto" px={{ base: 6, md: 8 }}>
                <MotionBox
                    initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.5 }}
                >
                    <Heading as="h2" size="2xl" mb={4} textAlign="center">
                        Client Perspectives
                    </Heading>
                    <Text fontSize="lg" color="muted" textAlign="center" maxW="2xl" mx="auto" mb={16}>
                        Hear from people I've worked with about the value I bring to engineering projects.
                    </Text>
                </MotionBox>

                <motion.div
                    variants={prefersReducedMotion ? {} : containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-50px' }}
                >
                    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
                        {testimonials.map((t) => (
                            <MotionBox
                                key={t.id}
                                variants={itemVariants}
                                bg="bg"
                                p={8}
                                borderRadius="2xl"
                                position="relative"
                                boxShadow="md"
                                border="1px solid"
                                borderColor="gray.200"
                                transition="all 0.3s"
                                _hover={{ transform: 'translateY(-4px)', boxShadow: 'xl', borderColor: 'brand.200' }}
                            >
                                <Icon as={FaQuoteLeft} w={10} h={10} color="brand.200" position="absolute" top={6} right={6} opacity={0.5} />
                                <Text fontSize="md" color="gray.700" fontStyle="italic" mb={8} lineHeight="tall" position="relative" zIndex={1}>
                                    "{t.quote}"
                                </Text>
                                <HStack spacing={4}>
                                    <Avatar src={t.avatar} name={t.name} size="md" />
                                    <VStack align="flex-start" spacing={0}>
                                        <Text fontWeight="bold" color="gray.800">{t.name}</Text>
                                        <Text fontSize="sm" color="brand.600">{t.role}</Text>
                                    </VStack>
                                </HStack>
                            </MotionBox>
                        ))}
                    </SimpleGrid>
                </motion.div>
            </Box>
        </Box>
    );
};

export default TestimonialsSection;
