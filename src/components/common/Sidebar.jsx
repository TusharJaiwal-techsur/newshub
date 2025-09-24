// components/common / Sidebar.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Clock, Tag } from 'lucide-react';
import { articleService } from '../../service/articleService';
import { timeAgo } from '../../utils/dateUtils';

const Sidebar = () => {
    const [popularArticles, setPopularArticles] = useState([]);
    const [latestArticles, setLatestArticles] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSidebarData();
    }, []);

    const fetchSidebarData = async () => {
        try {
            setLoading(true);
            const [popularRes, latestRes, categoriesRes] = await Promise.all([
                articleService.getPopularArticles(),
                articleService.getLatestArticles(),
                articleService.getCategories()
            ]);

            // setPopularArticles(popularRes.data);
            // setLatestArticles(latestRes.data);
            // setCategories(categoriesRes.data);

            console.log("Popular:", popularRes.data);
            console.log("Latest:", latestRes.data);
            console.log("Categories:", categoriesRes.data);

            setPopularArticles(Array.isArray(popularRes.data) ? popularRes.data : []);
            setLatestArticles(Array.isArray(latestRes.data) ? latestRes.data : []);
            setCategories(Array.isArray(categoriesRes.data) ? categoriesRes.data : []);

        } catch (error) {
            console.error('Error fetching sidebar data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white rounded-lg shadow-md p-6">
                        <div className="animate-pulse">
                            <div className="h-4 bg-gray-200 rounded mb-4"></div>
                            <div className="space-y-3">
                                {[1, 2, 3].map((j) => (
                                    <div key={j} className="h-3 bg-gray-200 rounded"></div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Popular Articles */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                    <TrendingUp className="w-5 h-5 text-red-500 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-800">Popular Articles</h3>
                </div>
                <div className="space-y-4">
                    {popularArticles.slice(0, 5).map((article, index) => (
                        <Link
                            key={article.id}
                            to={`/article/${article.id}`}
                            className="block group"
                        >
                            <div className="flex items-start space-x-3">
                                <span className="text-2xl font-bold text-gray-300 mt-1">
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-medium text-gray-800 group-hover:text-blue-600 line-clamp-2 transition-colors">
                                        {article.title}
                                    </h4>
                                    <div className="flex items-center text-xs text-gray-500 mt-1">
                                        <span>{article.category}</span>
                                        <span className="mx-1">•</span>
                                        <span>{article.viewCount} views</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Latest Articles */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                    <Clock className="w-5 h-5 text-blue-500 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-800">Latest Articles</h3>
                </div>
                <div className="space-y-4">
                    {latestArticles.map((article) => (
                        <Link
                            key={article.id}
                            to={`/article/${article.id}`}
                            className="block group"
                        >
                            <div className="flex space-x-3">
                                {article.imageUrl && (
                                    <img
                                        src={article.imageUrl}
                                        alt={article.title}
                                        className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                                    />
                                )}
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-medium text-gray-800 group-hover:text-blue-600 line-clamp-2 transition-colors">
                                        {article.title}
                                    </h4>
                                    <div className="flex items-center text-xs text-gray-500 mt-1">
                                        <span>{article.category}</span>
                                        <span className="mx-1">•</span>
                                        <span>{timeAgo(article.createdAt)}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                    <Tag className="w-5 h-5 text-green-500 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-800">Categories</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                        <Link
                            key={category}
                            to={`/category/${category.toLowerCase()}`}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-blue-100 hover:text-blue-600 transition-colors"
                        >
                            {category}
                        </Link>
                    ))}
                </div>
            </div>

            {/* AdSense Placeholder
            <div className="bg-gray-100 rounded-lg p-6 text-center">
                <div className="text-gray-500 text-sm mb-2">Advertisement</div>
                <div className="bg-white rounded border-2 border-dashed border-gray-300 h-60 flex items-center justify-center">
                    <span className="text-gray-400">Ad Space 300x250</span>
                </div>
            </div> */}
        </div>
    );
};

export default Sidebar;