import axios from 'axios';

export const getPerson = url => ({
  type: 'PERSON',
  payload: axios.get(url),
});
