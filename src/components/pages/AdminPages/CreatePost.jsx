// components/pages / AdminPages / CreatePost.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, Eye, Image, Tag } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import { articleService } from '../../../service/articleService';
import { CATEGORIES } from '../../../utils/constants';
import Button from '../../ui/Button';
import Card from '../../ui/Card';
import STR from '../../../config/en';

const CreatePost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated, admin } = useAuth();
    const isEditing = Boolean(id);

    const [article, setArticle] = useState({
        title: '',
        content: '',
        excerpt: '',
        category: '',
        author: admin?.fullName || '',
        imageUrl: '',
        featured: false,
        published: true,
        tags: ''
    });
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (isEditing && id) {
            fetchArticle();
        }
    }, [isEditing, id]);

    useEffect(() => {
        if (admin?.fullName && !article.author) {
            setArticle(prev => ({ ...prev, author: admin.fullName }));
        }
    }, [admin]);

    const fetchArticle = async () => {
        try {
            setLoading(true);
            const response = await articleService.getArticleById(id);
            setArticle(response.data);
        } catch (error) {
            console.error('Error fetching article:', error);
            navigate('/admin/dashboard');
        } finally {
            setLoading(false);
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!article.title.trim()) {
            newErrors.title = 'Title is required';
        } else if (article.title.length > 255) {
            newErrors.title = 'Title must be less than 255 characters';
        }

        if (!article.content.trim()) {
            newErrors.content = 'Content is required';
        }

        if (!article.category) {
            newErrors.category = 'Category is required';
        }

        if (!article.author.trim()) {
            newErrors.author = 'Author is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setSaving(true);

        try {
            if (isEditing) {
                await articleService.updateArticle(id, article);
            } else {
                await articleService.createArticle(article);
            }
            navigate('/admin/dashboard');
        } catch (error) {
            console.error('Error saving article:', error);
            setErrors({ general: 'Error saving article. Please try again.' });
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setArticle(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handlePreview = () => {
        // You could implement a preview modal here
        console.log('Preview article:', article);
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">{STR.createPage.auth.access}</h1>
                    <p className="text-gray-600 mb-6">{STR.createPage.auth.message}</p>
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
                        <div className="bg-gray-200 h-96 rounded-lg"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">
                            {isEditing ? 'Edit Article' : 'Create New Article'}
                        </h1>
                        <div className="flex space-x-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handlePreview}
                            >
                                <Eye className="w-4 h-4 mr-2" />
                                {STR.createPage.create_post.Views || 'Preview'}
                            </Button>
                        </div>
                    </div>

                    {errors.general && (
                        <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                            {errors.general}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Main Content */}
                            <div className="lg:col-span-2 space-y-6">
                                <Card className="p-6">
                                    {/* Title */}
                                    <div className="mb-6">
                                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                            {STR.createPage.create_post.title}
                                        </label>
                                        <input
                                            type="text"
                                            id="title"
                                            name="title"
                                            value={article.title}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.title ? 'border-red-300' : 'border-gray-300'
                                                }`}
                                            placeholder="Enter article title"
                                        />
                                        {errors.title && (
                                            <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                                        )}
                                    </div>

                                    {/* Excerpt */}
                                    <div className="mb-6">
                                        <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
                                            {STR.createPage.create_post.excerpt}
                                        </label>
                                        <textarea
                                            id="excerpt"
                                            name="excerpt"
                                            value={article.excerpt}
                                            onChange={handleChange}
                                            rows={3}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Brief description of the article (optional)"
                                        />
                                        <p className="mt-1 text-sm text-gray-500">
                                            {STR.createPage.create_post.message}
                                        </p>
                                    </div>

                                    {/* Content */}
                                    <div>
                                        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                                            {STR.createPage.create_post.content}
                                        </label>
                                        <textarea
                                            id="content"
                                            name="content"
                                            value={article.content}
                                            onChange={handleChange}
                                            rows={20}
                                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.content ? 'border-red-300' : 'border-gray-300'
                                                }`}
                                            placeholder="Write your article content here..."
                                        />
                                        {errors.content && (
                                            <p className="mt-1 text-sm text-red-600">{errors.content}</p>
                                        )}
                                        <p className="mt-1 text-sm text-gray-500">
                                            {STR.createPage.create_post.message_content}
                                        </p>
                                    </div>
                                </Card>
                            </div>

                            {/* Sidebar */}
                            <div className="lg:col-span-1 space-y-6">
                                {/* Publish */}
                                <Card className="p-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">{STR.createPage.create_post.publish}</h3>

                                    <div className="space-y-4">
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id="published"
                                                name="published"
                                                checked={article.published}
                                                onChange={handleChange}
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                            />
                                            <label htmlFor="published" className="ml-2 text-sm text-gray-700">
                                                {STR.createPage.create_post.publish_immediately}
                                            </label>
                                        </div>

                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id="featured"
                                                name="featured"
                                                checked={article.featured}
                                                onChange={handleChange}
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                            />
                                            <label htmlFor="featured" className="ml-2 text-sm text-gray-700">
                                                {STR.createPage.create_post.featured}
                                            </label>
                                        </div>
                                    </div>

                                    <div className="mt-6 pt-4 border-t border-gray-200">
                                        <Button
                                            type="submit"
                                            className="w-full"
                                            loading={saving}
                                        >
                                            <Save className="w-4 h-4 mr-2" />
                                            {saving ? 'Saving...' : (isEditing ? 'Update Article' : 'Save Article')}
                                        </Button>
                                    </div>
                                </Card>

                                {/* Article Details */}
                                <Card className="p-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">{STR.createPage.create_post.articleDetails}</h3>

                                    <div className="space-y-4">
                                        {/* Category */}
                                        <div>
                                            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                                                {STR.createPage.create_post.category}
                                            </label>
                                            <select
                                                id="category"
                                                name="category"
                                                value={article.category}
                                                onChange={handleChange}
                                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.category ? 'border-red-300' : 'border-gray-300'
                                                    }`}
                                            >
                                                <option value="">{STR.createPage.create_post.select_category}</option>
                                                {CATEGORIES.map((category) => (
                                                    <option key={category} value={category}>
                                                        {category}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.category && (
                                                <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                                            )}
                                        </div>

                                        {/* Author */}
                                        <div>
                                            <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
                                                {STR.createPage.create_post.author}
                                            </label>
                                            <input
                                                type="text"
                                                id="author"
                                                name="author"
                                                value={article.author}
                                                onChange={handleChange}
                                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.author ? 'border-red-300' : 'border-gray-300'
                                                    }`}
                                                placeholder="Author name"
                                            />
                                            {errors.author && (
                                                <p className="mt-1 text-sm text-red-600">{errors.author}</p>
                                            )}
                                        </div>

                                        {/* Featured Image */}
                                        <div>
                                            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-2">
                                                <Image className="w-4 h-4 inline mr-1" />
                                                {STR.createPage.create_post.featured_image}
                                            </label>
                                            <input
                                                type="url"
                                                id="imageUrl"
                                                name="imageUrl"
                                                value={article.imageUrl}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="https://example.com/image.jpg"
                                            />
                                        </div>

                                        {/* Tags */}
                                        <div>
                                            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                                                <Tag className="w-4 h-4 inline mr-1" />
                                                {STR.createPage.create_post.tags}
                                            </label>
                                            <input
                                                type="text"
                                                id="tags"
                                                name="tags"
                                                value={article.tags}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="tag1, tag2, tag3"
                                            />
                                            <p className="mt-1 text-sm text-gray-500">
                                                {STR.createPage.create_post.tags_message}
                                            </p>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;