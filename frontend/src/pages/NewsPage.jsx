import NewsList from '../components/news/NewsList';

const NewsPage = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold text-gray-800">Сүүлийн үеийн мэдээ</h1>
        <p className="text-gray-600">Сургуулийн үйл явдал, шинэ мэдээлэлтэй танилцах</p>
      </div>
      
      <NewsList />
    </div>
  );
};

export default NewsPage;