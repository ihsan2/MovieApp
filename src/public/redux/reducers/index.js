import {combineReducers} from 'redux';

// import all reducer
import nowplaying from './nowplaying';
import upcoming from './upcoming';
import popular from './popular';
import trending from './trending';
import toprated from './toprated';
import genre from './genres';
import people from './people';
import person from './person';
import movie from './movie';
import cast from './cast';
import moviesperson from './moviesperson';
import searchmovies from './searchmovies';
import searchperson from './searchperson';

const rootReducer = combineReducers({
  nowplaying,
  upcoming,
  popular,
  trending,
  toprated,
  genre,
  people,
  person,
  movie,
  cast,
  moviesperson,
  searchmovies,
  searchperson,
});

export default rootReducer;
