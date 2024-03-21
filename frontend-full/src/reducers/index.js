import auth from 'reducers/auth';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import users from 'reducers/users/usersReducers';
import startups from 'reducers/startups/startupsReducers';


export default (history) =>
  combineReducers({
    router: connectRouter(history),
    auth,
    startups,
    users,
  });
