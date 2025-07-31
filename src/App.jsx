import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import RecruitmentServices from './pages/RecruitmentServices';
import Faq from './pages/Faq';
import Contact from './pages/Contact';
import Upload from './pages/Upload';
import Services from './pages/Services';
import LoanServices from './pages/LoanServices';
import Tax from './pages/Tax';
import TaxCalculator from './pages/TaxCalculator.jsx';
import EMICalculator from './pages/EMICalculator.jsx';
import ApplyForm from './pages/ApplyForm.jsx';
import LegalPages from './pages/LegalPages.jsx';
import PostJobForm from './pages/PostJobForm.jsx';
import Login from './pages/Login';
import { AuthProvider } from './context/AuthContext.jsx';
import ProtectedRoute from './components/layout/ProtectedRoutes';
import JobBoard from './pages/JobBoard.jsx';
import AddLoanOffer from './pages/AddLoanOffer.jsx';
import LoanOffers from './pages/LoanOffers.jsx';
import AdminApplications from './pages/AdminApplication.jsx';
import AdminPage from './pages/AdminPage.jsx';
import LoanApplyForm from './pages/LoanApplyForm.jsx';
import AdminLoanApplications from './pages/AdminLoanApplications.jsx';
import GenericApplyForm from './pages/GenericApplyForm.jsx';
import AdminGenericApplications from './pages/AdminGenericApplications.jsx';
function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
               
                  <Home />
              
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/recruitment" element={<ProtectedRoute><RecruitmentServices /></ProtectedRoute>} />
            <Route path="/loans" element={<ProtectedRoute><LoanServices /></ProtectedRoute>} />
            <Route path="/services" element={<ProtectedRoute><Services /></ProtectedRoute>} />
            <Route path="/faq" element={<ProtectedRoute><Faq /></ProtectedRoute>} />
            <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
            <Route path="/upload" element={<ProtectedRoute><Upload /></ProtectedRoute>} />
            <Route path="/tax" element={<ProtectedRoute><Tax /></ProtectedRoute>} />
            <Route path="/calculator" element={<ProtectedRoute><TaxCalculator /></ProtectedRoute>} />
            <Route path="/loans/calculate" element={<ProtectedRoute><EMICalculator /></ProtectedRoute>} />
            <Route path="/apply" element={<ProtectedRoute><ApplyForm /></ProtectedRoute>} />
            <Route path="/genericapply" element={<ProtectedRoute><GenericApplyForm /></ProtectedRoute>} />
            
            <Route path="/jobs" element={<ProtectedRoute><JobBoard /></ProtectedRoute>} />
            <Route path="/terms" element={<LegalPages page="terms" />} />
            <Route path="/privacy" element={<LegalPages page="privacy" />} />
            <Route path="/jobpost" element={<ProtectedRoute><PostJobForm /></ProtectedRoute>} />
            <Route path="/addloan" element={<ProtectedRoute><AddLoanOffer /></ProtectedRoute>} />
            <Route path="/loanoffers" element={<ProtectedRoute><LoanOffers /></ProtectedRoute>} />
            <Route path="/admin/jobapplications" element={<ProtectedRoute><AdminApplications /></ProtectedRoute>} />
            <Route path="/admin/genericjobapplications" element={<ProtectedRoute><AdminGenericApplications /></ProtectedRoute>} />
            <Route path="/admin/loanapplications" element={<ProtectedRoute><AdminLoanApplications /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
            <Route path="/loanapply" element={<ProtectedRoute><LoanApplyForm /></ProtectedRoute>} />

          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
