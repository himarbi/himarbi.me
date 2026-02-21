import { Box, Flex, HStack, Text, Icon, VStack } from '@chakra-ui/react';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';
import { profile } from '../data/profile';

const Footer = () => {
    return (
        <Box bg="gray.900" color="whiteAlpha.800" py={12}>
            <Box maxW="1280px" mx="auto" px={{ base: 6, md: 8 }}>
                <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align="center" gap={8} borderBottom="1px solid" borderColor="whiteAlpha.200" pb={8} mb={8}>

                    <VStack align={{ base: 'center', md: 'flex-start' }} spacing={2}>
                        <Text fontWeight="bold" fontSize="2xl" color="white" letterSpacing="tight">
                            Ibrahim Abukar Ahmed.
                        </Text>
                        <Text fontSize="sm" color="whiteAlpha.600">
                            Junior Developer
                        </Text>
                    </VStack>

                    <HStack spacing={6}>
                        <Box as="a" href={profile.socials.github} target="_blank" _hover={{ color: 'white' }} transition="all 0.2s">
                            <Icon as={FaGithub} boxSize={5} />
                        </Box>
                        <Box as="a" href={profile.socials.linkedin} target="_blank" _hover={{ color: 'white' }} transition="all 0.2s">
                            <Icon as={FaLinkedin} boxSize={5} />
                        </Box>
                        <Box as="a" href={profile.socials.twitter} target="_blank" _hover={{ color: 'white' }} transition="all 0.2s">
                            <Icon as={FaTwitter} boxSize={5} />
                        </Box>
                        <Box as="a" href={profile.socials.instagram} target="_blank" _hover={{ color: 'white' }} transition="all 0.2s">
                            <Icon as={FaInstagram} boxSize={5} />
                        </Box>
                    </HStack>

                </Flex>

                <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align="center" fontSize="sm">
                    <Text>© {new Date().getFullYear()} Ibrahim Abukar Ahmed (himarbi). All rights reserved.</Text>
                    <HStack spacing={4} mt={{ base: 4, md: 0 }}>
                        <Text as="a" href="#" _hover={{ color: 'white' }}>Privacy Policy</Text>
                        <Text as="a" href="#" _hover={{ color: 'white' }}>Terms of Service</Text>
                    </HStack>
                </Flex>
            </Box>
        </Box>
    );
};

export default Footer;
