import axios from 'axios';

const API_KEY = 'https://api.themoviedb.org/3/trending/tv/day?api_key=8049dcc0e794d4c36e976956d1f6826b'; // Apni asli key yahan dalein
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const tmdbService = {
  // Trending Dramas for Home
  getTrendingDramas: () => api.get('/trending/tv/day'),
  
  // Specific for Drama Page (Korean Only)
  getKoreanDramas: () => api.get('/discover/tv', {
    params: { with_original_language: 'ko', sort_by: 'popularity.desc' }
  }),

  // Specific for Movies Page (Korean Only)
  getKoreanMovies: () => api.get('/discover/movie', {
    params: { with_original_language: 'ko', sort_by: 'popularity.desc' }
  }),

  // Image URL Helper
  getImageUrl: (path: string) => `${IMAGE_BASE_URL}${path}`,
};