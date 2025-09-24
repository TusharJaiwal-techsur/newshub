// components/pages/AboutPage.jsx
import React from 'react';
import { Users, Target, Award, Heart, Mail, Phone, MapPin } from 'lucide-react';

const AboutPage = () => {
    const teamMembers = [
        {
            id: 1,
            name: "Rajesh Kumar",
            role: "Editor-in-Chief",
            bio: "With over 15 years in journalism, Rajesh leads our editorial team with expertise in political and business reporting.",
            image: "/images/team/editor.jpg"
        },
        {
            id: 2,
            name: "Priya Sharma",
            role: "Technology Reporter",
            bio: "Tech enthusiast and writer covering the latest innovations, startups, and digital transformation stories.",
            image: "/images/team/tech-reporter.jpg"
        },
        {
            id: 3,
            name: "Arjun Singh",
            role: "Sports Correspondent",
            bio: "Sports journalist with deep knowledge of cricket, football, and emerging sports in India.",
            image: "/images/team/sports-reporter.jpg"
        },
        {
            id: 4,
            name: "Kavita Gupta",
            role: "Health & Lifestyle Writer",
            bio: "Passionate about wellness, health trends, and lifestyle stories that matter to our readers.",
            image: "/images/team/health-writer.jpg"
        }
    ];

    const stats = [
        { number: "10K+", label: "Daily Readers" },
        { number: "500+", label: "Articles Published" },
        { number: "50+", label: "Contributors" },
        { number: "5+", label: "Years Experience" }
    ];

    const values = [
        {
            icon: <Target className="w-8 h-8 text-blue-600" />,
            title: "Accuracy First",
            description: "We prioritize factual reporting and verify all information before publication."
        },
        {
            icon: <Users className="w-8 h-8 text-green-600" />,
            title: "Community Focus",
            description: "Our content serves the needs and interests of our local and national community."
        },
        {
            icon: <Award className="w-8 h-8 text-yellow-600" />,
            title: "Excellence",
            description: "We strive for the highest standards in journalism and digital media."
        },
        {
            icon: <Heart className="w-8 h-8 text-red-600" />,
            title: "Integrity",
            description: "Transparent, unbiased reporting that serves the public interest."
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-white py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-5xl font-bold text-gray-800 mb-6">About NewsHub</h1>
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            NewsHub is your trusted source for comprehensive news coverage, delivering
                            accurate, timely, and relevant information across politics, technology, sports,
                            business, and lifestyle topics that matter to you.
                        </p>
                        <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                At NewsHub, we believe in the power of informed communities. Our mission is to
                                provide clear, accurate, and comprehensive news coverage that helps our readers
                                understand the world around them and make informed decisions.
                            </p>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                We are committed to maintaining the highest standards of journalistic integrity
                                while embracing digital innovation to deliver news in the most accessible and
                                engaging formats.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-center text-gray-600">
                                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                                    Deliver accurate and timely news coverage
                                </li>
                                <li className="flex items-center text-gray-600">
                                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                                    Promote transparency and accountability
                                </li>
                                <li className="flex items-center text-gray-600">
                                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                                    Foster informed public discourse
                                </li>
                                <li className="flex items-center text-gray-600">
                                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                                    Support democratic values and institutions
                                </li>
                            </ul>
                        </div>
                        <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-lg p-8 text-white">
                            <h3 className="text-2xl font-bold mb-4">Why Choose NewsHub?</h3>
                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <div className="w-3 h-3 bg-white rounded-full mt-2 mr-4 flex-shrink-0"></div>
                                    <p>Comprehensive coverage across multiple categories</p>
                                </div>
                                <div className="flex items-start">
                                    <div className="w-3 h-3 bg-white rounded-full mt-2 mr-4 flex-shrink-0"></div>
                                    <p>Real-time updates and breaking news alerts</p>
                                </div>
                                <div className="flex items-start">
                                    <div className="w-3 h-3 bg-white rounded-full mt-2 mr-4 flex-shrink-0"></div>
                                    <p>Expert analysis and in-depth reporting</p>
                                </div>
                                <div className="flex items-start">
                                    <div className="w-3 h-3 bg-white rounded-full mt-2 mr-4 flex-shrink-0"></div>
                                    <p>User-friendly platform accessible on all devices</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-white py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">NewsHub by the Numbers</h2>
                        <p className="text-gray-600">Our impact in the digital news landscape</p>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                                <div className="text-gray-600">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Values</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            These core principles guide everything we do at NewsHub
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                                <div className="mb-4">{value.icon}</div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">{value.title}</h3>
                                <p className="text-gray-600">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="bg-white py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Our experienced journalists and writers are passionate about delivering quality news
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {teamMembers.map((member) => (
                            <div key={member.id} className="text-center">
                                <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 overflow-hidden">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=3B82F6&color=fff&size=128`;
                                        }}
                                    />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-1">{member.name}</h3>
                                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                                <p className="text-gray-600 text-sm">{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* History Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Journey</h2>
                        <div className="space-y-8">
                            <div className="flex items-start">
                                <div className="flex-shrink-0 w-4 h-4 bg-blue-600 rounded-full mt-2 mr-6"></div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">2019 - The Beginning</h3>
                                    <p className="text-gray-600">
                                        NewsHub was founded with a vision to create a digital-first news platform
                                        that prioritizes accuracy and accessibility.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="flex-shrink-0 w-4 h-4 bg-blue-600 rounded-full mt-2 mr-6"></div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">2020 - Expansion</h3>
                                    <p className="text-gray-600">
                                        We expanded our coverage to include technology, sports, and lifestyle content,
                                        growing our readership significantly.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="flex-shrink-0 w-4 h-4 bg-blue-600 rounded-full mt-2 mr-6"></div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">2022 - Recognition</h3>
                                    <p className="text-gray-600">
                                        NewsHub received recognition for excellence in digital journalism and
                                        community engagement.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="flex-shrink-0 w-4 h-4 bg-blue-600 rounded-full mt-2 mr-6"></div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">2024 - Innovation</h3>
                                    <p className="text-gray-600">
                                        We continue to innovate with new features, enhanced user experience,
                                        and expanded multimedia content.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact CTA Section */}
            <section className="bg-gray-800 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
                    <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                        Have a story tip, feedback, or want to collaborate? We'd love to hear from you.
                    </p>
                    <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 mb-8">
                        <div className="flex items-center">
                            <Mail className="w-5 h-5 mr-2 text-blue-400" />
                            <span>contact@newshub.com</span>
                        </div>
                        <div className="flex items-center">
                            <Phone className="w-5 h-5 mr-2 text-blue-400" />
                            <span>+91 9876543210</span>
                        </div>
                        <div className="flex items-center">
                            <MapPin className="w-5 h-5 mr-2 text-blue-400" />
                            <span>Prayagraj, UP, India</span>
                        </div>
                    </div>
                    <a
                        href="/contact"
                        className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Contact Us
                    </a>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;