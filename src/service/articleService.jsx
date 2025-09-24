// services/articleService.js
import api from './api';

export const articleService = {
    // Get all articles with pagination
    getArticles: (page = 0, size = 10) => {
        return api.get(`/v1/user/articles?page=${page}&size=${size}`);
    },

    // Get article by ID
    getArticleById: (id) => {
        return api.get(`/v1/user/article/${id}`);
    },

    // Create new article
    createArticle: (article) => {
        return api.post('/api/articles', article);
    },

    // Update article
    updateArticle: (id, article) => {
        return api.put(`/api/articles/${id}`, article);
    },

    // Delete article
    deleteArticle: (id) => {
        return api.delete(`/api/articles/${id}`);
    },

    // Increment view count
    incrementView: (id) => {
        return api.post(`/v1/user/${id}/view`);
    },

    // Get articles by category
    getArticlesByCategory: (category, page = 0, size = 10) => {
        return api.get(`/v1/user/articles/category/${category}?page=${page}&size=${size}`);
    },

    // Search articles
    searchArticles: (query, page = 0, size = 10) => {
        return api.get(`/v1/user/search?q=${query}&page=${page}&size=${size}`);
    },

    // Get featured articles
    getFeaturedArticles: () => {
        return api.get('/v1/user/featured');
    },

    // Get latest articles
    getLatestArticles: () => {
        return api.get('/v1/user/latest');
    },

    // Get popular articles
    getPopularArticles: () => {
        return api.get('/v1/user/most-viewed');
    },

    // Get categories
    getCategories: () => {
        return api.get('/v1/user/categories');
    },

    // Admin endpoints
    getAllArticlesForAdmin: (page = 0, size = 10) => {
        return api.get(`/api/articles/admin/all?page=${page}&size=${size}`);
    },

    toggleFeatured: (id) => {
        return api.put(`/api/articles/${id}/featured`);
    },

    togglePublished: (id) => {
        return api.put(`/api/articles/${id}/publish`);
    }
};

