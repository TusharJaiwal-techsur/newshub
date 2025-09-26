
// components/pages/AdminPages/Dashboard.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Plus, Edit, Trash2, Eye, Star, Users, TrendingUp,
    FileText, Calendar, BarChart3, Settings
} from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import { articleService } from '../../../service/articleService';
import { authService } from '../../../service/auth';
import { formatDate, formatDateTime } from '../../../utils/dateUtils';
import Button from '../../ui/Button';
import Card from '../../ui/Card';
import STR from '../../../config/en';

const Dashboard = () => {
    const { isAuthenticated, admin } = useAuth();
    const [articles, setArticles] = useState([]);
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        if (isAuthenticated) {
            fetchDashboardData();
        }
    }, [isAuthenticated, currentPage]);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const [articlesRes, statsRes] = await Promise.all([
                articleService.getAllArticlesForAdmin(currentPage, 10),
                authService.getStats().catch(() => ({ data: {} }))
            ]);

            setArticles(articlesRes.data.content || []);

            setTotalPages(articlesRes.data.totalPages || 1); // default to 1 page

            setStats(statsRes.data || {});
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this article?')) {
            try {
                await articleService.deleteArticle(id);
                fetchDashboardData();
            } catch (error) {
                console.error('Error deleting article:', error);
            }
        }
    };

    const handleToggleFeatured = async (id) => {
        try {
            await articleService.toggleFeatured(id);
            fetchDashboardData();
        } catch (error) {
            console.error('Error toggling featured status:', error);
        }
    };

    const handleTogglePublished = async (id) => {
        try {
            await articleService.togglePublished(id);
            fetchDashboardData();
        } catch (error) {
            console.error('Error toggling published status:', error);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">{STR.admin.dashboard.AccessDenied}</h1>
                    <p className="text-gray-600 mb-6">{STR.admin.dashboard.login_message}</p>
                    <Link to="/">
                        <Button>{STR.admin.dashboard.go_home}</Button>
                    </Link>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 py-8">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded mb-8"></div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
                            ))}
                        </div>
                        <div className="bg-gray-200 h-96 rounded-lg"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">{STR.admin.dashboard.adminDashboard}</h1>
                        <p className="text-gray-600">{STR.admin.dashboard.welcomeback} {admin?.fullName}</p>
                    </div>
                    <Link to="/admin/create">
                        <Button>
                            <Plus className="w-4 h-4 mr-2" />
                            {STR.admin.dashboard.createArticle}
                        </Button>
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card className="p-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-blue-100 rounded-full mr-4">
                                <FileText className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">{STR.admin.dashboard.totalArticles}</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.totalArticles || 0}</p>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-green-100 rounded-full mr-4">
                                <Eye className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">{STR.admin.dashboard.totalViews}</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.totalViews || 0}</p>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-yellow-100 rounded-full mr-4">
                                <TrendingUp className="w-6 h-6 text-yellow-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">{STR.admin.dashboard.viewsTody}</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.viewsToday || 0}</p>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-purple-100 rounded-full mr-4">
                                <BarChart3 className="w-6 h-6 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">{STR.admin.dashboard.published}</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.publishedArticles || 0}</p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Articles Table */}
                <Card>
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-800">{STR.admin.dashboard.recentArticles}</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        {STR.admin.dashboard.article}
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        {STR.admin.dashboard.status}
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        {STR.admin.dashboard.views}
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        {STR.admin.dashboard.Created}
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        {STR.admin.dashboard.actions}
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {articles.map((article) => (
                                    <tr key={article.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-12 w-16">
                                                    <img
                                                        className="h-12 w-16 rounded object-cover"
                                                        src={article.imageUrl || '/images/placeholder.jpg'}
                                                        alt={article.title}
                                                    />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900 line-clamp-1">
                                                        {article.title}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {article.category} • {article.author}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center space-x-2">
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${article.published
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                                    }`}>
                                                    {article.published ? 'Published' : 'Draft'}
                                                </span>
                                                {article.featured && (
                                                    <Star className="w-4 h-4 text-yellow-500" />
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            <div className="flex items-center">
                                                <Eye className="w-4 h-4 mr-1 text-gray-400" />
                                                {article.viewCount}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {formatDateTime(article.createdAt)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex items-center space-x-2">
                                                <Link
                                                    to={`/admin/edit/${article.id}`}
                                                    className="text-blue-600 hover:text-blue-900"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleToggleFeatured(article.id)}
                                                    className={`${article.featured ? 'text-yellow-600' : 'text-gray-400'
                                                        } hover:text-yellow-900`}
                                                    title="Toggle Featured"
                                                >
                                                    <Star className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleTogglePublished(article.id)}
                                                    className={`${article.published ? 'text-green-600' : 'text-gray-400'
                                                        } hover:text-green-900`}
                                                    title="Toggle Published"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(article.id)}
                                                    className="text-red-600 hover:text-red-900"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="px-6 py-4 border-t border-gray-200">
                            <div className="flex justify-between items-center">
                                <div className="text-sm text-gray-700">
                                    Page {currentPage + 1} of {totalPages}
                                </div>
                                <div className="flex space-x-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                                        disabled={currentPage === 0}
                                    >
                                        Previous
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
                                        disabled={currentPage === totalPages - 1}
                                    >
                                        Next
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;