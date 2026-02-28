import { Flex, Heading, Text, VStack, Button, SimpleGrid, useColorModeValue, Image, Badge, HStack, Icon, Box } from '@chakra-ui/react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaArrowRight, FaCalendarAlt, FaClock } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';
import { posts } from '../data/posts';

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

const BlogShowcaseSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const titleColor = useColorModeValue('gray.900', 'white');
    const subtitleColor = useColorModeValue('gray.600', 'gray.400');
    const cardBg = useColorModeValue('white', 'gray.800');
    const cardBorder = useColorModeValue('gray.100', 'gray.700');

    // Select the two newest posts to showcase
    const recentPosts = posts.slice(0, 2);

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
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
    };

    return (
        <Box id="blog-showcase" py={20} bg={useColorModeValue('gray.50', 'black')} ref={ref}>
            <Flex maxW="1280px" mx="auto" px={{ base: 6, md: 8 }} direction="column">

                <MotionVStack
                    spacing={4}
                    align={{ base: 'center', md: 'flex-start' }}
                    textAlign={{ base: 'center', md: 'left' }}
                    mb={12}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "show" : "hidden"}
                >
                    <MotionBox variants={itemVariants}>
                        <Text color="brand.500" fontWeight="bold" textTransform="uppercase" letterSpacing="widest" fontSize="sm">
                            Thoughts & Writing
                        </Text>
                    </MotionBox>
                    <MotionBox variants={itemVariants}>
                        <Heading as="h2" size="2xl" color={titleColor} fontFamily="'Playfair Display', serif" fontWeight="700">
                            Latest Articles
                        </Heading>
                    </MotionBox>
                    <MotionBox variants={itemVariants} maxW="2xl">
                        <Text color={subtitleColor} fontSize="lg">
                            I occasionally write about software engineering, beautiful design patterns, and my journey building products on the web.
                        </Text>
                    </MotionBox>
                </MotionVStack>

                <MotionBox variants={containerVariants} initial="hidden" animate={isInView ? "show" : "hidden"}>
                    <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8} mb={12}>
                        {recentPosts.map((post, index) => (
                            <MotionBox
                                key={index}
                                variants={itemVariants}
                                bg={cardBg}
                                borderRadius="2xl"
                                overflow="hidden"
                                border="1px solid"
                                borderColor={cardBorder}
                                transition="all 0.3s ease"
                                _hover={{ transform: 'translateY(-5px)', boxShadow: 'xl' }}
                                display="flex"
                                flexDirection="column"
                            >
                                <Box h="200px" overflow="hidden" position="relative">
                                    <Badge position="absolute" top={4} left={4} zIndex={2} colorScheme="brand" bg="brand.500" color="white" px={3} py={1} borderRadius="full">
                                        {post.category}
                                    </Badge>
                                    <Image src={post.image} alt={post.title} w="full" h="full" objectFit="cover" transition="transform 0.5s ease" _hover={{ transform: 'scale(1.05)' }} />
                                </Box>
                                <VStack align="flex-start" p={6} spacing={4} flex={1} justify="space-between">
                                    <Box>
                                        <HStack fontSize="sm" color="gray.500" mb={3} spacing={4}>
                                            <HStack spacing={1}><Icon as={FaCalendarAlt} /><Text>{post.date}</Text></HStack>
                                            <HStack spacing={1}><Icon as={FaClock} /><Text>{post.readTime}</Text></HStack>
                                        </HStack>
                                        <Heading as="h3" size="md" mb={2} color={titleColor} lineHeight="tall">
                                            {post.title}
                                        </Heading>
                                        <Text color={subtitleColor} noOfLines={2}>
                                            {post.summary}
                                        </Text>
                                    </Box>
                                    <Button
                                        as={RouterLink}
                                        to={`/blog/${post.id}`}
                                        variant="link"
                                        colorScheme="brand"
                                        rightIcon={<FaArrowRight />}
                                        alignSelf="flex-start"
                                        mt={4}
                                        _hover={{ textDecoration: 'none', transform: 'translateX(4px)' }}
                                        transition="all 0.2s"
                                    >
                                        Read Article
                                    </Button>
                                </VStack>
                            </MotionBox>
                        ))}
                    </SimpleGrid>
                </MotionBox>

                <MotionBox variants={itemVariants} initial="hidden" animate={isInView ? "show" : "hidden"} display="flex" justifyContent="center">
                    <Button
                        as={RouterLink}
                        to="/blog"
                        size="lg"
                        colorScheme="brand"
                        px={10}
                        rounded="full"
                        rightIcon={<FaArrowRight />}
                        _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
                        transition="all 0.2s"
                    >
                        View All Posts
                    </Button>
                </MotionBox>
            </Flex>
        </Box>
    );
};

export default BlogShowcaseSection;
