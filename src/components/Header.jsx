import { Box, Flex, HStack, Button, IconButton, useDisclosure, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Text, VStack, Icon, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';
import { profile } from '../data/profile';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';

const NAV_LINKS = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Certifications', href: '#certifications' },
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
        onClose();
        const target = document.querySelector(href);
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth',
            });
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
                    {NAV_LINKS.map((link) => (
                        <Box
                            as="a"
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleClick(e, link.href)}
                            fontWeight="medium"
                            fontSize="sm"
                            color={activeSection === link.href.slice(1) ? activeColor : textColor}
                            _hover={{ color: activeColor }}
                            position="relative"
                            transition="color 0.2s"
                        >
                            {link.name}
                            {activeSection === link.href.slice(1) && (
                                <Box position="absolute" bottom="-2px" left={0} w="full" h="2px" bg={activeColor} borderRadius="full" />
                            )}
                        </Box>
                    ))}
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
                        icon={<HamburgerIcon />}
                        variant="ghost"
                        display={{ base: 'inline-flex', lg: 'none' }}
                        aria-label="Open menu"
                        onClick={onOpen}
                    />
                </HStack>
            </Flex>

            <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent bg={useColorModeValue('white', 'gray.900')}>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
                    <DrawerBody>
                        <VStack as="nav" spacing={6} align="flex-start" mt={8}>
                            {NAV_LINKS.map((link) => (
                                <Text
                                    as="a"
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => handleClick(e, link.href)}
                                    fontSize="lg"
                                    fontWeight="medium"
                                    color={activeSection === link.href.slice(1) ? activeColor : inactiveColor}
                                >
                                    {link.name}
                                </Text>
                            ))}
                            <Text
                                as="a"
                                href="#contact"
                                onClick={(e) => handleClick(e, '#contact')}
                                fontSize="lg"
                                fontWeight="medium"
                            >
                                Contact
                            </Text>

                            <HStack pt={8} spacing={6}>
                                <SocialIcon icon={FaGithub} href={profile.socials.github} />
                                <SocialIcon icon={FaLinkedin} href={profile.socials.linkedin} />
                                <SocialIcon icon={FaTwitter} href={profile.socials.twitter} />
                                <SocialIcon icon={FaInstagram} href={profile.socials.instagram} />
                            </HStack>
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </Box>
    );
};

export default Header;
