import { Box, Container, Heading, Text, VStack, HStack, Flex, Divider, Icon, Badge, useColorModeValue, Image, Button } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaBriefcase, FaCode, FaCertificate, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaLinkedin, FaArrowLeft, FaDownload } from 'react-icons/fa';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { profile } from '../data/profile';

const MotionBox = motion(Box);

const CVSection = ({ title, icon, children }) => {
    const titleColor = useColorModeValue('gray.800', 'white');
    const borderColor = useColorModeValue('gray.200', 'gray.700');

    return (
        <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            w="full"
            mb={10}
        >
            <HStack mb={6} spacing={4} borderBottom="2px solid" borderColor={borderColor} pb={2}>
                <Icon as={icon} boxSize={6} color="brand.500" />
                <Heading as="h2" size="lg" color={titleColor} fontFamily="'Playfair Display', serif">
                    {title}
                </Heading>
            </HStack>
            <Box pl={{ base: 2, md: 10 }}>
                {children}
            </Box>
        </MotionBox>
    );
};

const CVItem = ({ title, subtitle, date, children }) => {
    const titleColor = useColorModeValue('gray.900', 'white');
    const subtitleColor = useColorModeValue('brand.600', 'brand.300');
    const textColor = useColorModeValue('gray.600', 'gray.300');
    const dateColor = useColorModeValue('gray.500', 'gray.400');

    return (
        <Box mb={8} position="relative">
            <Box position="absolute" left="-34px" top="6px" w="12px" h="12px" borderRadius="full" bg="brand.500" display={{ base: 'none', md: 'block' }} />
            <Box position="absolute" left="-29px" top="18px" w="2px" h="calc(100% + 10px)" bg={useColorModeValue('gray.200', 'gray.700')} display={{ base: 'none', md: 'block' }} />

            <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align={{ base: 'flex-start', md: 'center' }} mb={2}>
                <Box>
                    <Heading as="h3" size="md" color={titleColor} mb={1}>{title}</Heading>
                    <Text color={subtitleColor} fontWeight="bold" fontSize="sm">{subtitle}</Text>
                </Box>
                <Badge colorScheme="gray" variant="subtle" px={3} py={1} borderRadius="full" mt={{ base: 2, md: 0 }}>
                    {date}
                </Badge>
            </Flex>
            <VStack align="flex-start" mt={4} spacing={2} color={textColor}>
                {children}
            </VStack>
        </Box>
    );
};

