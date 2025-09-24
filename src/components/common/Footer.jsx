import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-white">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <Link to="/" className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">N</span>
                            </div>
                            <span className="text-xl font-bold">NewsHub</span>
                        </Link>
                        <p className="text-gray-400 text-sm">
                            Your trusted source for the latest news and updates. Stay informed with our comprehensive coverage of politics, technology, sports, and more.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Youtube className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Categories</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="/category/politics" className="text-gray-400 hover:text-white transition-colors">
                                    Politics
                                </Link>
                            </li>
                            <li>
                                <Link to="/category/technology" className="text-gray-400 hover:text-white transition-colors">
                                    Technology
                                </Link>
                            </li>
                            <li>
                                <Link to="/category/sports" className="text-gray-400 hover:text-white transition-colors">
                                    Sports
                                </Link>
                            </li>
                            <li>
                                <Link to="/category/business" className="text-gray-400 hover:text-white transition-colors">
                                    Business
                                </Link>
                            </li>
                            <li>
                                <Link to="/category/entertainment" className="text-gray-400 hover:text-white transition-colors">
                                    Entertainment
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Contact Info</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-center space-x-2">
                                <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                <span className="text-gray-400">Prayagraj, Uttar Pradesh, India</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <Phone className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                <span className="text-gray-400">+91 9876543210</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <Mail className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                <span className="text-gray-400">contact@newshub.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                    <p className="text-gray-400 text-sm">
                        © {currentYear} NewsHub. All rights reserved. Made with ❤️ in India.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;