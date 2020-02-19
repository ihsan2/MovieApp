import axios from 'axios';

export const getNowPlaying = url => ({
  type: 'NOW_PLAYING',
  payload: axios.get(url),
});

export const getUpcoming = url => ({
  type: 'UPCOMING',
  payload: axios.get(url),
});

export const getPopular = url => ({
  type: 'POPULAR',
  payload: axios.get(url),
});

export const getTrending = url => ({
  type: 'TRENDING',
  payload: axios.get(url),
});

export const getTopRated = url => ({
  type: 'TOP_RATED',
  payload: axios.get(url),
});

export const getMovie = url => ({
  type: 'MOVIE',
  payload: axios.get(url),
});
