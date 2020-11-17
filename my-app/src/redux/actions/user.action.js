// export const GET_USER = '[user] GET_USER'
// export const SET_USER = '[user] SET_USER'
// export const SAVE_USER_IN_SERVER = '[user] SAVE_USER_IN_SERVER'
// export const SET_USER_BY_FILED = '[user] SET_USER_BY_FILED'

// export function setUser(newUser) {
//     debugger;
//     return {
//         type: SET_USER,
//         payload: newUser
//     }
// }
// export function setUserByFiled(filed, value) {
//     return {
//         type: SET_USER_BY_FILED,
//         payload: filed,
//         value: value
//     }
// }



// export function getUserFromServer(userName) {
//     debugger;
//     return {
//         type: GET_USER,
//         payload: userName
//     }
// }
// export function saveUserInserver(user) {

//     return {
//         type: SAVE_USER_IN_SERVER,
//         payload: user
//     }
// }

function convertActionToType(actionName){
    return actionName.replace(/([A-Z])/g, "_$1").toUpperCase();
}
export const actions=new Proxy(
    {},
    {            

        get:function(target,prop){
        
            if(target[prop]===undefined)
            return function(args,args2){
                debugger;

                return{
                    type:convertActionToType(prop),
                    payload:args,
                    value:args2//עבור שינו אינפוט
                };
            };
            else return target[prop];
        }
    }
);

