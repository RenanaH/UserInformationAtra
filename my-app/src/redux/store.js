import { createStore ,applyMiddleware,combineReducers} from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducers';
import {getUser} from './middleware/crud'
import { actions } from './actions/user.action';
const store = createStore(
    
    reducer,
    composeWithDevTools(applyMiddleware(getUser))

)
var url = window.location;
console.log(url);
var userName = (url.pathname.split('/')[1]);
console.log(userName);
store.dispatch(actions.getUserFromServer(userName));

export default store;
