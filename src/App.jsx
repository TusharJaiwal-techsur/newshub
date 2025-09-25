// App.js
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import Header from './components/common/Header.jsx';
import Footer from './components/common/Footer.jsx';
import './styles/globals.css';

// ✅ Lazy imports
const HomePage = lazy(() => import('./components/pages/HomePage.jsx'));
const ArticleDetail = lazy(() => import('./components/pages/ArticleDetail.jsx'));
const CategoryPage = lazy(() => import('./components/pages/CategoryPage.jsx'));
const AboutPage = lazy(() => import('./components/pages/AboutPage.jsx'));
const ContactPage = lazy(() => import('./components/pages/ContactPage.jsx'));
const Dashboard = lazy(() => import('./components/pages/AdminPages/Dashboard.jsx'));
const CreatePost = lazy(() => import('./components/pages/AdminPages/CreatePost.jsx'));
const AllArticles = lazy(() => import('./components/pages/AllArticles.jsx'));
const PrivacyPolicy = lazy(() => import('./components/pages/PrivacyPolicy.jsx'));
const TermsOfService = lazy(() => import('./components/pages/TermsOfService.jsx'));



function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main className="min-h-screen">
            {/* ✅ Suspense fallback for lazy loading */}
            <Suspense fallback={<div className="text-center p-10">Loading...</div>}>
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
            </Suspense>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
