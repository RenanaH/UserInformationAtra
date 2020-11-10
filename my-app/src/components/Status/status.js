import React, { useEffect, useState } from 'react'
import down from '../../assets/down.svg'
import './status.css'
import $ from 'jquery';
import logo1 from '../../assets/logo1.png'

export default function Status({ name, position, user, changeImg, changeUser }) {
    const [img, setImg] = useState([]);

    // useEffect=(()=>{
    //     setImg(user.imgProfile);
    // });
    useEffect(() => {
        // Update the document title using the browser API
        if (user.imgProfile == "")
            setImg(logo1);
        else
            setImg(user.imgProfile);
    });



    let profileInput = React.createRef();

    const onChangeHandlerProfile = (event) => {
        debugger;

        const reader1 = new FileReader();
        const file = event;
        reader1.onloadend = () => {
            setImg(reader1.result);
            user.imgProfile = reader1.result
            // user.imgProfile=img;
        };
        reader1.readAsDataURL(file);/////

        console.log("event", event)
        var fileToUpload = event
        var myFile = new FormData();
        myFile.append("file", fileToUpload);
        addNewImage(myFile);
        console.log(img);
        // $.ajax({
        //     type: "POST",
        //     url: "https://files.leader.codes/api/" + user.uid + "/upload",
        //     headers: {
        //         // Authentication: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJzaW1kc01ycmNKZHBRZ3RhOGtnWHlRQmRERnkyIiwiZW1haWwiOiJjdG9AbGVhZGVyLmNvZGVzIiwiaXAiOiI1LjEwMi4yNDIuMTc5IiwiaWF0IjoxNjAzNjk1Njc1fQ.OQ0HJfdF96AOuGghYFm_CTS7lF23FuBe-HaHSZXg9Rc"
        //         Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJzaW1kc01ycmNKZHBRZ3RhOGtnWHlRQmRERnkyIiwiZW1haWwiOiJjdG9AbGVhZGVyLmNvZGVzIiwiaXAiOiI1LjEwMi4yNDIuMTc5IiwiaWF0IjoxNjAzNjk1Njc1fQ.OQ0HJfdF96AOuGghYFm_CTS7lF23FuBe-HaHSZXg9Rc"

        //     },
        //     data: myFile,
        //     processData: false,
        //     contentType: false,
        //     success: async function (data) {
        //         console.log(data.data.url)
        //         //   var url1 = URL.createObjectURL(event)

        //         let url = data.data.url;
        //         user.imgProfile = url;
        //         //await sleep(500);
        //         // debugger
        //         changeImg(user);
        //         console.log("upload success")
        //         // alert("upload success");
        //     },
        //     error: function (err) {
        //         console.log(err)
        //         alert(err);
        //     },

        // })

    }

    // const addNewImage=(fd)=> {
    //      // debugger;
    //      $.ajax({
    //        "url": 'https://lobby.leader.codes/api/uploadImage/' + user.uid,
    //        "method": "POST",
    //        "processData": false,
    //        "mimeType": "multipart/form-data",
    //        "contentType": false,
    //        "headers":{
    //       "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJzaW1kc01ycmNKZHBRZ3RhOGtnWHlRQmRERnkyIiwiZW1haWwiOiJjdG9AbGVhZGVyLmNvZGVzIiwiaXAiOiI1LjEwMi4yNDYuMjAyIiwiaWF0IjoxNjA0NDgyOTc0fQ.Nn2IC7j_VCDOFIkbwzT3nao0l7OcqbNqDUKkcL0Aoik"

    //        },
    //        "data": fd,
    //        "async": false,
    //        success: function (data1) {

    //          console.log("success")
    //          console.log(data1);
    //        //  user.imgProfile = data1;
    //         //  setUser(user1);
    //       //  user.imgProfile=data1;
    //         //  cb(user);
    //         //  setImg(data1);
    //        },
    //        error: function(err){
    //            console.log(err)
    //        }
    //      });

    //    }
    const addNewImage = (fd) => {
        // debugger;
        $.ajax({
            "url": 'https://lobby.leader.codes/api/uploadImage/' + user.uid,
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
                // user.imgProfile = data1;
                // changeUser(user);
                //  setUser(user);
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
                        <img className="img_person" referrerpolicy="no-referrer" src={img} /></label>
                    <input
                        ref={profileInput}
                        type={"file"}
                        id="img11"
                        htmlFor="myInput"
                        accept="image/*"

                        style={{
                            display: 'none',
                            cursor: 'pointer',
                            //   width:'5px',
                        }}
                        onChange={(e) => onChangeHandlerProfile(e.target.files[0])}
                    />
                </div>
            </div>


            <div className="row">
                <div className="col-12">
                    <input value={name} type="text" class="form-control i_name_men" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder={user.fullName} />
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    {/* <input className="i_position_men" placeholder="your position" /> */}
                    <input value={position} type="text" class="form-control i_position_men" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder={user.position} />

                </div>
            </div>
            {/* <div>
                <input className="i_email" placeholder="your email" />

                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-square i_topic" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                </svg>
            </div> */}
            <div className="row">
               <div className="col-12">
                    <div className="div_email">{user.email}</div>
                    {/* <div class="input-group">
                         <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={user.email} />
                        <div class="input-group-append icon1">
                            <span class="input-group-text" id="basic-addon2">
                                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-square i_icon" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                </svg>
                            </span>
                        </div> 
                    </div> */}
             
            </div>

            </div>

        </div>
    )
}