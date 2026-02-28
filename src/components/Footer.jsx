import { useState, useEffect } from 'react';
import { Box, Flex, HStack, Text, Icon, VStack, SimpleGrid, Divider, useColorModeValue, Image } from '@chakra-ui/react';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaEnvelope, FaMapMarkerAlt, FaHeart, FaShieldAlt } from 'react-icons/fa';
import { useLocation, useNavigate, Link as RouterLink } from 'react-router-dom';
import { profile } from '../data/profile';

const Footer = () => {
    // Custom tailored dark colors for a premium feel
    const bg = useColorModeValue('gray.900', 'black');
    const borderColor = useColorModeValue('whiteAlpha.200', 'whiteAlpha.100');
    const accentColor = 'brand.500';
    const textColor = 'whiteAlpha.700';

    const location = useLocation();
    const navigate = useNavigate();

    // State for the visitor badge URL
    const [badgeUrl, setBadgeUrl] = useState('');

    useEffect(() => {
        const baseUrl = "https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Fhimarbi.me&label=PROFILE%20VIEWS&countColor=%23805ad5&labelColor=%231A202C";

        // Read strictly from session cache to ensure it only fires once per browser session
        const cachedBadge = sessionStorage.getItem('himarbi_badge_cached');

        if (cachedBadge) {
            // Already visited in this session, use cached SVG string to freeze the count display
            setBadgeUrl(cachedBadge);
        } else {
            // First time visitor this session: load via proxy to cache the SVG string
            const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(baseUrl)}`;

            fetch(proxyUrl)
                .then(res => res.text())
                .then(svgText => {
                    // Convert SVG text to base64 Data URI so the Image element doesn't ping the server
                    const encodedSvg = 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(svgText)));
                    sessionStorage.setItem('himarbi_badge_cached', encodedSvg);
                    setBadgeUrl(encodedSvg);
                })
                .catch(() => {
                    // Fallback to raw URL if proxy fails (this would increment on refresh)
                    setBadgeUrl(baseUrl);
                });
        }
    }, []);

    const handleNavClick = (e, href) => {
        e.preventDefault();

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
            setTimeout(executeScroll, 100);
        } else {
            executeScroll();
        }
    };

    const SocialLink = ({ icon, href }) => (
        <Box
            as="a"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            p={3}
            bg="whiteAlpha.100"
            borderRadius="full"
            color="whiteAlpha.800"
            transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            _hover={{
                bg: accentColor,
                color: 'white',
                transform: 'translateY(-3px)'
            }}
        >
            <Icon as={icon} boxSize={5} />
        </Box>
    );

    return (
        <Box as="footer" bg={bg} color="white" pt={20} pb={10} position="relative" overflow="hidden">
            {/* Subtle Top Gradient Line */}
            <Box position="absolute" top={0} left={0} right={0} h="2px" bgGradient={`linear(to-r, transparent, ${accentColor}, transparent)`} opacity={0.5} />

            <Box maxW="1280px" mx="auto" px={{ base: 6, md: 8 }}>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={12} mb={16}>
                    {/* Brand Column */}
                    <VStack align="flex-start" spacing={6} colSpan={{ base: 1, lg: 2 }}>
                        <Text
                            fontWeight="900"
                            fontSize="3xl"
                            letterSpacing="tighter"
                            bgGradient={`linear(to-r, ${accentColor}, purple.400)`}
                            bgClip="text"
                            style={{ fontFamily: '"Outfit", "Plus Jakarta Sans", sans-serif' }}
                        >
                            himarbi.
                        </Text>
                        <Text color={textColor} fontSize="lg" maxW="md" lineHeight="tall">
                            A passionate junior developer dedicated to building beautifully crafted web experiences with modern technologies. Let’s build something extraordinary together.
                        </Text>
                        <HStack spacing={4} pt={2}>
                            <SocialLink icon={FaGithub} href={profile.socials.github} />
                            <SocialLink icon={FaLinkedin} href={profile.socials.linkedin} />
                            <SocialLink icon={FaTwitter} href={profile.socials.twitter} />
                            <SocialLink icon={FaInstagram} href={profile.socials.instagram} />
                        </HStack>
                    </VStack>

                    {/* Quick Navigation Context */}
                    <VStack align="flex-start" spacing={4}>
                        <Text fontWeight="bold" fontSize="lg" mb={2}>Quick Navigation</Text>
                        {[
                            { name: 'Home', href: '#home' },
                            { name: 'About', href: '#about' },
                            { name: 'Certifications', href: '#certifications' },
                            { name: 'Blog', href: '#blog-showcase' },
                            { name: 'Contact', href: '#contact' }
                        ].map((item) => (
                            <Text
                                key={item.name}
                                as="a"
                                href={item.href}
                                onClick={(e) => handleNavClick(e, item.href)}
                                color={textColor}
                                _hover={{ color: accentColor, transform: 'translateX(4px)', cursor: 'pointer' }}
                                transition="all 0.2s"
                                fontWeight="medium"
                            >
                                {item.name}
                            </Text>
                        ))}
                    </VStack>

                    {/* Contact Info */}
                    <VStack align="flex-start" spacing={6}>
                        <Text fontWeight="bold" fontSize="lg" mb={2}>Get in Touch</Text>
                        <HStack color={textColor}>
                            <Icon as={FaEnvelope} color={accentColor} />
                            <Text as="a" href="mailto:himarbi.dev@gmail.com" _hover={{ color: 'white' }} transition="color 0.2s">
                                himarbi.dev@gmail.com
                            </Text>
                        </HStack>
                        <HStack color={textColor}>
                            <Icon as={FaMapMarkerAlt} color={accentColor} />
                            <Text>Mogadishu, Somalia</Text>
                        </HStack>
                    </VStack>
                </SimpleGrid>

                <Divider borderColor={borderColor} mb={8} />

                <Flex
                    direction={{ base: 'column', md: 'row' }}
                    justify="space-between"
                    align="center"
                    color="whiteAlpha.600"
                    fontSize="sm"
                    gap={4}
                >
                    <HStack spacing={4}>
                        <Text>© {new Date().getFullYear()} Ibrahim. All rights reserved.</Text>
                        <Text display={{ base: 'none', md: 'block' }}>•</Text>
                        <Text as={RouterLink} to="/privacy-policy" _hover={{ color: 'white', textDecoration: 'underline' }} transition="all 0.2s" display="flex" alignItems="center">
                            <Icon as={FaShieldAlt} mr={1} /> Privacy Policy
                        </Text>
                    </HStack>

                    <HStack spacing={6}>
                        {/* Live Visitor Tracking Badge */}
                        {badgeUrl && (
                            <Image
                                src={badgeUrl}
                                alt="Visitor Count"
                                h="20px"
                                borderRadius="sm"
                                loading="lazy"
                            />
                        )}
                        <HStack spacing={1}>
                            <Text>Crafted with</Text>
                            <Icon as={FaHeart} color="red.500" boxSize={3} />
                            <Text>by himarbi</Text>
                        </HStack>
                    </HStack>
                </Flex>
            </Box>
        </Box>
    );
};

export default Footer;
