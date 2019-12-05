import { combineReducers } from 'redux';
import { uiStateReducer } from 'react-redux-ui-state';
import adapterFetch from 'redux-api/lib/adapters/fetch';
import { reducer, toastMessage, timeSpent, attempts } from '../actions/CandidatorActions';

import reduxApi from '../api/rest';

// Initialize react-api
reduxApi.use('fetch', adapterFetch(fetch));

const rootReducer = combineReducers({
  ...reduxApi.reducers,
  uiState: uiStateReducer,
  toastMessage,
  candidator: reducer,
  timeSpent,
  attempts,
});

export default rootReducer;
