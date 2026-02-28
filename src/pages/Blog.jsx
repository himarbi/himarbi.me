import { Box, Container, Heading, Text, VStack, SimpleGrid, useColorModeValue, Badge, Image, Flex, Icon, Button, HStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaHeart, FaCommentDots, FaClock, FaCalendarAlt, FaFire } from 'react-icons/fa';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { posts } from '../data/posts';

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

const Blog = () => {
    const bgColor = useColorModeValue('white', 'gray.900');
    const headerBg = useColorModeValue('gray.50', 'black');
    const titleColor = useColorModeValue('gray.900', 'white');
    const subtitleColor = useColorModeValue('gray.600', 'gray.400');
    const cardBg = useColorModeValue('white', 'gray.800');
    const cardBorder = useColorModeValue('gray.100', 'gray.700');
    const navigate = useNavigate();

    return (
        <Box bg={bgColor} minH="100vh">
            {/* Minimal Header Space for Router Links */}
            <Box bg={headerBg} py={32} position="relative" overflow="hidden">
                <Box position="absolute" top="0" left="0" right="0" h="400px" bgGradient="radial(brand.500, transparent)" filter="blur(150px)" opacity={useColorModeValue(0.1, 0.2)} zIndex={0} pointerEvents="none" />
                <Container maxW="container.xl" position="relative" zIndex={1}>
                    <Button as={RouterLink} to="/" variant="ghost" leftIcon={<FaArrowLeft />} mb={8} color={subtitleColor} _hover={{ color: titleColor, bg: 'transparent' }}>
                        Back to Portfolio
                    </Button>
                    <MotionVStack align="flex-start" spacing={6} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <Heading as="h1" fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }} fontFamily="'Playfair Display', serif" fontWeight="700" color={titleColor}>
                            Blog & Writings.
                        </Heading>
                        <Text fontSize="xl" color={subtitleColor} maxW="2xl" lineHeight="tall">
                            A carefully curated collection of my thoughts, tutorials, and learnings on software engineering and design.
                        </Text>
                    </MotionVStack>
                </Container>
            </Box>

            <Container maxW="container.xl" py={20}>
                {/* Featured Post */}
                <Text fontSize="sm" fontWeight="bold" letterSpacing="widest" textTransform="uppercase" color="brand.500" mb={6} display="flex" alignItems="center">
                    <Icon as={FaFire} mr={2} /> Featured Article
                </Text>
                {posts.filter(p => p.featured).map((post, index) => (
                    <MotionBox
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        bg={cardBg}
                        borderRadius="3xl"
                        overflow="hidden"
                        border="1px solid"
                        borderColor={cardBorder}
                        mb={20}
                        display="flex"
                        flexDirection={{ base: 'column', lg: 'row' }}
                        _hover={{ boxShadow: '2xl', transform: 'translateY(-4px)' }}
                        transitionProperty="all"
                        transitionDuration="0.4s"
                        transitionTimingFunction="ease"
                        cursor="pointer"
                        onClick={() => navigate(`/blog/${post.id}`)}
                    >
                        <Box flex={1} position="relative" minH={{ base: '300px', lg: 'auto' }}>
                            <Badge position="absolute" top={6} left={6} zIndex={2} colorScheme="brand" bg="brand.500" color="white" px={4} py={2} borderRadius="full" fontSize="sm">
                                {post.category}
                            </Badge>
                            <Image src={post.image} alt={post.title} w="full" h="full" objectFit="cover" />
                        </Box>
                        <Flex flex={1} direction="column" justify="center" p={{ base: 8, md: 12 }}>
                            <HStack fontSize="sm" color={subtitleColor} mb={4} spacing={6}>
                                <HStack spacing={2}><Icon as={FaCalendarAlt} /><Text>{post.date}</Text></HStack>
                                <HStack spacing={2}><Icon as={FaClock} /><Text>{post.readTime}</Text></HStack>
                            </HStack>
                            <Heading as="h2" size="2xl" mb={6} color={titleColor} lineHeight="1.2">
                                {post.title}
                            </Heading>
                            <Text color={subtitleColor} fontSize="lg" mb={8} lineHeight="tall">
                                {post.summary}
                            </Text>
                            <HStack justify="space-between" align="center">
                                <Button colorScheme="brand" variant="outline" size="lg" borderRadius="full" px={8}>
                                    Read Article
                                </Button>
                                <HStack color="gray.400" spacing={4} fontSize="lg">
                                    <Icon as={FaHeart} _hover={{ color: 'red.500' }} transition="color 0.2s" cursor="pointer" />
                                    <Icon as={FaCommentDots} _hover={{ color: 'brand.500' }} transition="color 0.2s" cursor="pointer" />
                                </HStack>
                            </HStack>
                        </Flex>
                    </MotionBox>
                ))}

                {/* All Posts Grid */}
                <Flex justify="space-between" align="center" mb={8}>
                    <Text fontSize="2xl" fontWeight="bold" color={titleColor} fontFamily="'Playfair Display', serif">
                        Recent Updates
                    </Text>
                    <Button as={RouterLink} to="/all-blogs" colorScheme="brand" variant="outline" borderRadius="full">
                        Read All Full Articles
                    </Button>
                </Flex>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
                    {posts.filter(p => !p.featured).map((post, index) => (
                        <MotionBox
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                            bg={cardBg}
                            borderRadius="2xl"
                            overflow="hidden"
                            border="1px solid"
                            borderColor={cardBorder}
                            display="flex"
                            flexDirection="column"
                            _hover={{ boxShadow: 'xl', transform: 'translateY(-4px)' }}
                            transitionProperty="all"
                            transitionDuration="0.3s"
                            transitionTimingFunction="ease"
                            cursor="pointer"
                            onClick={() => navigate(`/blog/${post.id}`)}
                        >
                            <Box h="240px" position="relative" overflow="hidden">
                                <Badge position="absolute" top={4} left={4} zIndex={2} colorScheme="brand" bg="brand.500" color="white" px={3} py={1} borderRadius="full">
                                    {post.category}
                                </Badge>
                                <Image src={post.image} alt={post.title} w="full" h="full" objectFit="cover" transition="transform 0.5s" _hover={{ transform: 'scale(1.05)' }} />
                            </Box>
                            <VStack align="flex-start" p={6} spacing={4} flex={1}>
                                <HStack fontSize="xs" color="gray.500" spacing={4}>
                                    <HStack spacing={1}><Icon as={FaCalendarAlt} /><Text>{post.date}</Text></HStack>
                                    <HStack spacing={1}><Icon as={FaClock} /><Text>{post.readTime}</Text></HStack>
                                </HStack>
                                <Heading as="h3" size="md" color={titleColor} lineHeight="tall">
                                    {post.title}
                                </Heading>
                                <Text color={subtitleColor} noOfLines={3} fontSize="sm">
                                    {post.summary}
                                </Text>
                            </VStack>
                        </MotionBox>
                    ))}
                </SimpleGrid>
            </Container>
        </Box>
    );
};

export default Blog;
