import axios from 'axios';

export const getMoviesPerson = url => ({
  type: 'MOVIES_PERSON',
  payload: axios.get(url),
});
