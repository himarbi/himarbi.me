import { useState } from 'react';
import {
    Box,
    Heading,
    Text,
    SimpleGrid,
    Image,
    VStack,
    HStack,
    Badge,
    HStack as FlexRow,
    IconButton,
    Icon,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    usePrefersReducedMotion,
    Divider,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiGithub, FiExternalLink } from 'react-icons/fi';
import { projects } from '../data/projects';

const MotionBox = motion(Box);

const ProjectCard = ({ project, onOpenModal }) => {
    return (
        <Box
            bg="white"
            borderRadius="2xl"
            overflow="hidden"
            boxShadow="lg"
            border="1px solid"
            borderColor="gray.200"
            transition="all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)"
            _hover={{ transform: 'translateY(-6px)', boxShadow: '2xl', '& .overlay': { opacity: 1 } }}
            cursor="pointer"
            onClick={() => onOpenModal(project)}
            position="relative"
            display="flex"
            flexDirection="column"
            h="100%"
        >
            <Box h="220px" overflow="hidden" position="relative">
                <Image
                    src={project.image}
                    alt={project.title}
                    objectFit="cover"
                    w="100%"
                    h="100%"
                    transition="transform 0.5s"
                    _hover={{ transform: 'scale(1.05)' }}
                />
                <Box
                    className="overlay"
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    bg="blackAlpha.400"
                    opacity={0}
                    transition="opacity 0.3s"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Button
                        rightIcon={<FiArrowRight />}
                        colorScheme="brand"
                        pointerEvents="none"
                    >
                        View Case Study
                    </Button>
                </Box>
            </Box>

            <VStack align="flex-start" p={6} spacing={4} flex="1">
                <Heading as="h3" size="md" color="gray.800" fontWeight="bold">
                    {project.title}
                </Heading>
                <Text color="gray.600" fontSize="md" noOfLines={3}>
                    {project.description}
                </Text>
                <HStack spacing={2} wrap="wrap" mt="auto" pt={4}>
                    {project.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} colorScheme="blue" variant="subtle" px={2} py={1} borderRadius="md" mb={2}>
                            {tag}
                        </Badge>
                    ))}
                    {project.tags.length > 3 && (
                        <Text fontSize="xs" color="gray.500" fontWeight="medium" mb={2}>+{project.tags.length - 3}</Text>
                    )}
                </HStack>
            </VStack>
        </Box>
    );
};

const ProjectsSection = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedProject, setSelectedProject] = useState(null);
    const prefersReducedMotion = usePrefersReducedMotion();

    const handleOpenModal = (project) => {
        setSelectedProject(project);
        onOpen();
    };

    return (
        <Box id="projects" py={20} bg="white">
            <Box maxW="1280px" mx="auto" px={{ base: 6, md: 8 }}>
                <MotionBox
                    initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.5 }}
                >
                    <Heading as="h2" size="2xl" mb={4} textAlign="center">
                        Selected Works
                    </Heading>
                    <Text fontSize="lg" color="muted" textAlign="center" maxW="2xl" mx="auto" mb={16}>
                        A showcase of my recent engineering projects, focusing on performance, scalable architecture, and pixel-perfect UIs.
                    </Text>
                </MotionBox>

                <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} spacing={10}>
                    {projects.map((project, index) => (
                        <MotionBox
                            key={project.id}
                            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <ProjectCard project={project} onOpenModal={handleOpenModal} />
                        </MotionBox>
                    ))}
                </SimpleGrid>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose} size="4xl" scrollBehavior="inside" motionPreset="slideInBottom">
                <ModalOverlay backdropFilter="blur(4px)" bg="blackAlpha.600" />
                <ModalContent borderRadius="xl" overflow="hidden">
                    {selectedProject && (
                        <>
                            <Box position="relative" h="300px">
                                <Image src={selectedProject.image} w="full" h="full" objectFit="cover" />
                                <ModalCloseButton color="white" bg="blackAlpha.500" _hover={{ bg: 'blackAlpha.700' }} mt={2} mr={2} borderRadius="full" />
                            </Box>

                            <ModalHeader fontSize="2xl" pb={2} pt={6}>{selectedProject.title}</ModalHeader>
                            <ModalBody pb={6}>
                                <HStack wrap="wrap" mb={6} spacing={2}>
                                    {selectedProject.tags.map((tag) => (
                                        <Badge key={tag} colorScheme="blue" bg="blue.50" color="blue.700" px={3} py={1} borderRadius="full" mb={2}>
                                            {tag}
                                        </Badge>
                                    ))}
                                </HStack>

                                <VStack align="stretch" spacing={6}>
                                    <Box>
                                        <Heading size="md" mb={2} color="gray.800">The Problem</Heading>
                                        <Text color="gray.600" fontSize="lg">{selectedProject.problem}</Text>
                                    </Box>
                                    <Divider />
                                    <Box>
                                        <Heading size="md" mb={2} color="gray.800">The Solution</Heading>
                                        <Text color="gray.600" fontSize="lg">{selectedProject.solution}</Text>
                                    </Box>
                                    <Divider />
                                    <Box>
                                        <Heading size="md" mb={2} color="brand.600">The Results</Heading>
                                        <Text color="gray.800" fontSize="lg" fontWeight="medium">{selectedProject.results}</Text>
                                    </Box>
                                </VStack>
                            </ModalBody>

                            <ModalFooter bg="gray.50" borderTop="1px" borderColor="gray.100">
                                <Button variant="ghost" mr={3} onClick={onClose}>
                                    Close
                                </Button>
                                <HStack spacing={4}>
                                    <Button
                                        as="a"
                                        href={selectedProject.githubLink}
                                        target="_blank"
                                        leftIcon={<FiGithub />}
                                        variant="outline"
                                    >
                                        Source Code
                                    </Button>
                                    <Button
                                        as="a"
                                        href={selectedProject.liveLink}
                                        target="_blank"
                                        leftIcon={<FiExternalLink />}
                                        colorScheme="brand"
                                    >
                                        Live Demo
                                    </Button>
                                </HStack>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default ProjectsSection;
