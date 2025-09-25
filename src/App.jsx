// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import Header from './components/common/Header.jsx';
import Footer from './components/common/Footer.jsx';
import HomePage from './components/pages/HomePage.jsx';


import ArticleDetail from './components/pages/ArticleDetail.jsx';
import CategoryPage from './components/pages/CategoryPage.jsx';
import AboutPage from './components/pages/AboutPage.jsx';
import ContactPage from './components/pages/ContactPage.jsx';
import Dashboard from './components/pages/AdminPages/Dashboard.jsx';
import CreatePost from './components/pages/AdminPages/CreatePost.jsx';
import './styles/globals.css';
import AllArticles from './components/pages/AllArticles.jsx';
import PrivacyPolicy from './components/pages/PrivacyPolicy.jsx';
import TermsOfService from './components/pages/TermsOfService.jsx';
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main className="min-h-screen">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/article/:id" element={<ArticleDetail />} />
              <Route path="/allArticles" element={<AllArticles />} />
              <Route path="/category/:category" element={<CategoryPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/create" element={<CreatePost />} />
              <Route path="/admin/edit/:id" element={<CreatePost />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;