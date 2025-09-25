// hooks/useArticles.js
import { useState, useEffect } from 'react';
import { articleService } from '../services/articleService';

export const useArticles = (page = 0, size = 10) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);

    useEffect(() => {
        fetchArticles();
    }, [page, size]);

    const fetchArticles = async () => {
        try {
            console.log(`Here:${process.env.REACT_APP_API_URL}`);

            setLoading(true);
            const response = await articleService.getArticles(page, size);
            setArticles(response.data.content);
            setTotalPages(response.data.totalPages);
            setTotalElements(response.data.totalElements);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const refetch = () => {
        fetchArticles();
    };

    return {
        articles,
        loading,
        error,
        totalPages,
        totalElements,
        refetch
    };
};
