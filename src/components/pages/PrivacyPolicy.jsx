// components/pages/PrivacyPolicy.jsx
import React from 'react';
import STR from '../../config/en';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="bg-white rounded-lg shadow-md p-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-6">Privacy Policy</h1>
                    <p className="text-gray-600 mb-8">
                        <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
                    </p>

                    <div className="prose max-w-none">
                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Introduction</h2>
                            <p className="text-gray-600 mb-4">
                                Welcome to NewsHub. This Privacy Policy explains how we collect, use, disclose,
                                and safeguard your information when you visit our website and use our services.
                                Please read this privacy policy carefully.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Information We Collect</h2>
                            <h3 className="text-xl font-medium text-gray-700 mb-2">Personal Information</h3>
                            <ul className="list-disc list-inside text-gray-600 mb-4">
                                <li>Name and contact information when you contact us</li>
                                <li>Email address when you subscribe to our newsletter</li>
                                <li>Comments and feedback you provide</li>
                            </ul>

                            <h3 className="text-xl font-medium text-gray-700 mb-2">Non-Personal Information</h3>
                            <ul className="list-disc list-inside text-gray-600 mb-4">
                                <li>Browser type and version</li>
                                <li>Operating system</li>
                                <li>IP address and location data</li>
                                <li>Pages visited and time spent on site</li>
                                <li>Referring website addresses</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. How We Use Your Information</h2>
                            <p className="text-gray-600 mb-2">We use the information we collect to:</p>
                            <ul className="list-disc list-inside text-gray-600 mb-4">
                                <li>Provide and maintain our services</li>
                                <li>Improve user experience</li>
                                <li>Send newsletters and updates (with your consent)</li>
                                <li>Respond to your inquiries and support requests</li>
                                <li>Analyze website usage and trends</li>
                                <li>Prevent fraud and ensure security</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Cookies and Tracking</h2>
                            <p className="text-gray-600 mb-4">
                                We use cookies and similar tracking technologies to enhance your browsing experience.
                                Cookies are small files stored on your device that help us remember your preferences
                                and understand how you use our site.
                            </p>
                            <h3 className="text-xl font-medium text-gray-700 mb-2">Types of Cookies We Use:</h3>
                            <ul className="list-disc list-inside text-gray-600 mb-4">
                                <li><strong>Essential Cookies:</strong> Required for basic site functionality</li>
                                <li><strong>Analytics Cookies:</strong> Help us understand site usage</li>
                                <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Information Sharing</h2>
                            <p className="text-gray-600 mb-4">
                                We do not sell, trade, or rent your personal information to third parties.
                                We may share information in the following circumstances:
                            </p>
                            <ul className="list-disc list-inside text-gray-600 mb-4">
                                <li>With your explicit consent</li>
                                <li>To comply with legal obligations</li>
                                <li>To protect our rights and safety</li>
                                <li>In connection with a business transfer or merger</li>
                                <li>With trusted service providers who assist our operations</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Data Security</h2>
                            <p className="text-gray-600 mb-4">
                                We implement appropriate technical and organizational measures to protect your
                                personal information against unauthorized access, alteration, disclosure, or destruction.
                                However, no method of transmission over the internet is 100% secure.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Your Rights</h2>
                            <p className="text-gray-600 mb-2">You have the right to:</p>
                            <ul className="list-disc list-inside text-gray-600 mb-4">
                                <li>Access your personal information</li>
                                <li>Correct inaccurate information</li>
                                <li>Delete your personal information</li>
                                <li>Object to processing of your information</li>
                                <li>Withdraw consent at any time</li>
                                <li>Data portability</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Third-Party Links</h2>
                            <p className="text-gray-600 mb-4">
                                Our website may contain links to third-party websites. We are not responsible
                                for the privacy practices of these external sites. We encourage you to read
                                their privacy policies.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Children's Privacy</h2>
                            <p className="text-gray-600 mb-4">
                                Our services are not intended for children under 13 years of age.
                                We do not knowingly collect personal information from children under 13.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Updates to This Policy</h2>
                            <p className="text-gray-600 mb-4">
                                We may update this Privacy Policy from time to time. We will notify you of
                                any changes by posting the new policy on this page and updating the "Last Updated" date.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. Contact Us</h2>
                            <p className="text-gray-600 mb-4">
                                If you have any questions about this Privacy Policy or our privacy practices, please contact us:
                            </p>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-gray-600 mb-2"><strong>Email:</strong> {STR.footer.contact_info.email}</p>
                                <p className="text-gray-600 mb-2"><strong>Address:</strong> {STR.footer.contact_info.address}</p>
                                <p className="text-gray-600"><strong>Phone:</strong> {STR.footer.contact_info.phone}</p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;