import list from 'reducers/startups/startupsListReducers';
import form from 'reducers/startups/startupsFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
