import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate form submission
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
            setFormData({ name: '', email: '', subject: '', message: '' });
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-blue-600 text-white py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">Contact Us</h1>
                        <p className="text-xl md:text-2xl text-blue-100">
                            Get in touch with our editorial team
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div>
                        <Card className="p-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h2>

                            {success && (
                                <div className="mb-6 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg">
                                    Thank you for your message! We'll get back to you soon.
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                            Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Your full name"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="your.email@example.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                        Subject *
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="What is this regarding?"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={6}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Your message..."
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full"
                                    loading={loading}
                                >
                                    <Send className="w-4 h-4 mr-2" />
                                    {loading ? 'Sending...' : 'Send Message'}
                                </Button>
                            </form>
                        </Card>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-8">
                        {/* Contact Details */}
                        <Card className="p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-6">Contact Information</h3>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <MapPin className="w-5 h-5 text-blue-600 mr-4" />
                                    <div>
                                        <p className="font-medium text-gray-800">Address</p>
                                        <p className="text-gray-600">Prayagraj, Uttar Pradesh, India</p>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <Phone className="w-5 h-5 text-blue-600 mr-4" />
                                    <div>
                                        <p className="font-medium text-gray-800">Phone</p>
                                        <p className="text-gray-600">+91 7219696844</p>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <Mail className="w-5 h-5 text-blue-600 mr-4" />
                                    <div>
                                        <p className="font-medium text-gray-800">Email</p>
                                        <p className="text-gray-600">tusharjaiwal321@gmail.com</p>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Business Hours */}
                        <Card className="p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                                <Clock className="w-5 h-5 mr-2" />
                                Business Hours
                            </h3>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Monday - Friday</span>
                                    <span className="font-medium text-gray-800">9:00 AM - 6:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Saturday</span>
                                    <span className="font-medium text-gray-800">10:00 AM - 4:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Sunday</span>
                                    <span className="font-medium text-gray-800">Closed</span>
                                </div>
                            </div>
                        </Card>

                        {/* Editorial Guidelines */}
                        <Card className="p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Editorial Guidelines</h3>
                            <div className="text-sm text-gray-600 space-y-3">
                                <p>
                                    <strong>Story Tips:</strong> Send newsworthy information to tips@newshub.com
                                </p>
                                <p>
                                    <strong>Press Releases:</strong> Email press@newshub.com for consideration
                                </p>
                                <p>
                                    <strong>Corrections:</strong> Report errors to corrections@newshub.com
                                </p>
                                <p>
                                    <strong>General Inquiries:</strong> Use the form or contact@newshub.com
                                </p>
                            </div>
                        </Card>

                        {/* FAQ */}
                        <Card className="p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h3>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-medium text-gray-800 mb-2">How quickly do you respond?</h4>
                                    <p className="text-gray-600 text-sm">
                                        We aim to respond to all inquiries within 24-48 hours during business days.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-800 mb-2">Do you accept guest posts?</h4>
                                    <p className="text-gray-600 text-sm">
                                        Yes, we consider high-quality guest contributions. Please include samples of your work.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-800 mb-2">Can I advertise on NewsHub?</h4>
                                    <p className="text-gray-600 text-sm">
                                        For advertising opportunities, please contact our sales team at ads@newshub.com.
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;