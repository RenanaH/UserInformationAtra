import {combineReducers} from 'redux';
import userReducer from './user.reducer';
import errorReducer from './errors.reducer'

export default combineReducers({
    user:userReducer,
    errors:errorReducer
})