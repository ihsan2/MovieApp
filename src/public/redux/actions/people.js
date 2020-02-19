import axios from 'axios';

export const getPopularPeople = url => ({
  type: 'POPULAR_PEOPLE',
  payload: axios.get(url),
});
