import { useState, useEffect, useCallback, useMemo } from 'react';
import { photoService } from '../services/api';

const PHOTOS_PER_PAGE = 20;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const photoCache = new Map();

export const usePhotos = (userId = null, initialPage = 1) => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(true);
  const [totalPhotos, setTotalPhotos] = useState(0);

  // Cache key generation
  const cacheKey = useMemo(() => {
    return `photos_${userId || 'all'}_${page}`;
  }, [userId, page]);

  // Check if cache is valid
  const isCacheValid = useCallback((cacheEntry) => {
    if (!cacheEntry) return false;
    const now = Date.now();
    return now - cacheEntry.timestamp < CACHE_DURATION;
  }, []);

  // Fetch photos with pagination
  const fetchPhotos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Check cache first
      const cachedData = photoCache.get(cacheKey);
      if (isCacheValid(cachedData)) {
        setPhotos(cachedData.data);
        setTotalPhotos(cachedData.total);
        setHasMore(cachedData.hasMore);
        return;
      }

      const params = {
        page,
        limit: PHOTOS_PER_PAGE,
      };

      const response = userId 
        ? await photoService.getUserPhotos(userId, params)
        : await photoService.getPhotos(params);

      const { data, total } = response;
      
      // Update cache
      photoCache.set(cacheKey, {
        data,
        total,
        hasMore: data.length === PHOTOS_PER_PAGE,
        timestamp: Date.now(),
      });

      setPhotos(prevPhotos => (page === 1 ? data : [...prevPhotos, ...data]));
      setTotalPhotos(total);
      setHasMore(data.length === PHOTOS_PER_PAGE);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [userId, page, cacheKey, isCacheValid]);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  // Load more photos
  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
    }
  }, [loading, hasMore]);

  // Upload photo with optimistic update
  const uploadPhoto = useCallback(async (photoData) => {
    try {
      setLoading(true);
      
      // Optimistic update
      const optimisticPhoto = {
        id: 'temp_' + Date.now(),
        ...photoData,
        status: 'uploading',
      };
      
      setPhotos(prev => [optimisticPhoto, ...prev]);

      const response = await photoService.uploadPhoto(photoData);
      
      // Replace optimistic photo with real one
      setPhotos(prev => 
        prev.map(photo => 
          photo.id === optimisticPhoto.id ? response : photo
        )
      );

      // Invalidate cache
      photoCache.clear();
      
      return response;
    } catch (err) {
      // Remove optimistic photo on error
      setPhotos(prev => 
        prev.filter(photo => photo.id !== optimisticPhoto.id)
      );
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete photo with optimistic update
  const deletePhoto = useCallback(async (photoId) => {
    try {
      setLoading(true);
      
      // Optimistic update
      const deletedPhoto = photos.find(p => p.id === photoId);
      setPhotos(prev => prev.filter(photo => photo.id !== photoId));

      await photoService.deletePhoto(photoId);
      
      // Invalidate cache
      photoCache.clear();
    } catch (err) {
      // Restore photo on error
      if (deletedPhoto) {
        setPhotos(prev => [...prev, deletedPhoto]);
      }
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [photos]);

  return {
    photos,
    loading,
    error,
    uploadPhoto,
    deletePhoto,
    loadMore,
    hasMore,
    totalPhotos,
    page,
    setPage,
  };
}; 