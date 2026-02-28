import { Box, Flex, Heading, Text, Button, Image, HStack, VStack, Badge, usePrefersReducedMotion, Icon, useColorModeValue, Wrap, WrapItem } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';
import { profile } from '../data/profile';

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);
const MotionHStack = motion(HStack);

const SocialIcon = ({ icon, href }) => {
    const bg = useColorModeValue('white', 'whiteAlpha.100');
    const color = useColorModeValue('gray.600', 'whiteAlpha.800');
    const hoverColor = useColorModeValue('brand.500', 'brand.300');

    return (
        <Box
            as="a"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            p={2}
            bg={bg}
            borderRadius="full"
            boxShadow="sm"
            color={color}
            _hover={{ color: hoverColor, transform: 'translateY(-2px)', boxShadow: 'md' }}
            transition="all 0.2s"
        >
            <Icon as={icon} boxSize={5} />
        </Box>
    );
};

const Sticker = ({ children, top, right, bottom, left, rotation, delay }) => {
    const bg = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.100', 'whiteAlpha.200');
    const color = useColorModeValue('gray.800', 'white');
    const shadows = useColorModeValue('xl', 'dark-lg');

    return (
        <MotionBox
            position="absolute"
            top={top}
            right={right}
            bottom={bottom}
            left={left}
            bg={bg}
            px={4}
            py={2.5}
            borderRadius="full"
            boxShadow={shadows}
            border="1px solid"
            borderColor={borderColor}
            zIndex={10}
            initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: rotation }}
            transition={{ duration: 0.6, delay, type: 'spring', stiffness: 200 }}
            whileHover={{ scale: 1.1 }}
            cursor="pointer"
        >
            <Text fontWeight="bold" fontSize={{ base: "xs", md: "sm" }} color={color} whiteSpace="nowrap">
                {children}
            </Text>
        </MotionBox>
    );
};

