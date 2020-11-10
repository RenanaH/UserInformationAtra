import { SET_USER } from '../actions/user.action';



const initialState = {
    // name: 'tamar',
    // id: 4343
    user:{}
}


export default function userReducer(state = initialState, action) {

    switch (action.type) {
        case SET_USER:
            return { ...state, name: action.payload }
        case 'SET_ID':
            return { ...state, id: action.payload }
        default:
            return state
    }


}