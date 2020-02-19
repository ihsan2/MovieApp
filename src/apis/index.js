export const API_KEY = '7cd2756546eb1bcaa95c339099e25e5f';
export const ROOT_URL = 'https://api.themoviedb.org/3';
const withKey = url => `${ROOT_URL}${url}?api_key=${API_KEY}`;

// Images
const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/';
export const getW45ImageUrl = imagePath => `${BASE_IMAGE_URL}w45${imagePath}`;
export const getW92ImageUrl = imagePath => `${BASE_IMAGE_URL}w92${imagePath}`;
export const getW185ImageUrl = imagePath => `${BASE_IMAGE_URL}w185${imagePath}`;
export const getW300ImageUrl = imagePath => `${BASE_IMAGE_URL}w300${imagePath}`;
export const getW500ImageUrl = imagePath => `${BASE_IMAGE_URL}w500${imagePath}`;
export const getW780ImageUrl = imagePath => `${BASE_IMAGE_URL}w780${imagePath}`;
export const getW1280ImageUrl = imagePath =>
  `${BASE_IMAGE_URL}w1280${imagePath}`;

// Movie Details
export const getDetailsMovieUrl = ({movieId}) => withKey(`/movie/${movieId}`);

// Genres
export const getGenresUrl = () => withKey('/genre/movie/list');

// Movies Sections
export const getPopularMoviesUrl = page =>
  `${withKey('/movie/popular')}&page=${page}`;
export const getTopRatedMoviesUrl = page =>
  `${withKey('/movie/top_rated')}&page=${page}`;
export const getUpcomingMoviesUrl = page =>
  `${withKey('/movie/upcoming')}&page=${page}`;
export const getNowPlayingMoviesUrl = page =>
  `${withKey('/movie/now_playing')}&page=${page}`;
export const getTrendingDailyMoviesUrl = page =>
  `${withKey('/trending/movie/day')}&page=${page}`;

// People Sections
export const getPopularPersonUrl = page =>
  `${withKey('/person/popular')}&page=${page}`;

// Get One Person and One Movie by Id
export const getPersonUrl = id => `${withKey(`/person/${id}`)}&language=en-US`;
export const getMovieUrl = id => `${withKey(`/movie/${id}`)}&language=en-US`;

// Get Cast of a movie
export const getCastUrl = id =>
  `${withKey(`/movie/${id}/credits`)}&language=en-US`;

// Get Movie of a people
export const getMoviesPersonUrl = id =>
  `${withKey(`/person/${id}/credits`)}&language=en-US`;

// Section Search
export const getSearchMoviesUrl = query =>
  `${withKey('/search/movie')}&query=${query}`;
export const getSearchPersonUrl = query =>
  `${withKey('/search/person')}&query=${query}`;
