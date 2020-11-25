import produce from 'immer';
import { actions } from '../actions/user.action';
import createReducer from './reducerUtils';



const initialState = {
    errors: []
}

const errors = {
    addError(state, action) {
        // state.errors= state.errors.concat([action.payload]);
        state.errors=action.payload;
        console.log("state.errors",state.errors)

    },
    removeError(state, action) {
        console.log("state.errors",state.errors)
        // state.errors=  state.errors.filter((err,i) => i !== action.value);
        state.errors[action.payload]= ""
        // state.errors.splice(action.payload,1)
    },

};

export default produce((state, action) => createReducer(state, action, errors), initialState);

