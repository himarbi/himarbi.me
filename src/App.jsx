import { Box } from '@chakra-ui/react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import CursorGlow from './components/CursorGlow';
import BackToTop from './components/BackToTop';
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import CV from './pages/CV';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ScrollToTop from './components/ScrollToTop';
import CookieConsent from './components/CookieConsent';
import AllBlogsFull from './pages/AllBlogsFull';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Box>
        <CursorGlow />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/all-blogs" element={<AllBlogsFull />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/cv" element={<CV />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
        <Footer />
        <BackToTop />
        <CookieConsent />
      </Box>
    </Router>
  );
}

export default App;
