import React, { useEffect,useState } from 'react';

import { connect } from 'react-redux';
import {actions, getUserFromServer }from '../redux/actions/user.action';



function X(props) {

    const [degel, setDegel] = useState(true);

//   useEffect(() => {
//  if (degel) {
//      console.log(user1);
//      //שאלתי גם על יוזר1 כי יוז אפקט קורה פעמיים ובפעם הראשונה אין יוזר1
//      // debugger;
//      setUser(user1);
//      setMedias(user1.socialmedias);
//      if (user1.imgLogo == "")
//          setPicture(logo1)
//      else
//          setPicture(user1.imgLogo)
//      //document.getElementsByName('fullName')[0].placeholder = user1.fullName;

//      setDegel(false);
//      console.log("media", medias)
//      fillCountries();
//      fillCities("");
     

//  }

// });

    useEffect(() => {
        if (degel) {
            setDegel(false);
            props.getUserFromServer1("blabla101")
        debugger
        console.log(props.user); 
        }
        
        
    })
    return (
        <>
            {/* <button onClick={() => { props.setTemp("rrrrrrrrrr") }}>click</button> */}
            <h1>{props.user&&props.user.email}</h1>
            <h1>{props.user&&props.user.companyName}</h1>

            {/* <h1>{props.userTemp && props.userTemp.email}</h1> */}

        </>
    )
}
export default connect(
    (state) => {
        return {
            user: state.user.user
        }
    },
    (dispatch) => {
        return {
            getUserFromServer1: function (newName) {
                dispatch(actions.getUserFromServer(newName));
            }
        }
    }


)(X)
