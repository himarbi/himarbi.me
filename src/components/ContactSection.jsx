import { Box, Flex, Heading, Text, VStack, HStack, Stack, Input, Textarea, Button, FormControl, FormLabel, FormErrorMessage, Icon, useToast, usePrefersReducedMotion, useColorModeValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';
import { profile } from '../data/profile';

const MotionBox = motion(Box);
const SocialIcon = ({ icon: IconType, href }) => (
    <Box as="a" href={href} target="_blank" rel="noopener noreferrer" color="whiteAlpha.800" _hover={{ color: 'white', transform: 'scale(1.1)' }} transition="all 0.2s">
        <Icon as={IconType} boxSize={6} />
    </Box>
);

const ContactSection = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    const prefersReducedMotion = usePrefersReducedMotion();

    const bg = useColorModeValue('bg', 'gray.900');
    const titleColor = useColorModeValue('gray.900', 'white');
    const subtitleColor = useColorModeValue('muted', 'gray.400');
    const formBg = useColorModeValue('white', 'gray.800');
    const formBorder = useColorModeValue('gray.100', 'whiteAlpha.200');
    const inputBg = useColorModeValue('gray.50', 'whiteAlpha.50');
    const inputFocusBg = useColorModeValue('white', 'gray.700');
    const labelColor = useColorModeValue('gray.700', 'gray.300');

    const handleValidation = () => {
        let newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format";
        if (!formData.subject.trim()) newErrors.subject = "Subject is required";
        if (!formData.message.trim()) newErrors.message = "Message is required";
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = handleValidation();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});
        setIsLoading(true);

        // Send form data to himarbi.dev@gmail.com using FormSubmit
        fetch("https://formsubmit.co/ajax/himarbi.dev@gmail.com", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: formData.name,
                email: formData.email,
                subject: formData.subject,
                message: formData.message
            })
        })
            .then(response => response.json())
            .then(data => {
                setIsLoading(false);
                if (data.success) {
                    setFormData({ name: '', email: '', subject: '', message: '' });
                    toast({
                        title: "Message sent!",
                        description: "Thank you for reaching out. I'll get back to you shortly.",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                        position: 'bottom-right'
                    });
                } else {
                    throw new Error("Form submission failed");
                }
            })
            .catch(error => {
                setIsLoading(false);
                toast({
                    title: "Error sending message.",
                    description: "Something went wrong. Please try again later.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: 'bottom-right'
                });
            });
    };

    return (
        <Box id="contact" py={20} bg={bg}>
            <Box maxW="1280px" mx="auto" px={{ base: 6, md: 8 }}>
                <MotionBox
                    initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                >
                    <Heading as="h2" size="2xl" mb={4} textAlign="center" color={titleColor}>
                        Let's Talk
                    </Heading>
                    <Text fontSize="lg" color={subtitleColor} textAlign="center" maxW="2xl" mx="auto" mb={16}>
                        Got a project in mind or looking for a motivated team member? Feel free to reach out. I'm open to discussing new opportunities.
                    </Text>
                </MotionBox>

                <Flex direction={{ base: 'column', lg: 'row' }} gap={12} bg={formBg} borderRadius="3xl" overflow="hidden" boxShadow={useColorModeValue('xl', 'dark-lg')} border="1px solid" borderColor={formBorder}>

                    {/* Contact Information Side */}
                    <Box flex={1} bg="brand.600" color="white" p={{ base: 6, md: 16 }} position="relative" overflow="hidden">
                        <MotionBox
                            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                        >
                            <Box position="relative" zIndex={1}>
                                <Heading as="h3" size="lg" mb={6} color="white">
                                    Contact Information
                                </Heading>
                                <Text fontSize="lg" color="whiteAlpha.800" mb={12}>
                                    Fill up the form and I will get back to you shortly.
                                </Text>

                                <VStack align="flex-start" spacing={8} mb={16}>
                                    <HStack spacing={4}>
                                        <Icon as={FaPhoneAlt} boxSize={5} color="brand.200" />
                                        <Text fontSize="lg">+252 61 931 4558</Text>
                                    </HStack>
                                    <HStack spacing={4}>
                                        <Icon as={FaEnvelope} boxSize={5} color="brand.200" />
                                        <Text fontSize="lg">himarbi.dev@gmail.com</Text>
                                    </HStack>
                                    <HStack spacing={4}>
                                        <Icon as={FaMapMarkerAlt} boxSize={5} color="brand.200" />
                                        <Text fontSize="lg">Mogadishu, Somalia</Text>
                                    </HStack>
                                </VStack>

                                <HStack spacing={6}>
                                    <SocialIcon icon={FaGithub} href={profile.socials.github} />
                                    <SocialIcon icon={FaLinkedin} href={profile.socials.linkedin} />
                                    <SocialIcon icon={FaTwitter} href={profile.socials.twitter} />
                                    <SocialIcon icon={FaInstagram} href={profile.socials.instagram} />
                                </HStack>
                            </Box>
                        </MotionBox>

                        {/* Decorative circles */}
                        <Box position="absolute" bottom="-10%" right="-10%" w="250px" h="250px" bg="brand.500" borderRadius="full" opacity="0.5" zIndex={0} />
                        <Box position="absolute" top="10%" right="10%" w="100px" h="100px" bg="brand.400" borderRadius="full" opacity="0.5" zIndex={0} />
                    </Box>

                    {/* Form Side */}
                    <Box flex={1} p={{ base: 8, md: 16 }}>
                        <MotionBox
                            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                        >
                            <form onSubmit={handleSubmit}>
                                <VStack spacing={6} align="stretch">
                                    <Stack spacing={6} direction={{ base: 'column', md: 'row' }} w="full">
                                        <FormControl isInvalid={errors.name} isRequired>
                                            <FormLabel color={labelColor} fontWeight="bold">Your Name</FormLabel>
                                            <Input
                                                type="text"
                                                placeholder="John Doe"
                                                bg={inputBg}
                                                border="none"
                                                _focus={{ bg: inputFocusBg, boxShadow: "outline" }}
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            />
                                            <FormErrorMessage>{errors.name}</FormErrorMessage>
                                        </FormControl>

                                        <FormControl isInvalid={errors.email} isRequired>
                                            <FormLabel color={labelColor} fontWeight="bold">Your Email</FormLabel>
                                            <Input
                                                type="email"
                                                placeholder="john@example.com"
                                                bg={inputBg}
                                                border="none"
                                                _focus={{ bg: inputFocusBg, boxShadow: "outline" }}
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            />
                                            <FormErrorMessage>{errors.email}</FormErrorMessage>
                                        </FormControl>
                                    </Stack>

                                    <FormControl isInvalid={errors.subject} isRequired>
                                        <FormLabel color={labelColor} fontWeight="bold">Subject</FormLabel>
                                        <Input
                                            type="text"
                                            placeholder="Project Inquiry"
                                            bg={inputBg}
                                            border="none"
                                            _focus={{ bg: inputFocusBg, boxShadow: "outline" }}
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        />
                                        <FormErrorMessage>{errors.subject}</FormErrorMessage>
                                    </FormControl>

                                    <FormControl isInvalid={errors.message} isRequired>
                                        <FormLabel color={labelColor} fontWeight="bold">Message</FormLabel>
                                        <Textarea
                                            placeholder="Tell me about your project..."
                                            rows={6}
                                            bg={inputBg}
                                            border="none"
                                            _focus={{ bg: inputFocusBg, boxShadow: "outline" }}
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        />
                                        <FormErrorMessage>{errors.message}</FormErrorMessage>
                                    </FormControl>

                                    <Button
                                        type="submit"
                                        colorScheme="brand"
                                        size="lg"
                                        w="full"
                                        mt={4}
                                        isLoading={isLoading}
                                        loadingText="Sending..."
                                    >
                                        Send Message
                                    </Button>
                                </VStack>
                            </form>
                        </MotionBox>
                    </Box>
                </Flex>
            </Box>
        </Box>
    );
};

export default ContactSection;
