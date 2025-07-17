import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/RecruitmentServices';
import Faq from './pages/Faq';
import Contact from './pages/Contact';
import Upload from './pages/Upload';

import RecruitmentServices from './pages/RecruitmentServices';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
         
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/recruitment" element={<RecruitmentServices />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;