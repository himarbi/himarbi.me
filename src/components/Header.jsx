import { Box, Flex, HStack, Button, IconButton, useDisclosure, Text, VStack, Icon, useColorMode, useColorModeValue, Collapse } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { profile } from '../data/profile';
import { posts } from '../data/posts';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';

const NAV_LINKS = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Blog', href: '#blog-showcase' },
];

const SocialIcon = ({ icon, href }) => {
    const hoverColor = useColorModeValue('brand.500', 'brand.300');
    const color = useColorModeValue('gray.500', 'gray.400');
    return (
        <Box as="a" href={href} target="_blank" rel="noopener noreferrer" color={color} _hover={{ color: hoverColor, transform: 'translateY(-2px)' }} transition="all 0.2s">
            <Icon as={icon} boxSize={5} />
        </Box>
    );
};

const Header = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [activeSection, setActiveSection] = useState('home');
    const [scrolled, setScrolled] = useState(false);
    const { colorMode, toggleColorMode } = useColorMode();
    const location = useLocation();
    const navigate = useNavigate();

    const bgScroll = useColorModeValue('rgba(255, 255, 255, 0.9)', 'rgba(26, 32, 44, 0.9)');
    const textColor = useColorModeValue('gray.600', 'gray.300');
    const activeColor = useColorModeValue('brand.500', 'brand.300');
    const inactiveColor = useColorModeValue('gray.800', 'white');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.5, rootMargin: '-80px 0px 0px 0px' }
        );

        const sections = document.querySelectorAll('section[id], box[id], div[id]');
        sections.forEach((section) => observer.observe(section));

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            sections.forEach((section) => observer.unobserve(section));
        };
    }, []);

    const handleClick = (e, href) => {
        e.preventDefault();

        // Immediately close the mobile menu
        if (isOpen) {
            onClose();
        }

        const executeScroll = () => {
            setTimeout(() => {
                const target = document.querySelector(href);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth',
                    });
                }
            }, 150);
        };

        if (location.pathname !== '/') {
            navigate('/');
            // Need a slightly longer timeout to allow the Home component to mount fully
            setTimeout(executeScroll, 100);
        } else {
            executeScroll();
        }
    };

    return (
        <Box
            as="header"
            position="fixed"
            top={0}
            w="full"
            zIndex={9999}
            bg={scrolled ? bgScroll : 'transparent'}
            backdropFilter={scrolled ? 'blur(10px)' : 'none'}
            boxShadow={scrolled ? 'sm' : 'none'}
            transition="all 0.3s ease-in-out"
        >
            {/* Animated Blog Posts Ticker */}
            <Box w="full" bg={useColorModeValue('brand.500', 'brand.600')} color="white" py={1.5} overflow="hidden" position="relative" display="flex" alignItems="center">
                <motion.div
                    animate={{ x: ['0%', '-50%'] }}
                    transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                    style={{ whiteSpace: 'nowrap', display: 'flex', width: 'max-content' }}
                >
                    {/* Quadruple mapping to ensure enough width for infinite scrolling loop regardless of screen size */}
                    {[...posts, ...posts, ...posts, ...posts].map((post, idx) => (
                        <Text
                            as={RouterLink}
                            to={`/blog/${post.id}`}
                            key={idx}
                            fontSize="xs"
                            fontWeight="bold"
                            textTransform="uppercase"
                            letterSpacing="widest"
                            mx={8}
                            _hover={{ color: 'whiteAlpha.700', textDecoration: 'underline' }}
                            display="inline-block"
                        >
                            🔥 NEW POST: {post.title}
                        </Text>
                    ))}
                </motion.div>
            </Box>

            <Flex maxW="1280px" mx="auto" px={{ base: 6, md: 8 }} py={4} align="center" justify="space-between">
                <Text
                    as="a"
                    href="#home"
                    onClick={(e) => handleClick(e, '#home')}
                    fontWeight="900"
                    fontSize={{ base: '2xl', md: '3xl' }}
                    letterSpacing="tighter"
                    bgGradient="linear(to-r, brand.500, purple.500)"
                    bgClip="text"
                    display="inline-block"
                    _hover={{ transform: 'scale(1.02)' }}
                    transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
                    style={{ fontFamily: '"Outfit", "Plus Jakarta Sans", sans-serif' }}
                >
                    himarbi<Text as="span" color="brand.500">.</Text>
                </Text>

                <HStack as="nav" spacing={6} display={{ base: 'none', lg: 'flex' }}>
                    {NAV_LINKS.map((link) => {
                        const isActive = link.isRoute
                            ? location.pathname === link.href || location.pathname.startsWith('/blog') && link.href === '/blog'
                            : activeSection === link.href.slice(1) && location.pathname === '/';

                        return (
                            <Box
                                as={link.isRoute ? RouterLink : 'a'}
                                key={link.name}
                                to={link.isRoute ? link.href : undefined}
                                href={!link.isRoute ? link.href : undefined}
                                onClick={(e) => {
                                    if (!link.isRoute) handleClick(e, link.href);
                                    else if (isOpen) onClose();
                                }}
                                fontWeight="medium"
                                fontSize="sm"
                                color={isActive ? activeColor : textColor}
                                _hover={{ color: activeColor }}
                                position="relative"
                                transition="color 0.2s"
                            >
                                {link.name}
                                {isActive && (
                                    <Box position="absolute" bottom="-2px" left={0} w="full" h="2px" bg={activeColor} borderRadius="full" />
                                )}
                            </Box>
                        );
                    })}
                </HStack>

                <HStack spacing={4}>
                    <HStack display={{ base: 'none', lg: 'flex' }} spacing={4} mr={4}>
                        <SocialIcon icon={FaGithub} href={profile.socials.github} />
                        <SocialIcon icon={FaLinkedin} href={profile.socials.linkedin} />
                    </HStack>

                    <IconButton
                        icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                        isRound
                        size="sm"
                        onClick={toggleColorMode}
                        variant="ghost"
                        aria-label="Toggle Color Mode"
                        _hover={{ bg: useColorModeValue('gray.100', 'whiteAlpha.200') }}
                    />

                    <Button
                        as="a"
                        href="#contact"
                        onClick={(e) => handleClick(e, '#contact')}
                        colorScheme="brand"
                        size="sm"
                        display={{ base: 'none', md: 'inline-flex' }}
                    >
                        Let's Talk
                    </Button>

                    <IconButton
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        variant="ghost"
                        display={{ base: 'inline-flex', lg: 'none' }}
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                        onClick={isOpen ? onClose : onOpen}
                    />
                </HStack>
            </Flex>

            <Collapse in={isOpen} animateOpacity>
                <Box
                    bg={useColorModeValue('white', 'gray.900')}
                    boxShadow="sm"
                    display={{ lg: 'none' }}
                    borderTop="1px solid"
                    borderColor={useColorModeValue('gray.100', 'gray.800')}
                >
                    <VStack as="nav" spacing={6} align="center" py={8} px={6}>
                        {NAV_LINKS.map((link) => {
                            const isActive = link.isRoute
                                ? location.pathname === link.href || location.pathname.startsWith('/blog') && link.href === '/blog'
                                : activeSection === link.href.slice(1) && location.pathname === '/';

                            return (
                                <Text
                                    as={link.isRoute ? RouterLink : 'a'}
                                    key={link.name}
                                    to={link.isRoute ? link.href : undefined}
                                    href={!link.isRoute ? link.href : undefined}
                                    onClick={(e) => {
                                        if (!link.isRoute) handleClick(e, link.href);
                                        else if (isOpen) onClose();
                                    }}
                                    fontSize="xl"
                                    fontWeight="semibold"
                                    color={isActive ? activeColor : inactiveColor}
                                >
                                    {link.name}
                                </Text>
                            );
                        })}
                        <Text
                            as="a"
                            href="#contact"
                            onClick={(e) => handleClick(e, '#contact')}
                            fontSize="xl"
                            fontWeight="semibold"
                        >
                            Contact
                        </Text>

                        <HStack pt={4} spacing={6}>
                            <SocialIcon icon={FaGithub} href={profile.socials.github} />
                            <SocialIcon icon={FaLinkedin} href={profile.socials.linkedin} />
                            <SocialIcon icon={FaTwitter} href={profile.socials.twitter} />
                            <SocialIcon icon={FaInstagram} href={profile.socials.instagram} />
                        </HStack>
                    </VStack>
                </Box>
            </Collapse>
        </Box>
    );
};

export default Header;