const CV = () => {
    const navigate = useNavigate();
    const bgColor = useColorModeValue('gray.50', 'gray.900');
    const cardBg = useColorModeValue('white', 'gray.800');
    const titleColor = useColorModeValue('gray.900', 'white');
    const textColor = useColorModeValue('gray.600', 'gray.300');
    const borderColor = useColorModeValue('gray.200', 'gray.700');

    const handlePrint = () => {
        window.print();
    };

    return (
        <Box bg={bgColor} minH="100vh" pt={28} pb={20}>
            <Helmet>
                <title>Ibrahim Abukar Ahmed - CV</title>
                <meta name="description" content="Resume and Curriculum Vitae for Ibrahim Abukar Ahmed, Junior Software Developer." />
            </Helmet>

            <Container maxW="container.lg">
                <Flex justify="space-between" align="center" mb={8} className="no-print">
                    <Button variant="ghost" leftIcon={<FaArrowLeft />} onClick={() => navigate(-1)}>
                        Back
                    </Button>
                    <Button colorScheme="brand" leftIcon={<FaDownload />} onClick={handlePrint}>
                        Download PDF
                    </Button>
                </Flex>

                <Box bg={cardBg} borderRadius="2xl" boxShadow="xl" p={{ base: 6, md: 10, lg: 16 }} border="1px solid" borderColor={borderColor}>

                    {/* Header Region */}
                    <Flex direction={{ base: 'column', md: 'row' }} align="center" justify="space-between" mb={12} gap={8}>
                        <VStack align={{ base: 'center', md: 'flex-start' }} spacing={4} flex={1}>
                            <Heading as="h1" size="2xl" color={titleColor} textAlign={{ base: 'center', md: 'left' }} fontFamily="'Playfair Display', serif">
                                Ibrahim Abukar Ahmed
                            </Heading>
                            <Text fontSize="xl" color="brand.500" fontWeight="semibold" textAlign={{ base: 'center', md: 'left' }}>
                                Junior Software Developer | Computer Engineering Student
                            </Text>

                            <Flex wrap="wrap" gap={4} justify={{ base: 'center', md: 'flex-start' }} color={textColor} fontSize="sm">
                                <HStack><Icon as={FaMapMarkerAlt} color="brand.500" /><Text>Ankara, TR / Mogadishu, SO</Text></HStack>
                                <HStack><Icon as={FaEnvelope} color="brand.500" /><Text>himarbi.dev@gmail.com</Text></HStack>
                                <HStack><Icon as={FaPhoneAlt} color="brand.500" /><Text>+252 61 931 4558</Text></HStack>
                                <HStack as="a" href={profile.socials.linkedin} target="_blank" _hover={{ color: 'brand.500' }}>
                                    <Icon as={FaLinkedin} color="brand.500" /><Text>LinkedIn Profile</Text>
                                </HStack>
                            </Flex>
                        </VStack>

                        <Box flexShrink={0}>
                            <Image
                                src="/profile.jpg"
                                alt="Ibrahim Abukar Ahmed"
                                boxSize="180px"
                                borderRadius="2xl"
                                objectFit="cover"
                                boxShadow="lg"
                            />
                        </Box>
                    </Flex>

                    <Divider borderColor={borderColor} mb={12} />

                    {/* Professional Summary */}
                    <CVSection title="Professional Summary" icon={FaCode}>
                        <Text color={textColor} lineHeight="tall" fontSize="md">
                            Aspiring Junior Software Developer and Computer Engineering student with a specialized focus on Front-End Architecture and Scalable Web Systems. Proficient in the React ecosystem and JavaScript, backed by professional certifications from Meta. I combine technical engineering rigor with over 5 years of multimedia design experience to build high-performance, user-centric digital solutions.
                        </Text>
                    </CVSection>

                    {/* Technical Skills */}
                    <CVSection title="Technical Skills" icon={FaCode}>
                        <VStack align="stretch" spacing={4}>
                            <Box>
                                <Text fontWeight="bold" color={titleColor} mb={2}>Languages</Text>
                                <Flex wrap="wrap" gap={2}>
                                    {['JavaScript (ES6+)', 'C++', 'Python', 'HTML5', 'CSS3'].map(skill => <Badge key={skill} colorScheme="blue" variant="subtle" px={2} py={1}>{skill}</Badge>)}
                                </Flex>
                            </Box>
                            <Box>
                                <Text fontWeight="bold" color={titleColor} mb={2}>Frameworks & Libraries</Text>
                                <Flex wrap="wrap" gap={2}>
                                    {['React (Advanced)', 'Next.js', 'Tailwind CSS'].map(skill => <Badge key={skill} colorScheme="green" variant="subtle" px={2} py={1}>{skill}</Badge>)}
                                </Flex>
                            </Box>
                            <Box>
                                <Text fontWeight="bold" color={titleColor} mb={2}>Tools & Architecture</Text>
                                <Flex wrap="wrap" gap={2}>
                                    {['Git/Version Control', 'Agile Methodologies', 'REST APIs', 'Web Architecture'].map(skill => <Badge key={skill} colorScheme="purple" variant="subtle" px={2} py={1}>{skill}</Badge>)}
                                </Flex>
                            </Box>
                            <Box>
                                <Text fontWeight="bold" color={titleColor} mb={2}>Design & Multimedia</Text>
                                <Flex wrap="wrap" gap={2}>
                                    {['Adobe Illustrator', 'Premiere Pro', 'Motion Graphics', 'UI/UX Principles'].map(skill => <Badge key={skill} colorScheme="orange" variant="subtle" px={2} py={1}>{skill}</Badge>)}
                                </Flex>
                            </Box>
                        </VStack>
                    </CVSection>

                    {/* Experience */}
                    <CVSection title="Experience" icon={FaBriefcase}>
                        <CVItem title="CEO & Lead Developer (Freelance)" subtitle="Sumad Creatives" date="Dec 2024 – Present">
                            <Text>• Directing technical and creative strategy for a digital agency providing multimedia and marketing solutions.</Text>
                            <Text>• Managing end-to-end delivery of digital products, ensuring technical quality and client satisfaction.</Text>
                            <Text>• Leveraging 5+ years of multimedia experience to provide specialized video editing and graphic design services.</Text>
                        </CVItem>
                        <CVItem title="Sales & Operations Specialist" subtitle="Allaamin Corporation" date="Oct 2020 – Jun 2024">
                            <Text>• Optimized inventory workflows as a Storekeeper and provided consultative solutions as a Salesperson.</Text>
                            <Text>• Developed strong soft skills in negotiation and cross-functional communication within a corporate environment.</Text>
                        </CVItem>
                    </CVSection>

                    {/* Education */}
                    <CVSection title="Education" icon={FaGraduationCap}>
                        <CVItem title="B.Eng. in Computer Engineering (Erasmus Exchange)" subtitle="Middle East Technical University (METU), Ankara, Turkey" date="Sep 2025 – Jan 2026">
                            <Text>• Completed a one-semester international exchange program focused on global engineering exposure.</Text>
                            <Text>• Engaged in advanced technical coursework, including C++ and engineering problem-solving.</Text>
                        </CVItem>
                        <CVItem title="B.S. in Computer Science" subtitle="Jamhuriya University of Science & Technology, Mogadishu, Somalia" date="Sep 2023 – Aug 2027 (Expected)">
                            <Text>• Core focus: Software Engineering, Database Management, and Web Technologies.</Text>
                        </CVItem>
                    </CVSection>

                    {/* Certifications */}
                    <CVSection title="Professional Certifications" icon={FaCertificate}>
                        <Box as="ul" stylePosition="inside" color={textColor} pl={4}>
                            <li>Advanced React – Meta</li>
                            <li>Programming with JavaScript – Meta</li>
                            <li>Version Control (Git) – Meta</li>
                            <li>Delivering Quality Work with Agility – IBM</li>
                            <li>Front-End Development Fundamentals – Meta</li>
                            <li>HTML and CSS in Depth – Meta</li>
                        </Box>
                    </CVSection>

                    {/* Languages */}
                    <CVSection title="Languages" icon={FaCode}>
                        <Flex gap={8} wrap="wrap">
                            <Box><Text fontWeight="bold" color={titleColor}>English</Text><Text color={textColor}>Professional</Text></Box>
                            <Box><Text fontWeight="bold" color={titleColor}>Arabic</Text><Text color={textColor}>Native/Bilingual</Text></Box>
                            <Box><Text fontWeight="bold" color={titleColor}>Turkish</Text><Text color={textColor}>Beginner</Text></Box>
                        </Flex>
                    </CVSection>

                </Box>
                {/* Print Styles */}
                <style>
                    {`
                        @media print {
                            body * {
                                visibility: hidden;
                            }
                            #root {
                                bg: transparent !important;
                            }
                            .no-print, .no-print * {
                                display: none !important;
                            }
                            .chakra-container {
                                max-width: 100% !important;
                                padding: 0 !important;
                            }
                            .chakra-box {
                                visibility: visible;
                                position: absolute;
                                left: 0;
                                top: 0;
                                box-shadow: none !important;
                                border: none !important;
                            }
                            .chakra-box * {
                                visibility: visible;
                            }
                        }
                    `}
                </style>
            </Container>
        </Box>
    );
};

export default CV;
