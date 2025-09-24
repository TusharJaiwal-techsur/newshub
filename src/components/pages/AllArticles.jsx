// components/pages/AllArticles.jsx
import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Clock, User, Eye, Filter, Grid, List } from 'lucide-react';
import { articleService } from '../../service/articleService';
import { formatDate, timeAgo } from '../../utils/dateUtils';
import { truncateText } from '../../utils/helpers';
import Sidebar from '../common/Sidebar';
import Button from '../ui/Button';
import Card from '../ui/Card';

const AllArticles = () => {
    const [articles, setArticles] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sortBy, setSortBy] = useState('latest');
    const [viewMode, setViewMode] = useState('list');
    const [searchParams, setSearchParams] = useSearchParams();

    const searchQuery = searchParams.get('q') || '';

    useEffect(() => {
        fetchArticles();
    }, [currentPage, selectedCategory, sortBy, searchQuery]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchArticles = async () => {
        try {
            setLoading(true);
            let response;

            if (searchQuery) {
                response = await articleService.searchArticles(searchQuery, currentPage, 12);
            } else if (selectedCategory) {
                response = await articleService.getArticlesByCategory(selectedCategory, currentPage, 12);
            } else {
                response = await articleService.getArticles(currentPage, 12);
            }

            setArticles(response.data.content);
            setTotalPages(response.data.totalPages);
            setTotalElements(response.data.totalElements);
        } catch (error) {
            console.error('Error fetching articles:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await articleService.getCategories();
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setCurrentPage(0);
        // Clear search params when filtering by category
        if (searchQuery) {
            setSearchParams({});
        }
    };

    const handleSortChange = (sort) => {
        setSortBy(sort);
        setCurrentPage(0);
    };

    const clearFilters = () => {
        setSelectedCategory('');
        setSortBy('latest');
        setCurrentPage(0);
        setSearchParams({});
    };

    const ArticleGridCard = ({ article }) => (
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

    const ArticleListItem = ({ article }) => (
        <Card className="hover:shadow-md transition-shadow duration-300">
            <Link to={`/article/${article.id}`} className="group">
                <div className="flex p-6">
                    <div className="flex-shrink-0 w-48 h-32 overflow-hidden rounded-lg mr-6">
                        <img
                            src={article.imageUrl || '/images/placeholder.jpg'}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center mb-2">
                            <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded mr-3">
                                {article.category}
                            </span>
                            <div className="flex items-center text-gray-500 text-xs">
                                <Eye className="w-3 h-3 mr-1" />
                                <span>{article.viewCount} views</span>
                            </div>
                        </div>
                        <h3 className="font-semibold text-xl text-gray-800 group-hover:text-blue-600 transition-colors mb-3 line-clamp-2">
                            {article.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-3">
                            {article.excerpt || truncateText(article.content, 200)}
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center">
                                <User className="w-4 h-4 mr-1" />
                                <span>{article.author}</span>
                            </div>
                            <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                <span>{timeAgo(article.createdAt)}</span>
                            </div>
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
                        <div className="h-8 bg-gray-200 rounded mb-6"></div>
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
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
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        {/* Header */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                                    {searchQuery ? `Search Results for "${searchQuery}"` : 'All Articles'}
                                </h1>
                                <p className="text-gray-600">
                                    {searchQuery
                                        ? `Found ${totalElements} articles`
                                        : selectedCategory
                                            ? `${totalElements} articles in ${selectedCategory}`
                                            : `${totalElements} total articles`
                                    }
                                </p>
                            </div>

                            {/* View Mode Toggle */}
                            <div className="flex items-center space-x-2 mt-4 md:mt-0">

                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
                                >
                                    <List className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
                                >
                                    <Grid className="w-4 h-4" />
                                </button>

                            </div>
                        </div>

                        {/* Filters */}
                        <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-white rounded-lg shadow">
                            <div className="flex items-center">
                                <Filter className="w-4 h-4 mr-2 text-gray-500" />
                                <span className="text-sm font-medium text-gray-700">Filters:</span>
                            </div>

                            <select
                                value={selectedCategory}
                                onChange={(e) => handleCategoryChange(e.target.value)}
                                className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">All Categories</option>
                                {categories.map((category) => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>

                            <select
                                value={sortBy}
                                onChange={(e) => handleSortChange(e.target.value)}
                                className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="latest">Latest First</option>
                                <option value="oldest">Oldest First</option>
                                <option value="popular">Most Popular</option>
                                <option value="title">Title A-Z</option>
                            </select>

                            {(selectedCategory || searchQuery) && (
                                <Button variant="outline" size="sm" onClick={clearFilters}>
                                    Clear Filters
                                </Button>
                            )}
                        </div>

                        {/* Articles Grid/List */}
                        {articles.length > 0 ? (
                            <>
                                {viewMode === 'grid' ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                        {articles.map((article) => (
                                            <ArticleGridCard key={article.id} article={article} />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="space-y-6 mb-8">
                                        {articles.map((article) => (
                                            <ArticleListItem key={article.id} article={article} />
                                        ))}
                                    </div>
                                )}

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="flex justify-center items-center space-x-2">
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
                                <div className="text-6xl mb-4">📰</div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">No Articles Found</h3>
                                <p className="text-gray-600 mb-6">
                                    {searchQuery
                                        ? "Try adjusting your search terms or browse all articles."
                                        : "No articles are available at the moment."
                                    }
                                </p>
                                {(selectedCategory || searchQuery) && (
                                    <Button onClick={clearFilters}>
                                        Clear Filters
                                    </Button>
                                )}
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

export default AllArticles;