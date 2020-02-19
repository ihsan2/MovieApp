import axios from 'axios';

export const getCast = url => ({
  type: 'CAST',
  payload: axios.get(url),
});
