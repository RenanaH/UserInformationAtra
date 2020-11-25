import React, { useEffect, useState } from 'react'
import down from '../../assets/down.svg'
import './status.css'
import $ from 'jquery';
import { connect } from 'react-redux';
import { actions } from '../../redux/actions/user.action';

function Status(props) {

   
    const onChangeHandlerProfile = (event) => {
          const reader1 = new FileReader();
        const file = event;
        reader1.onloadend = () => {
            props.setFiled('imgProfile',reader1.result);
        };
        reader1.readAsDataURL(file);
        console.log("event", event)
        var fileToUpload = event
        var myFile = new FormData();
        myFile.append("file", fileToUpload);
        addNewImage(myFile);
    }
    const addNewImage = (fd) => {
        $.ajax({
            "url": 'https://lobby.leader.codes/api/uploadImage/' + props.user.uid,
            "method": "POST",
            "processData": false,
            "mimeType": "multipart/form-data",
            "contentType": false,
            "headers": {
                "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJzaW1kc01ycmNKZHBRZ3RhOGtnWHlRQmRERnkyIiwiZW1haWwiOiJjdG9AbGVhZGVyLmNvZGVzIiwiaXAiOiI1LjEwMi4yNDYuMjAyIiwiaWF0IjoxNjA0NDgyOTc0fQ.Nn2IC7j_VCDOFIkbwzT3nao0l7OcqbNqDUKkcL0Aoik"

            },
            "data": fd,
            "async": false,
            success: function (data1) {
                console.log("success")
                console.log(data1);
               props.setFiled('imgProfile',data1)
            },
            error: function (err) {
                console.log(err)
            }
        });

    }

    return (

        <div className="div_person container">
            <div className="row">
                <div className="col-12 pt-3">
                    <label for="img11">
                        <img className="img_person" referrerpolicy="no-referrer" src={props.user.imgProfile} /></label>
                    <input
                        type={"file"}
                        id="img11"
                        htmlFor="myInput"
                        accept="image/*"

                        style={{
                            display: 'none',
                            cursor: 'pointer',
                        }}
                        onChange={(e) => onChangeHandlerProfile(e.target.files[0])}
                    />
                </div>
            </div>


            <div className="row">
                <div className="col-12">
                    <div></div>
                    <div  class="form-control i_name_men" id="exampleInputEmail1" aria-describedby="emailHelp" >{props.user&&props.user.username}</div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    {/* <input className="i_position_men" placeholder="your position" /> */}
                    <div  type="text" class="form-control i_position_men" id="exampleInputEmail1" aria-describedby="emailHelp"  >{props.user&&props.user.position}</div>
                </div>
            </div>
            <div className="row">
               <div className="col-12">
                    <div className="div_email">{props.user&&props.user.email}</div>
            </div>

            </div>

        </div>
    )
}
export default connect(
    (state)=>{
        return{user:state.user.user}
    },
    (dispatch)=>{
        return{
            setFiled:function(filed,value){
                dispatch(actions.setUserByFiled(filed,value))
            }
        
        }
    }
)(Status)


