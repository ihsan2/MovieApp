import axios from 'axios';

export const getSearchMovies = url => ({
  type: 'SEARCH_MOVIES',
  payload: axios.get(url),
});

export const getSearchPerson = url => ({
  type: 'SEARCH_PERSON',
  payload: axios.get(url),
});
