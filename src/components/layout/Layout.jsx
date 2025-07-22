// src/components/layout/Layout.jsx
import React, { useState } from 'react';
import Header from './Navbar';
import Footer from './Footer';
import WhatsAppButton from '../ui/WhatsAppButton';
import ScrollToTop from '../ui/ScrollToTop';

// In your Layout.jsx
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="relative bg-gradient-to-br from-red-700 via-red-800 to-black text-gray-300 min-h-screen overflow-hidden">
      {/* Background Grid Overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-900/50 to-gray-950">
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="flex-grow p-6 pt-24 relative z-0">
        {children}
      </main>

      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </div>
  );
};

export default Layout;
