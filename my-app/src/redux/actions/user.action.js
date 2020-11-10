export const SET_USER ='[user] SET_NAME'


export default function setName(newName){
    return{
        type:SET_USER,
        payload:newName
    }
}

