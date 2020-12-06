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
// if(document.cookie){
//     let jwtFromCookie=document.cookie.split(";")
//     .filter(s=>s.includes('jwt'))[0].split("=").pop();
//     store.dispatch(actions.setTokenFromCookies(jwtFromCookie));
// }
let jwtFromCookie="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJzaW1kc01ycmNKZHBRZ3RhOGtnWHlRQmRERnkyIiwiZW1haWwiOiJjdG9AbGVhZGVyLmNvZGVzIiwiaXAiOiI1LjEwMi4yNDYuMjAyIiwiaWF0IjoxNjA0NDgyOTc0fQ.Nn2IC7j_VCDOFIkbwzT3nao0l7OcqbNqDUKkcL0Aoik";
store.dispatch(actions.setTokenFromCookies(jwtFromCookie));
export default store;