const HeroSection = () => {
    const prefersReducedMotion = usePrefersReducedMotion();

    const titleColor = useColorModeValue('gray.900', 'white');
    const subtitleColor = useColorModeValue('gray.700', 'gray.300');
    const descColor = useColorModeValue('muted', 'whiteAlpha.700');
    const badgeBg = useColorModeValue('green.100', 'green.800');
    const badgeColor = useColorModeValue('green.800', 'green.100');
    const imageBg = useColorModeValue('white', 'gray.800');

    const blobOpacity1 = useColorModeValue(0.15, 0.1);
    const blobOpacity2 = useColorModeValue(0.2, 0.15);

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: prefersReducedMotion ? 0 : 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
    };

    const floatingAnimation = prefersReducedMotion ? {} : {
        y: [0, -10, 0],
        transition: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
        }
    };

    const coreSkills = ["HTML", "CSS", "Bootstrap", "JavaScript", "React", "Python", "Java", "SQL", "Git", "GitHub", "CLI"];

    return (
        <Box id="home" pt={{ base: 28, md: 36 }} pb={20} position="relative" overflow="hidden">
            {/* Background Blob */}
            <MotionBox
                position="absolute"
                top="-10%"
                right="-5%"
                w={{ base: '300px', md: '500px' }}
                h={{ base: '300px', md: '500px' }}
                bgGradient="radial(brand.500, transparent)"
                filter="blur(100px)"
                opacity={useColorModeValue(0.15, 0.1)}
                animate={prefersReducedMotion ? {} : {
                    scale: [1, 1.05, 1],
                    opacity: [blobOpacity1, blobOpacity2, blobOpacity1],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                zIndex={0}
            />

            <Flex
                maxW="1280px"
                mx="auto"
                px={{ base: 6, md: 8 }}
                direction={{ base: 'column-reverse', lg: 'row' }}
                align="center"
                justify="space-between"
                w="full"
                gap={12}
                position="relative"
                zIndex={1}
            >
                <MotionVStack
                    align={{ base: 'center', lg: 'flex-start' }}
                    textAlign={{ base: 'center', lg: 'left' }}
                    spacing={6}
                    maxW="xl"
                    w="full"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                >
                    <MotionBox variants={itemVariants}>
                        <Badge bg={badgeBg} color={badgeColor} px={3} py={1} borderRadius="full" textTransform="none" fontSize="sm">
                            Open to Opportunities
                        </Badge>
                    </MotionBox>

                    <MotionBox variants={itemVariants} w="full">
                        <Heading
                            as="h1"
                            fontFamily="'Playfair Display', serif"
                            fontWeight="700"
                            fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '5xl', xl: '6xl' }}
                            lineHeight="1.2"
                            color={titleColor}
                            textAlign={{ base: 'center', lg: 'left' }}
                            mb={2}
                        >
                            Hi, I'm <Text as="span" color="brand.500">Ibrahim.</Text>
                        </Heading>
                    </MotionBox>

                    <MotionBox variants={itemVariants}>
                        <Text fontSize="2xl" fontWeight="medium" color={subtitleColor} textAlign={{ base: 'center', lg: 'left' }}>
                            A passionate <Text as="span" fontWeight="bold" color={titleColor}>{profile.role}</Text> crafting beautiful web experiences.
                        </Text>
                    </MotionBox>

                    <MotionBox variants={itemVariants}>
                        <Text fontSize="lg" color={descColor} lineHeight="tall" textAlign={{ base: 'center', lg: 'left' }}>
                            {profile.description}
                        </Text>
                    </MotionBox>

                    <MotionBox variants={itemVariants} w="full" pt={2} display="flex" justifyContent={{ base: 'center', lg: 'flex-start' }}>
                        <Wrap spacing={2} justify={{ base: 'center', lg: 'flex-start' }}>
                            {coreSkills.map((skill) => (
                                <WrapItem key={skill}>
                                    <Badge
                                        colorScheme="blue"
                                        variant="subtle"
                                        px={3}
                                        py={1.5}
                                        borderRadius="md"
                                        textTransform="none"
                                        fontSize="sm"
                                        transition="transform 0.2s"
                                        _hover={{ transform: 'scale(1.05)' }}
                                    >
                                        {skill}
                                    </Badge>
                                </WrapItem>
                            ))}
                        </Wrap>
                    </MotionBox>

                    <MotionHStack spacing={4} pt={4} variants={itemVariants} justify={{ base: 'center', lg: 'flex-start' }} w="full">
                        <Button
                            as="a"
                            href={`${profile.socials.github}?tab=repositories`}
                            target="_blank"
                            rel="noopener noreferrer"
                            colorScheme="brand"
                            size="lg"
                            px={8}
                        >
                            Explore My Work
                        </Button>
                        <Button
                            as={RouterLink}
                            to="/cv"
                            variant="outline"
                            size="lg"
                            px={8}
                        >
                            View CV
                        </Button>
                    </MotionHStack>

                    <MotionHStack spacing={4} pt={4} variants={itemVariants} justify={{ base: 'center', lg: 'flex-start' }} w="full">
                        <SocialIcon icon={FaGithub} href={profile.socials.github} />
                        <SocialIcon icon={FaLinkedin} href={profile.socials.linkedin} />
                        <SocialIcon icon={FaTwitter} href={profile.socials.twitter} />
                        <SocialIcon icon={FaInstagram} href={profile.socials.instagram} />
                    </MotionHStack>
                </MotionVStack>

                <Box position="relative">
                    <MotionBox
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
                        position="relative"
                    >
                        <MotionBox animate={floatingAnimation}>
                            <Box
                                bg={imageBg}
                                p={3}
                                borderRadius="3xl"
                                boxShadow={useColorModeValue('2xl', 'dark-lg')}
                                transform="rotate(2deg)"
                                _hover={{ transform: 'rotate(0deg)' }}
                                transition="transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
                                position="relative"
                            >
                                <Image
                                    src="/profile.jpg"
                                    alt={profile.name}
                                    borderRadius="2xl"
                                    w={{ base: "260px", md: "460px" }}
                                    h={{ base: "260px", md: "460px" }}
                                    objectFit="cover"
                                />

                                {/* Interactive Stickers */}
                                <Sticker top={{ base: "-10px", md: "-20px" }} right={{ base: "-5px", md: "-10px" }} rotation={12} delay={0.8}>
                                    ✨ Clean Code
                                </Sticker>
                                <Sticker bottom={{ base: "30px", md: "40px" }} left={{ base: "-15px", md: "-30px" }} rotation={-15} delay={1.0}>
                                    🚀 Problem Solver
                                </Sticker>
                                <Sticker bottom={{ base: "-10px", md: "-15px" }} right={{ base: "20px", md: "30px" }} rotation={5} delay={1.2}>
                                    ☕ Coffee Lover
                                </Sticker>
                            </Box>
                        </MotionBox>
                    </MotionBox>

                </Box>
            </Flex>
        </Box>
    );
};

export default HeroSection;
