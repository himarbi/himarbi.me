import { Box, Container, Heading, Text, VStack, useColorModeValue, Image, Divider, Badge, HStack, Icon, Flex, Button } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaClock, FaArrowLeft } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { posts } from '../data/posts';
import { useEffect } from 'react';

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

const AllBlogsFull = () => {
    const navigate = useNavigate();

    // Scroll to top on load
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const bgColor = useColorModeValue('white', 'gray.900');
    const headerBg = useColorModeValue('gray.50', 'black');
    const titleColor = useColorModeValue('gray.900', 'white');
    const subtitleColor = useColorModeValue('gray.600', 'gray.400');
    const contentColor = useColorModeValue('gray.700', 'gray.300');
    const cardBorder = useColorModeValue('gray.100', 'gray.800');

    return (
        <Box bg={bgColor} minH="100vh" pb={20}>
            <Helmet>
                <title>All Full Posts | himarbi.</title>
                <meta name="description" content="View all of himarbi's blog posts and writing in full." />
            </Helmet>

            {/* Minimal Header */}
            <Box bg={headerBg} pt={32} pb={20} position="relative" overflow="hidden">
                <Box position="absolute" top="0" left="0" right="0" h="400px" bgGradient="radial(brand.500, transparent)" filter="blur(150px)" opacity={useColorModeValue(0.1, 0.2)} zIndex={0} pointerEvents="none" />
                <Container maxW="container.md" position="relative" zIndex={1}>
                    <Button variant="ghost" leftIcon={<FaArrowLeft />} mb={8} color={subtitleColor} _hover={{ color: titleColor, bg: 'transparent' }} onClick={() => navigate(-1)}>
                        Back
                    </Button>
                    <MotionVStack align="flex-start" spacing={4} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <Heading as="h1" fontSize={{ base: '3xl', md: '5xl' }} fontFamily="'Playfair Display', serif" fontWeight="700" color={titleColor} lineHeight="1.2">
                            All Articles in Full
                        </Heading>
                        <Text fontSize="xl" color={subtitleColor} lineHeight="tall">
                            A continuous feed of all my articles fully loaded on one page.
                        </Text>
                    </MotionVStack>
                </Container>
            </Box>

            <Container maxW="container.md" mt={-6} position="relative" zIndex={2}>
                <VStack spacing={20} align="stretch">
                    {posts.map((post, index) => (
                        <MotionBox
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5 }}
                        >
                            <Box mb={8}>
                                <Badge colorScheme="brand" bg="brand.500" color="white" px={3} py={1} borderRadius="full" mb={4}>
                                    {post.category}
                                </Badge>
                                <Heading as="h2" fontSize={{ base: '3xl', md: '4xl' }} fontFamily="'Playfair Display', serif" fontWeight="700" color={titleColor} mb={4} lineHeight="1.2">
                                    {post.title}
                                </Heading>
                                <Text fontSize="lg" color={subtitleColor} mb={6} lineHeight="tall">
                                    {post.summary}
                                </Text>
                                <HStack fontSize="sm" color={subtitleColor} spacing={6} pb={6} borderBottom="1px solid" borderColor={cardBorder}>
                                    <HStack spacing={2}><Icon as={FaCalendarAlt} /><Text>{post.date}</Text></HStack>
                                    <HStack spacing={2}><Icon as={FaClock} /><Text>{post.readTime}</Text></HStack>
                                </HStack>
                            </Box>

                            <Box borderRadius="2xl" overflow="hidden" boxShadow="xl" mb={10}>
                                <Image src={post.image} alt={post.title} w="full" maxH="400px" objectFit="cover" />
                            </Box>

                            {/* Content Section - Markdown Renderer */}
                            <Box className="markdown-body" color={contentColor} fontSize="lg" lineHeight="1.8" sx={{
                                'h1, h2, h3, h4': {
                                    color: titleColor,
                                    fontFamily: "'Playfair Display', serif",
                                    fontWeight: 700,
                                    mt: 12,
                                    mb: 4
                                },
                                'h2': { fontSize: '3xl' },
                                'h3': { fontSize: '2xl' },
                                'p': { mb: 6 },
                                'a': { color: 'brand.500', textDecoration: 'underline' },
                                'ul, ol': { pl: 6, mb: 6 },
                                'li': { mb: 2 },
                                'blockquote': {
                                    borderLeft: '4px solid',
                                    borderColor: 'brand.500',
                                    pl: 4,
                                    fontStyle: 'italic',
                                    color: subtitleColor,
                                    my: 8
                                },
                                'code': {
                                    bg: useColorModeValue('gray.100', 'whiteAlpha.200'),
                                    px: 2,
                                    py: 0.5,
                                    borderRadius: 'md',
                                    fontSize: '0.9em'
                                }
                            }}>
                                <ReactMarkdown>
                                    {post.content}
                                </ReactMarkdown>
                            </Box>

                            {index !== posts.length - 1 && (
                                <Divider mt={16} mb={8} borderColor={cardBorder} borderWidth="2px" borderRadius="full" />
                            )}
                        </MotionBox>
                    ))}
                </VStack>
            </Container>
        </Box>
    );
};

export default AllBlogsFull;
