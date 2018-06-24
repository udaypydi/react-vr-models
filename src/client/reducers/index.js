import { combineReducers } from 'redux';

import HomePageReducers from './HomePageReducers';

export default combineReducers({
  homePage: HomePageReducers,
});
