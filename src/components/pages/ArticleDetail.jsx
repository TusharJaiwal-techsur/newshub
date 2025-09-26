// components/pages/ArticleDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, User, Eye, Tag, Share2, Facebook, Twitter, MessageCircle } from 'lucide-react';
import { articleService } from '../../service/articleService';
import { formatDate, formatDateTime } from '../../utils/dateUtils';
import Sidebar from '../common/Sidebar';
import Button from '../ui/Button';
import STR from '../../config/en';

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetchArticle();
      incrementViewCount();
    }
  }, [id]);

  const fetchArticle = async () => {
    try {
      setLoading(true);
      const response = await articleService.getArticleById(id);
      setArticle(response.data);

      // Fetch related articles from the same category
      if (response.data.category) {
        const relatedRes = await articleService.getArticlesByCategory(
          response.data.category, 0, 4
        );
        setRelatedArticles(relatedRes.data.content.filter(a => a.id !== parseInt(id)));
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const incrementViewCount = async () => {
    try {
      await articleService.incrementView(id);
    } catch (error) {
      // Silently handle view count errors
      console.error('Error incrementing view count:', error);
    }
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = article?.title || '';

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    // You might want to show a toast notification here
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded mb-4"></div>
                <div className="h-64 bg-gray-200 rounded mb-6"></div>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-4 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="animate-pulse">
                <div className="h-64 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">{STR.articlePage.articleNotFound}</h1>
          <p className="text-gray-600 mb-6">{STR.articlePage.articleNotFoundMessage}</p>
          <Link to="/">
            <Button>{STR.articlePage.back}</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Article Content */}
          <article className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Article Header */}
              <div className="p-6 border-b">
                <div className="flex items-center space-x-2 mb-4">
                  <Link
                    to={`/category/${article.category.toLowerCase()}`}
                    className="px-3 py-1 bg-blue-100 text-blue-600 text-sm font-medium rounded hover:bg-blue-200 transition-colors"
                  >
                    {article.category}
                  </Link>
                  {article.featured && (
                    <span className="px-2 py-1 bg-red-100 text-red-600 text-xs font-medium rounded">
                      {STR.articlePage.Featured}
                    </span>
                  )}
                </div>

                <h1 className="text-3xl font-bold text-gray-800 mb-4 leading-tight">
                  {article.title}
                </h1>

                {article.excerpt && (
                  <p className="text-lg text-gray-600 mb-6">{article.excerpt}</p>
                )}

                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{formatDateTime(article.createdAt)}</span>
                    </div>
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      <span>{article.viewCount} views</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Share2 className="w-4 h-4 text-gray-500" />
                    <button
                      onClick={() => handleShare('facebook')}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    >
                      <Facebook className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleShare('twitter')}
                      className="p-2 text-blue-400 hover:bg-blue-50 rounded transition-colors"
                    >
                      <Twitter className="w-4 h-4" />
                    </button>
                    <button
                      onClick={copyToClipboard}
                      className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors"
                    >
                      {STR.articlePage.copyLink}
                    </button>
                  </div>
                </div>
              </div>

              {/* Featured Image */}
              {article.imageUrl && (
                <div className="aspect-video overflow-hidden">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Article Content */}
              <div className="p-6">
                <div
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />

                {/* Tags */}
                {article.tags && (
                  <div className="mt-8 pt-6 border-t">
                    <div className="flex items-center flex-wrap gap-2">
                      <Tag className="w-4 h-4 text-gray-500" />
                      {article.tags.split(',').map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded hover:bg-gray-200 transition-colors cursor-pointer"
                        >
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <div className="mt-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">{STR.articlePage.relatedArticles}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relatedArticles.slice(0, 4).map((relatedArticle) => (
                    <Link
                      key={relatedArticle.id}
                      to={`/article/${relatedArticle.id}`}
                      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
                    >
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={relatedArticle.imageUrl || '/images/placeholder.jpg'}
                          alt={relatedArticle.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors mb-2 line-clamp-2">
                          {relatedArticle.title}
                        </h4>
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="w-3 h-3 mr-1" />
                          <span>{formatDate(relatedArticle.createdAt)}</span>
                          <span className="mx-2">•</span>
                          <Eye className="w-3 h-3 mr-1" />
                          <span>{relatedArticle.viewCount} {STR.articlePage.views}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;