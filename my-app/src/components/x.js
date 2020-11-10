import React from 'react';

import { connect } from 'react-redux';
import setName from '../redux/actions/user.action';



function X(props) {
    return (
        <>
            <button onClick={() => { props.setNameTemp("rrrrrrrrrr") }}>click</button>
            <h1>{props.userNameTemp && props.userNameTemp}</h1>
        </>
    )
}
export default connect(
    (state) => {
        return {
            userNameTemp: state.user.name
        }
    },
    (dispatch) => {
        return {
            setNameTemp: function (newName) {
                dispatch(setName(newName));
            }
        }
    }


)(X)
