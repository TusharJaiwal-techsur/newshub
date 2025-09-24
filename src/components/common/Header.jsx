import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, User, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import LoginModal from '../pages/AdminPages/LoginModal';
import { articleService } from '../../service/articleService';
import { debounce } from '../../utils/helpers';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [categories, setCategories] = useState([]);

    const { isAuthenticated, admin, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch categories
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await articleService.getCategories();
            // setCategories(response.data);
            const data = response.data;
            console.log("Categories API response:", response.data);
            // Normalize
            setCategories(Array.isArray(data) ? data : data.categories || []);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const debouncedSearch = debounce(async (query) => {
        if (query.trim().length > 2) {
            try {
                setIsSearching(true);
                const response = await articleService.searchArticles(query, 0, 5);
                setSearchResults(response.data.content);
            } catch (error) {
                console.error('Search error:', error);
            } finally {
                setIsSearching(false);
            }
        } else {
            setSearchResults([]);
        }
    }, 300);

    useEffect(() => {
        debouncedSearch(searchQuery);
    }, [searchQuery]);

    const handleLogout = () => {
        logout();
        setIsUserMenuOpen(false);
        navigate('/');
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
            setSearchResults([]);
            setSearchQuery('');
        }
    };

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4">
                {/* Main Header */}
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">N</span>
                        </div>
                        <span className="text-xl font-bold text-gray-800">NewsHub</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                            Home
                        </Link>
                        <div className="relative group">
                            <button className="text-gray-700 hover:text-blue-600 transition-colors">
                                Categories
                            </button>
                            <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-48">
                                {Array.isArray(categories) && categories.map((category) => (
                                    <Link
                                        key={category}
                                        to={`/category/${category.toLowerCase()}`}
                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                                    >
                                        {category}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
                            About
                        </Link>
                        <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">
                            Contact
                        </Link>
                    </nav>

                    {/* Search Bar */}
                    <div className="hidden md:flex items-center relative">
                        <form onSubmit={handleSearchSubmit} className="relative">
                            <input
                                type="text"
                                placeholder="Search articles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-64 px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        </form>

                        {/* Search Results Dropdown */}
                        {searchResults.length > 0 && (
                            <div className="absolute top-full mt-2 w-80 bg-white shadow-lg rounded-lg border max-h-96 overflow-y-auto z-50">
                                {searchResults.map((article) => (
                                    <Link
                                        key={article.id}
                                        to={`/article/${article.id}`}
                                        className="block p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                                        onClick={() => {
                                            setSearchResults([]);
                                            setSearchQuery('');
                                        }}
                                    >
                                        <h3 className="font-medium text-gray-800 text-sm line-clamp-2">
                                            {article.title}
                                        </h3>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {article.category} • {new Date(article.createdAt).toLocaleDateString()}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* User Menu / Login Button */}
                    <div className="flex items-center space-x-4">
                        {isAuthenticated ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                                >
                                    <User className="w-5 h-5" />
                                    <span className="hidden md:inline">{admin?.fullName}</span>
                                </button>

                                {isUserMenuOpen && (
                                    <div className="absolute right-0 top-full mt-2 bg-white shadow-lg rounded-lg py-2 w-48 z-50">
                                        <Link
                                            to="/admin/dashboard"
                                            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                                            onClick={() => setIsUserMenuOpen(false)}
                                        >
                                            <Settings className="w-4 h-4 mr-2" />
                                            Dashboard
                                        </Link>
                                        <Link
                                            to="/admin/create"
                                            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                                            onClick={() => setIsUserMenuOpen(false)}
                                        >
                                            <Settings className="w-4 h-4 mr-2" />
                                            Create Post
                                        </Link>
                                        <hr className="my-1" />
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                                        >
                                            <LogOut className="w-4 h-4 mr-2" />
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button
                                onClick={() => setIsLoginModalOpen(true)}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Login
                            </button>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden text-gray-700"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden border-t border-gray-200 py-4">
                        <div className="flex flex-col space-y-4">
                            {/* Mobile Search */}
                            <form onSubmit={handleSearchSubmit} className="relative">
                                <input
                                    type="text"
                                    placeholder="Search articles..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            </form>

                            {/* Mobile Navigation */}
                            <Link
                                to="/"
                                className="text-gray-700 hover:text-blue-600 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Home
                            </Link>

                            <div>
                                <span className="text-gray-700 font-medium">Categories</span>
                                <div className="ml-4 mt-2 space-y-2">
                                    {categories.map((category) => (
                                        <Link
                                            key={category}
                                            to={`/category/${category.toLowerCase()}`}
                                            className="block text-gray-600 hover:text-blue-600 transition-colors"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {category}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <Link
                                to="/about"
                                className="text-gray-700 hover:text-blue-600 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                About
                            </Link>
                            <Link
                                to="/contact"
                                className="text-gray-700 hover:text-blue-600 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Contact
                            </Link>
                        </div>
                    </div>
                )}
            </div>

            {/* Login Modal */}
            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
            />
        </header>
    );
};

export default Header;
