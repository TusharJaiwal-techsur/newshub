// components/pages/TermsOfService.jsx
import React from 'react';
import STR from '../../config/en';

const TermsOfService = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="bg-white rounded-lg shadow-md p-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-6">Terms of Service</h1>
                    <p className="text-gray-600 mb-8">
                        <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
                    </p>

                    <div className="prose max-w-none">
                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Agreement to Terms</h2>
                            <p className="text-gray-600 mb-4">
                                By accessing and using NewsHub, you accept and agree to be bound by the terms
                                and provision of this agreement. If you do not agree to abide by the above,
                                please do not use this service.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Use License</h2>
                            <p className="text-gray-600 mb-4">
                                Permission is granted to temporarily download one copy of the materials on
                                NewsHub's website for personal, non-commercial transitory viewing only.
                                This is the grant of a license, not a transfer of title, and under this license you may not:
                            </p>
                            <ul className="list-disc list-inside text-gray-600 mb-4">
                                <li>Modify or copy the materials</li>
                                <li>Use the materials for any commercial purpose or for any public display</li>
                                <li>Attempt to reverse engineer any software contained on the website</li>
                                <li>Remove any copyright or other proprietary notations from the materials</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. User Accounts</h2>
                            <p className="text-gray-600 mb-4">
                                When you create an account with us, you must provide information that is
                                accurate, complete, and current at all times. You are responsible for
                                safeguarding the password and for maintaining the confidentiality of your account.
                            </p>
                            <h3 className="text-xl font-medium text-gray-700 mb-2">Account Responsibilities:</h3>
                            <ul className="list-disc list-inside text-gray-600 mb-4">
                                <li>Keep your login credentials secure</li>
                                <li>Notify us immediately of any unauthorized access</li>
                                <li>Accept responsibility for all activities under your account</li>
                                <li>Provide accurate and up-to-date information</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Content Guidelines</h2>
                            <p className="text-gray-600 mb-4">
                                Our service allows you to post, link, store, share and otherwise make available
                                certain information, text, graphics, or other material. You are responsible for
                                the content you post to the service.
                            </p>
                            <h3 className="text-xl font-medium text-gray-700 mb-2">Prohibited Content:</h3>
                            <ul className="list-disc list-inside text-gray-600 mb-4">
                                <li>Unlawful, harmful, or offensive content</li>
                                <li>Spam or unauthorized advertising</li>
                                <li>Content that infringes intellectual property rights</li>
                                <li>Malicious code or viruses</li>
                                <li>Personal information of others without consent</li>
                                <li>Content that promotes discrimination or hatred</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Intellectual Property</h2>
                            <p className="text-gray-600 mb-4">
                                The service and its original content, features, and functionality are and will
                                remain the exclusive property of NewsHub and its licensors. The service is
                                protected by copyright, trademark, and other laws.
                            </p>
                            <h3 className="text-xl font-medium text-gray-700 mb-2">Your Content:</h3>
                            <p className="text-gray-600 mb-4">
                                You retain rights to any content you submit, post or display on or through
                                the service. By posting content, you grant us a worldwide, non-exclusive,
                                royalty-free license to use, modify, and distribute your content.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Privacy Policy</h2>
                            <p className="text-gray-600 mb-4">
                                Your privacy is important to us. Please review our Privacy Policy, which also
                                governs your use of the service, to understand our practices.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Termination</h2>
                            <p className="text-gray-600 mb-4">
                                We may terminate or suspend your account and bar access to the service
                                immediately, without prior notice or liability, under our sole discretion,
                                for any reason whatsoever including without limitation if you breach the Terms.
                            </p>
                            <p className="text-gray-600 mb-4">
                                Upon termination, your right to use the service will cease immediately.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Disclaimer</h2>
                            <p className="text-gray-600 mb-4">
                                The information on this website is provided on an "as is" basis. To the fullest
                                extent permitted by law, this Company:
                            </p>
                            <ul className="list-disc list-inside text-gray-600 mb-4">
                                <li>Excludes all representations and warranties relating to this website and its contents</li>
                                <li>Does not warrant that the website will be constantly available or error-free</li>
                                <li>Reserves the right to change or remove content without notice</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Limitation of Liability</h2>
                            <p className="text-gray-600 mb-4">
                                In no event shall NewsHub, nor its directors, employees, partners, agents,
                                suppliers, or affiliates, be liable for any indirect, incidental, special,
                                consequential, or punitive damages, including without limitation, loss of
                                profits, data, use, goodwill, or other intangible losses.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Governing Law</h2>
                            <p className="text-gray-600 mb-4">
                                These Terms shall be interpreted and governed by the laws of India, without
                                regard to its conflict of law provisions. Our failure to enforce any right
                                or provision of these Terms will not be considered a waiver of those rights.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. Changes to Terms</h2>
                            <p className="text-gray-600 mb-4">
                                We reserve the right, at our sole discretion, to modify or replace these Terms
                                at any time. If a revision is material, we will provide at least 30 days notice
                                prior to any new terms taking effect.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">12. Contact Information</h2>
                            <p className="text-gray-600 mb-4">
                                If you have any questions about these Terms of Service, please contact us:
                            </p>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-gray-600 mb-2"><strong>Email:</strong>{STR.footer.contact_info.email} </p>
                                <p className="text-gray-600 mb-2"><strong>Address:</strong> {STR.footer.contact_info.address}</p>
                                <p className="text-gray-600"><strong>Phone:</strong>{STR.footer.contact_info.phone} </p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;