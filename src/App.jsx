import { Box } from '@chakra-ui/react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import CertificationsSection from './components/CertificationsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import CursorGlow from './components/CursorGlow';

function App() {
  return (
    <Box>
      <CursorGlow />
      <Header />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <CertificationsSection />
      <ContactSection />
      <Footer />
    </Box>
  );
}

export default App;
