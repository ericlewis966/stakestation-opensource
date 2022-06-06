import { combineReducers } from 'redux';

import stakingReducer from './stakingReducer';

export default combineReducers({
    project: stakingReducer
  });