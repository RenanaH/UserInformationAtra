import { actions } from "../actions/user.action";
import axios from 'axios'

export const getUser = ({ dispatch, getState }) => next => action => {
    const url = "https://lobby.leader.codes/api";

    if (action.type === 'GET_USER_FROM_SERVER') {
        fetch(`https://lobby.leader.codes/api/getUserByUserName/${action.payload}`,
            {
                method: 'GET'
                // ,body:JSON.stringify(userName)
            })
            .then((res) => {
                console.log("res11111", res)
                return res.json();
            })
            .then((result) => {
                console.log("res", result)
                // dispatch({type: '[user] SET_USER', payload:result})
                dispatch(actions.setUser(result))
            })

    }
    if (action.type === 'SAVE_USER_IN_SERVER') {

        fetch(url + '/patch_update_user/' + action.payload.username, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(action.payload)
        }).then((response) => {
            //  debugger;
            return response.json();
        })
            .then((message) => {
                console.log("message", message);
                if (message.error){
                     console.log(message.error.errors)
               dispatch(actions.addError(message.error.errors))
                }
                else
                alert("your profile is updated")
                  
            })

    }
    if (action.type === '                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               ') {

        axios.post(url + '/contactFacebook/add', action.payload)
            .then(res => console.log(res.data))
            //   .then(setDone(true))
            .catch((err) => console.log(err))

    }

    return next(action);
}