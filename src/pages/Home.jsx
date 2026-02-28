import { Box } from '@chakra-ui/react';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import CertificationsSection from '../components/CertificationsSection';
import BlogShowcaseSection from '../components/BlogShowcaseSection';
import ContactSection from '../components/ContactSection';

function Home() {
    return (
        <Box>
            <HeroSection />
            <AboutSection />
            <CertificationsSection />
            <BlogShowcaseSection />
            <ContactSection />
        </Box>
    );
}

export default Home;
