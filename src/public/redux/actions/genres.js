import axios from 'axios';

export const getGenres = url => ({
  type: 'GENRE',
  payload: axios.get(url),
});
