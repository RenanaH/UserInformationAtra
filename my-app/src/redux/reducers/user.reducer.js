// import { SET_USER, GET_USER, SAVE_USER_IN_SERVER, SET_USER_BY_FILED } from '../actions/user.action';
import produce from 'immer';
import { actions } from '../actions/user.action';
import createReducer from './reducerUtils';



const initialState = {
    // name: 'tamar',
    // id: 4343
    user: {}
}

const users = {
    setUser(state, action) {
        state.user = action.payload;
    },
    getUserFromServer(state, action) {
        state.user = action.payload;
    },
    saveUserInServer(state, action) {
        state.user = action.payload;
    },
    setUserByFiled(state, action) {

        if (action.payload in state.user.socialmedias)
            state.user.socialmedias[action.payload] = action.value;// 
        else
            state.user[action.payload] = action.value
        // switch (action.payload) {
        //     case "fullName":
        //         state.user.fullName= action.value 
        //     case "companyName":
        //         state.user[action.payload]= action.value 
        //     default: return ""
        // }
    },
    setContacts(state,action){
        state.user.contacts=state.user.contacts.concat(action.payload);
    }

};

export default produce((state, action) => createReducer(state, action, users), initialState);

// export default function userReducer(state = initialState, action) {
//     debugger;
//     switch (action.type) {
//         case SET_USER:
//             return { ...state, user: action.payload }
//         case GET_USER:
//             return { ...state, user: action.payload }
//         case SAVE_USER_IN_SERVER:
//             return { ...state, user: action.payload }
//         case SET_USER_BY_FILED:
//             switch (action.payload) {
//                 case "fullName":
//                     return { ...state.user, fullName: action.value }
//                 case "companyName":
//                     return { ...state.user, companyName: action.value }
//                 default: return ""
//             }


//         default:
//             return state
//     }
// }