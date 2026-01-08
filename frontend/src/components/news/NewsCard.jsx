import { Link } from 'react-router-dom';

const NewsCard = ({ news }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow-md hover:shadow-xl">
      {news.image_url && (
        <div className="h-48 overflow-hidden">
          <img
            src={news.image_url}
            alt={news.title}
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="mb-2 text-sm text-gray-500">
          {formatDate(news.published_date)}
        </div>
        
        <h3 className="mb-2 text-xl font-semibold text-gray-800 transition-colors hover:text-primary">
          {news.title}
        </h3>
        
        <p className="mb-4 text-gray-600 line-clamp-3">
          {news.content}
        </p>
        
        <Link
          to={`/news/${news.id}`}
          className="inline-flex items-center font-medium text-primary hover:text-blue-700"
        >
          Read more 
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default NewsCard;