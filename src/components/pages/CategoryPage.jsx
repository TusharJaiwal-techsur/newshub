import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, User, Eye } from 'lucide-react';
import { articleService } from '../../service/articleService';
import { formatDate } from '../../utils/dateUtils';
import { truncateText } from '../../utils/helpers';
import Sidebar from '../common/Sidebar';
import Button from '../ui/Button';
import Card from '../ui/Card';

const CategoryPage = () => {
    const { category } = useParams();
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        if (category) {
            fetchArticles();
        }
    }, [category, currentPage]);

    const fetchArticles = async () => {
        try {
            setLoading(true);
            const response = await articleService.getArticlesByCategory(category, currentPage, 9);
            setArticles(response.data.content);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching articles:', error);
        } finally {
            setLoading(false);
        }
    };

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
            <div className="min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 py-8">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded mb-8"></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="bg-gray-200 h-80 rounded-lg"></div>
                            ))}
                        </div>
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
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-gray-800 mb-2 capitalize">
                                {category} News
                            </h1>
                            <p className="text-gray-600">
                                Latest articles in {category} category
                            </p>
                        </div>

                        {articles.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                    {articles.map((article) => (
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
                            </>
                        ) : (
                            <div className="text-center py-12">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                    No articles found
                                </h2>
                                <p className="text-gray-600 mb-6">
                                    There are no articles in the {category} category yet.
                                </p>
                                <Link to="/">
                                    <Button>Go to Home</Button>
                                </Link>
                            </div>
                        )}
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

export default CategoryPage;