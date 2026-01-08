import api from './api';

export const newsService = {
  // Get all news
  getAllNews: async () => {
    const response = await api.get('/news');
    return response.data;
  },

  // Get single news by ID
  getNewsById: async (id) => {
    const response = await api.get(`/news/${id}`);
    return response.data;
  },

  // Create news (with image)
  createNews: async (newsData) => {
    const formData = new FormData();
    formData.append('title', newsData.title);
    formData.append('content', newsData.content);
    formData.append('published_date', newsData.published_date);
    
    if (newsData.image) {
      formData.append('image', newsData.image);
    }

    const response = await api.post('/news', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Update news
  updateNews: async (id, newsData) => {
    const formData = new FormData();
    
    if (newsData.title) formData.append('title', newsData.title);
    if (newsData.content) formData.append('content', newsData.content);
    if (newsData.published_date) formData.append('published_date', newsData.published_date);
    if (newsData.is_active !== undefined) formData.append('is_active', newsData.is_active);
    if (newsData.image) formData.append('image', newsData.image);

    const response = await api.put(`/news/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Delete news
  deleteNews: async (id) => {
    const response = await api.delete(`/news/${id}`);
    return response.data;
  },
};