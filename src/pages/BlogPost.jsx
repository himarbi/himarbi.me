import { Box, Container, Heading, Text, Flex, Button, useColorModeValue, Image, Badge, HStack, Icon, Divider, VStack, useToast, Input, Textarea, FormControl, FormLabel } from '@chakra-ui/react';
import { useParams, Link as RouterLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaHeart, FaCalendarAlt, FaClock, FaShareAlt, FaPaperPlane } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import { Helmet } from 'react-helmet-async';
import { posts } from '../data/posts';
import { useEffect, useState } from 'react';

const MotionBox = motion(Box);

const BlogPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const toast = useToast();

    const [name, setName] = useState('');
    const [comment, setComment] = useState('');

    // Find the current post
    const post = posts.find(p => p.id === id);

    // Scroll to top on load
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    const bgColor = useColorModeValue('white', 'gray.900');
    const headerBg = useColorModeValue('gray.50', 'black');
    const titleColor = useColorModeValue('gray.900', 'white');
    const subtitleColor = useColorModeValue('gray.600', 'gray.400');
    const contentColor = useColorModeValue('gray.700', 'gray.300');
    const cardBorder = useColorModeValue('gray.100', 'gray.800');

    // Functional Handlers
    const handleShare = async () => {
        const urlToShare = window.location.href;
        if (navigator.share) {
            try {
                await navigator.share({
                    title: post.title,
                    text: post.summary,
                    url: urlToShare,
                });
            } catch (err) {
                console.log("Share canceled", err);
            }
        } else {
            navigator.clipboard.writeText(urlToShare);
            toast({
                title: "Link Copied!",
                description: "Article link copied to clipboard.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (!name.trim() || !comment.trim()) {
            toast({
                title: "Missing Fields",
                description: "Please enter your name and comment.",
                status: "warning",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        const subject = encodeURIComponent(`New Blog Comment: ${post.title}`);
        const body = encodeURIComponent(`Name: ${name}\n\nComment:\n${comment}`);
        window.location.href = `mailto:himarbi.dev@gmail.com?subject=${subject}&body=${body}`;

        setName('');
        setComment('');

        toast({
            title: "Email Client Opened",
            description: "Please send the email to submit your comment to the author!",
            status: "success",
            duration: 5000,
            isClosable: true,
        });
    };

    // Handle 404 cleanly
    if (!post) {
        return (
            <Flex minH="100vh" align="center" justify="center" bg={bgColor} direction="column" gap={6}>
                <Heading>Article not found</Heading>
                <Button as={RouterLink} to="/blog" colorScheme="brand">Return to Blog</Button>
            </Flex>
        );
    }

    return (
        <Box bg={bgColor} minH="100vh" pb={20}>
            <Helmet>
                <title>{post.title} | himarbi.</title>
                <meta name="description" content={post.summary} />
                {/* Open Graph / Facebook */}
                <meta property="og:type" content="article" />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:title" content={post.title} />
                <meta property="og:description" content={post.summary} />
                <meta property="og:image" content={post.image} />
                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={window.location.href} />
                <meta property="twitter:title" content={post.title} />
                <meta property="twitter:description" content={post.summary} />
                <meta property="twitter:image" content={post.image} />
            </Helmet>

            {/* Minimal Header */}
            <Box bg={headerBg} pt={32} pb={20} position="relative" overflow="hidden">
                <Box position="absolute" top="0" left="0" right="0" h="400px" bgGradient="radial(brand.500, transparent)" filter="blur(150px)" opacity={useColorModeValue(0.1, 0.2)} zIndex={0} pointerEvents="none" />
                <Container maxW="container.md" position="relative" zIndex={1}>
                    <Button variant="ghost" leftIcon={<FaArrowLeft />} mb={8} color={subtitleColor} _hover={{ color: titleColor, bg: 'transparent' }} onClick={() => navigate(-1)}>
                        Back
                    </Button>
                    <MotionBox initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <Badge colorScheme="brand" bg="brand.500" color="white" px={3} py={1} borderRadius="full" mb={6}>
                            {post.category}
                        </Badge>
                        <Heading as="h1" fontSize={{ base: '3xl', md: '5xl' }} fontFamily="'Playfair Display', serif" fontWeight="700" color={titleColor} mb={6} lineHeight="1.2">
                            {post.title}
                        </Heading>
                        <Text fontSize="xl" color={subtitleColor} mb={8} lineHeight="tall">
                            {post.summary}
                        </Text>
                        <HStack fontSize="sm" color={subtitleColor} spacing={6} pb={8} borderBottom="1px solid" borderColor={cardBorder}>
                            <HStack spacing={2}><Icon as={FaCalendarAlt} /><Text>{post.date}</Text></HStack>
                            <HStack spacing={2}><Icon as={FaClock} /><Text>{post.readTime}</Text></HStack>
                        </HStack>
                    </MotionBox>
                </Container>
            </Box>

            <Container maxW="container.md" mt={-10} position="relative" zIndex={2}>
                <MotionBox initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                    <Box borderRadius="2xl" overflow="hidden" boxShadow="2xl" mb={12}>
                        <Image src={post.image} alt={post.title} w="full" maxH="500px" objectFit="cover" />
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

                    <Divider my={12} borderColor={cardBorder} />

                    <Flex justify="space-between" align="center">
                        <HStack color="gray.400" spacing={4} fontSize="xl">
                            <Icon as={FaHeart} _hover={{ color: 'red.500' }} transition="color 0.2s" cursor="pointer" />
                            <Text fontSize="sm" fontWeight="medium">Appreciate this post</Text>
                        </HStack>
                        <Button leftIcon={<FaShareAlt />} variant="outline" size="sm" borderRadius="full" onClick={handleShare}>
                            Share
                        </Button>
                    </Flex>

                    {/* Comment Section */}
                    <Box mt={16} bg={useColorModeValue('gray.50', 'gray.800')} p={8} borderRadius="2xl" border="1px solid" borderColor={cardBorder}>
                        <VStack align="flex-start" spacing={6}>
                            <Box>
                                <Heading as="h3" size="lg" mb={2} color={titleColor} fontFamily="'Playfair Display', serif">
                                    Leave a Comment
                                </Heading>
                                <Text color={subtitleColor}>
                                    Have thoughts on this post? Send me an email and I'll read it directly!
                                </Text>
                            </Box>

                            <Box w="full" as="form" onSubmit={handleCommentSubmit}>
                                <VStack spacing={4} align="flex-start">
                                    <FormControl isRequired>
                                        <FormLabel color={contentColor}>Name</FormLabel>
                                        <Input
                                            placeholder="Your name"
                                            bg={useColorModeValue('white', 'gray.700')}
                                            border={0}
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel color={contentColor}>Comment</FormLabel>
                                        <Textarea
                                            placeholder="Share your thoughts..."
                                            rows={4}
                                            bg={useColorModeValue('white', 'gray.700')}
                                            border={0}
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                        />
                                    </FormControl>
                                    <Button
                                        type="submit"
                                        colorScheme="brand"
                                        rightIcon={<FaPaperPlane />}
                                        mt={2}
                                        borderRadius="full"
                                        px={8}
                                    >
                                        Send Comment
                                    </Button>
                                </VStack>
                            </Box>
                        </VStack>
                    </Box>
                </MotionBox>
            </Container>
        </Box>
    );
};

export default BlogPost;
