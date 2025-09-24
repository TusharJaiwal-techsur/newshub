// components/pages/HomePage.js - Enhanced with slider
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, User, Eye, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { articleService } from '../../service/articleService';
import { formatDate, timeAgo } from '../../utils/dateUtils';
import { truncateText } from '../../utils/helpers';
import Sidebar from '../common/Sidebar';
import Button from '../ui/Button';
import Card from '../ui/Card';

const HomePage = () => {
    const [featuredArticles, setFeaturedArticles] = useState([]);
    const [latestArticles, setLatestArticles] = useState([]);
    const [popularArticles, setPopularArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    // Slider state
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isSliding, setIsSliding] = useState(false);

    useEffect(() => {
        fetchHomeData();
    }, [currentPage]);

    // Auto-slide effect for featured articles
    useEffect(() => {
        if (featuredArticles.length > 1) {
            const interval = setInterval(() => {
                setCurrentSlide((prev) =>
                    prev === featuredArticles.length - 1 ? 0 : prev + 1
                );
            }, 10000); // Change slide every 3 seconds

            return () => clearInterval(interval);
        }
    }, [featuredArticles.length]);

    const fetchHomeData = async () => {
        try {
            setLoading(true);
            const [featuredRes, articlesRes, popularRes] = await Promise.all([
                articleService.getFeaturedArticles(),
                articleService.getArticles(currentPage, 6),
                articleService.getPopularArticles()
            ]);

            console.log("Featured:", featuredRes.data);
            console.log("Articles:", articlesRes.data);
            console.log("Popular:", popularRes.data);

            setFeaturedArticles(Array.isArray(featuredRes.data) ? featuredRes.data : []);
            setLatestArticles(Array.isArray(articlesRes.data?.content) ? articlesRes.data.content : []);
            setTotalPages(articlesRes.data?.totalPages || 0);
            setPopularArticles(Array.isArray(popularRes.data) ? popularRes.data : []);
        } catch (error) {
            console.error('Error fetching home data:', error);
        } finally {
            setLoading(false);
        }
    };

    const nextSlide = () => {
        if (isSliding) return;
        setIsSliding(true);
        setCurrentSlide((prev) =>
            prev === featuredArticles.length - 1 ? 0 : prev + 1
        );
        setTimeout(() => setIsSliding(false), 300);
    };

    const prevSlide = () => {
        if (isSliding) return;
        setIsSliding(true);
        setCurrentSlide((prev) =>
            prev === 0 ? featuredArticles.length - 1 : prev - 1
        );
        setTimeout(() => setIsSliding(false), 300);
    };

    const goToSlide = (index) => {
        if (isSliding) return;
        setIsSliding(true);
        setCurrentSlide(index);
        setTimeout(() => setIsSliding(false), 300);
    };

    // Featured Articles Slider Component
    const FeaturedSlider = ({ articles }) => {
        if (!articles || articles.length === 0) return null;

        if (articles.length === 1) {
            // Single article - no slider needed
            return (
                <div className="relative overflow-hidden rounded-lg h-96">
                    <FeaturedArticleCard article={articles[0]} isMain={true} />
                </div>
            );
        }

        return (
            <div className="relative overflow-hidden rounded-lg h-96 group">
                {/* Slider Container */}
                <div
                    className="flex transition-transform duration-300 ease-in-out h-full"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                    {articles.map((article, index) => (
                        <div key={article.id} className="w-full flex-shrink-0 relative">
                            <FeaturedArticleCard article={article} isMain={true} />
                        </div>
                    ))}
                </div>

                {/* Navigation Arrows */}
                {articles.length > 1 && (
                    <>
                        <button
                            onClick={prevSlide}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-200 z-10"
                            disabled={isSliding}
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-200 z-10"
                            disabled={isSliding}
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </>
                )}

                {/* Dots Indicator */}
                {articles.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                        {articles.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-200 ${index === currentSlide
                                    ? 'bg-white'
                                    : 'bg-white/50 hover:bg-white/75'
                                    }`}
                                disabled={isSliding}
                            />
                        ))}
                    </div>
                )}

                {/* Slide Counter */}
                {articles.length > 1 && (
                    <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm z-10">
                        {currentSlide + 1} / {articles.length}
                    </div>
                )}
            </div>
        );
    };

    // Secondary Featured Articles (for grid layout when many featured articles)
    // const SecondaryFeatured = ({ articles }) => {
    //     if (!articles || articles.length <= 3) return null;

    //     const secondaryArticles = articles.slice(1, 5); // Show 2-4 more featured articles

    //     return (
    //         <div className="mt-8">
    //             <h3 className="text-xl font-semibold text-gray-800 mb-4">More Featured Stories</h3>
    //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    //                 {secondaryArticles.map((article) => (
    //                     <FeaturedArticleCard key={article.id} article={article} />
    //                 ))}
    //             </div>
    //         </div>
    //     );
    // };

    const FeaturedArticleCard = ({ article, isMain = false }) => (
        <Link to={`/article/${article.id}`} className="group block h-full">
            <div className={`relative overflow-hidden rounded-lg h-full ${isMain ? 'h-96' : 'h-64'}`}>
                <img
                    src={article.imageUrl || '/images/placeholder.jpg'}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded mb-2">
                        {article.category}
                    </span>
                    <h2 className={`text-white font-bold leading-tight group-hover:text-blue-200 transition-colors ${isMain ? 'text-2xl' : 'text-lg'
                        }`}>
                        {article.title}
                    </h2>
                    <div className="flex items-center text-white/80 text-sm mt-2">
                        <User className="w-4 h-4 mr-1" />
                        <span>{article.author}</span>
                        <span className="mx-2">•</span>
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{timeAgo(article.createdAt)}</span>
                    </div>
                </div>
            </div>
        </Link>
    );

    const ArticleCard = ({ article }) => (
        <Card className="h-full hover:shadow-lg transition-shadow duration-300">
            <Link to={`/article/${article.id}`} className="group">
                <div className="aspect-video overflow-hidden rounded-t-lg">
                    <img
                        src={article.imageUrl || '/images/placeholder.jpg'}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
                <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded">
                            {article.category}
                        </span>
                        <div className="flex items-center text-gray-500 text-xs">
                            <Eye className="w-3 h-3 mr-1" />
                            <span>{article.viewCount}</span>
                        </div>
                    </div>
                    <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors mb-2 line-clamp-2">
                        {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                        {article.excerpt || truncateText(article.content, 120)}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center">
                            <User className="w-3 h-3 mr-1" />
                            <span>{article.author}</span>
                        </div>
                        <div className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            <span>{formatDate(article.createdAt)}</span>
                        </div>
                    </div>
                </div>
            </Link>
        </Card>
    );

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="animate-pulse">
                    <div className="h-96 bg-gray-200 rounded-lg mb-8"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="bg-gray-200 h-80 rounded-lg"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Featured Section */}
                        {featuredArticles.length > 0 && (
                            <section className="mb-12">
                                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                                    Featured Stories
                                    {featuredArticles.length > 1 && (
                                        <span className="text-sm font-normal text-gray-500 ml-2">
                                            ({featuredArticles.length} stories)
                                        </span>
                                    )}
                                </h2>

                                {/* Main Featured Slider */}
                                <FeaturedSlider articles={featuredArticles} />

                                {/* Additional Featured Articles if more than 1 */}
                                {/* <SecondaryFeatured articles={featuredArticles} /> */}
                            </section>
                        )}

                        {/* Latest Articles */}
                        <section className="mb-8">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">Latest News</h2>
                                <Link
                                    to="/allArticles"
                                    className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                                >
                                    View All
                                    <ArrowRight className="w-4 h-4 ml-1" />
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                {latestArticles.map((article) => (
                                    <ArticleCard key={article.id} article={article} />
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex justify-center space-x-2">
                                    <Button
                                        variant="outline"
                                        onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                                        disabled={currentPage === 0}
                                    >
                                        Previous
                                    </Button>

                                    {[...Array(Math.min(5, totalPages))].map((_, index) => {
                                        const pageNum = currentPage <= 2 ? index : currentPage - 2 + index;
                                        if (pageNum >= totalPages) return null;

                                        return (
                                            <Button
                                                key={pageNum}
                                                variant={pageNum === currentPage ? 'primary' : 'outline'}
                                                onClick={() => setCurrentPage(pageNum)}
                                            >
                                                {pageNum + 1}
                                            </Button>
                                        );
                                    })}

                                    <Button
                                        variant="outline"
                                        onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
                                        disabled={currentPage === totalPages - 1}
                                    >
                                        Next
                                    </Button>
                                </div>
                            )}
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <Sidebar />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;