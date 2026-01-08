import { supabase } from '../config/supabase.js';

// Get all news
export const getAllNews = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .eq('is_active', true)
      .order('published_date', { ascending: false });

    if (error) throw error;

    res.json({
      success: true,
      data: data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get single news by ID
export const getNewsById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('news')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'News not found'
      });
    }

    res.json({
      success: true,
      data: data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Create news
export const createNews = async (req, res) => {
  try {
    const { title, content, published_date } = req.body;
    let imageUrl = null;

    // Upload image if provided
    if (req.file) {
      const fileName = `${Date.now()}-${req.file.originalname}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('news-images')
        .upload(fileName, req.file.buffer, {
          contentType: req.file.mimetype,
          upsert: false
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('news-images')
        .getPublicUrl(fileName);

      imageUrl = urlData.publicUrl;
    }

    // Insert news record
    const { data, error } = await supabase
      .from('news')
      .insert([
        {
          title,
          content,
          image_url: imageUrl,
          published_date: published_date || new Date().toISOString(),
          created_by: 'admin' // TODO: Get from auth
        }
      ])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      success: true,
      data: data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update news
export const updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, published_date, is_active } = req.body;

    // Get existing news
    const { data: existingNews } = await supabase
      .from('news')
      .select('image_url')
      .eq('id', id)
      .single();

    if (!existingNews) {
      return res.status(404).json({
        success: false,
        message: 'News not found'
      });
    }

    let imageUrl = existingNews.image_url;

    // Upload new image if provided
    if (req.file) {
      // Delete old image if exists
      if (existingNews.image_url) {
        const oldFileName = existingNews.image_url.split('/').pop();
        await supabase.storage
          .from('news-images')
          .remove([oldFileName]);
      }

      // Upload new image
      const fileName = `${Date.now()}-${req.file.originalname}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('news-images')
        .upload(fileName, req.file.buffer, {
          contentType: req.file.mimetype
        });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('news-images')
        .getPublicUrl(fileName);

      imageUrl = urlData.publicUrl;
    }

    // Update news record
    const updateData = {
      ...(title && { title }),
      ...(content && { content }),
      ...(published_date && { published_date }),
      ...(is_active !== undefined && { is_active }),
      image_url: imageUrl
    };

    const { data, error } = await supabase
      .from('news')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    res.json({
      success: true,
      data: data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete news
export const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;

    // Get existing news
    const { data: existingNews } = await supabase
      .from('news')
      .select('image_url')
      .eq('id', id)
      .single();

    if (!existingNews) {
      return res.status(404).json({
        success: false,
        message: 'News not found'
      });
    }

    // Delete image if exists
    if (existingNews.image_url) {
      const fileName = existingNews.image_url.split('/').pop();
      await supabase.storage
        .from('news-images')
        .remove([fileName]);
    }

    // Delete news record
    const { error } = await supabase
      .from('news')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.json({
      success: true,
      message: 'News deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};