import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { newsService } from '../services/newsService';

const NewsDetailPage = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNewsDetail();
  }, [id]);

  const fetchNewsDetail = async () => {
    try {
      setLoading(true);
      const response = await newsService.getNewsById(id);
      setNews(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load news details.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="w-12 h-12 border-b-2 rounded-full animate-spin border-primary"></div>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="py-12 text-center">
        <p className="mb-4 text-xl text-red-600">{error || 'News not found'}</p>
        <Link to="/news" className="font-medium text-primary hover:underline">
          ← Back to News
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link to="/news" className="inline-flex items-center mb-6 text-primary hover:text-blue-700">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to News
      </Link>

      <article className="mt-6 overflow-hidden bg-white rounded-lg shadow-lg">
        {news.image_url && (
          <img
            src={news.image_url}
            alt={news.title}
            className="object-cover w-full h-96"
          />
        )}

        <div className="p-8">
          <div className="flex items-center mb-4 text-sm text-gray-500">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {formatDate(news.published_date)}
          </div>

          <h1 className="mb-6 text-4xl font-bold text-gray-800">
            {news.title}
          </h1>

          <div className="text-lg leading-relaxed prose text-gray-700 whitespace-pre-wrap max-w-none">
            {news.content}
          </div>
        </div>
      </article>
    </div>
  );
};

export default NewsDetailPage;