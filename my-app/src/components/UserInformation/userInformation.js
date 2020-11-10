import React, { useEffect, useState } from 'react'
// import Row from 'react-bootstrap'
import './userInformation.css'
import down from '../../assets/down.svg'
import whatsapp from '../../assets/whatsapp.svg'
import messenger from '../../assets/messenger.svg'
import youtube from '../../assets/youtube.svg'
import logo1 from '../../assets/logo1.png'

import facebookimg from '../../assets/facebookimg.png'
import calender from '../../assets/calendar.svg'

import { useForm } from "react-hook-form";
import userService from '../../Services/userService'
import $ from 'jquery';
import DatePicker from "react-datepicker";
import Calendar from 'react-calendar';
import { MDBContainer } from "mdbreact";
import { connect } from 'react-redux';


export default function UserInformation({ cb, user1, changePosition, changeImg }) {

    const [countries, setCountries] = useState([]);

    const URL = 'https://restcountries.eu/rest/v2/all';//to countries
    const fillCountries = (() => {
        fetch(URL)
            .then(response => {
                if (response.ok) {
                    return response;
                }
                throw Error(response.status)
            })
            .then(response => response.json())
            .then(data => {
                // debugger;
                setCountries(data)
                console.log(countries)
            })
            .catch(error => console.log(error))

    })



    const scrollContainerStyle = { width: "800px", maxHeight: "400px" };

    // let degel=degel=='undefined'?true:false;
    // let degel=true;
    const [degel, setDegel] = useState(true);

    const [startDate, setStartDate] = useState(new Date());
    // const logo=user1.imgLogo;
    const [picture, setPicture] = useState([]);

    const userName = "blabla101";


    // const useEffect = async () => {
    //     const user1 = await userService.getUserByUserName(userName);
    // console.log("us111111", user1);
    // }

    // const user = {
    //     "userName": userName,//לשנותתתתתתתתתתת
    //     "fullName": '',
    //     "position": '',
    //     "cellphone": 0,
    //     "birthday": 0,
    //     "companyName": '',
    //     "vat": 0,
    //     "logo": '',
    //     "address": '',
    //     "state": '',
    //     "zipCode": 0,
    //     "imgProfile": ''
    // };

    let fullNameInput = React.createRef();
    let positionInput = React.createRef();
    let cellphoneInput = React.createRef();
    let birthdayInput = React.createRef();
    let companyNameInput = React.createRef();
    let vatInput = React.createRef();
    let logoInput = React.createRef();
    let addressInput = React.createRef();
    let stateInput = React.createRef();
    let zipCodeInput = React.createRef();
    let imgProfileInput = React.createRef();

    const [user, setUser] = useState({ fullName: "" });
    const [medias, setMedias] = useState([]);

    //debugger;



    const changeSocialMedia = (event) => {
        //placeholder={user1==""?"facebook":JSON.stringify(user1.socialmedias[0].facebook)}

        // debugger;
        // setUser({
        //     ...user,
        //     ["socialmedias"]:{[event.target.name]: event.target.value}
        // })
        setMedias({
            ...medias,
            [event.target.name]: event.target.value
        })
        console.log(medias);
        event.target.placeholder = event.target.value;
    }




    const handle = (event) => {

        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
        // debugger;
        if (event.target.name == "fullName") {
            cb(event.target.value);
        }
        if (event.target.name == "position") {
            changePosition(event.target.value);
        }



        console.log('sd', event.target.placeholder)
        event.target.placeholder = event.target.value;
        console.log("event.target.placeholder", event.target.placeholder)
        console.log('ss', event.target.value);
        //   document.getElementsByName('fullName')[0].placeholder = "";
        console.log("eeeeeeeevent.target.placeholder", event.target.placeholder)
    }

    useEffect(() => {
        //    debugger
        if (degel && user1) {
            //שאלתי גם על יוזר1 כי יוז אפקט קורה פעמיים ובפעם הראשונה אין יוזר1
            // debugger;
            setUser(user1);
            setMedias(user1.socialmedias);
            if (user1.imgLogo == "")
                setPicture(logo1)
            else
                setPicture(user1.imgLogo)
            document.getElementsByName('fullName')[0].placeholder = user1.fullName;

            setDegel(false);
            console.log("media", medias)
            fillCountries();

        }

    });

    const saveInformation = () => {
        console.log("user", user);
        changeImg(user1);
        setUser({
            ...user,
            ["socialmedias"]: medias
        })
        user1.socialmedias = medias
        debugger;
        user1 = user;
        // user1.fullName = fullNameInput.current.value != "" ? fullNameInput.current.value : user1.fullName
        // user1.position = positionInput.current.value != "" ? positionInput.current.value : user1.position

        // user1.phone = cellphoneInput.current.value != "" ? cellphoneInput.current.value : user1.phone
        // user1.birthday = birthdayInput.current.value != "" ? birthdayInput.current.value : user1.birthday
        // // debugger;
        // user1.companyName = companyNameInput.current.value != "" ? companyNameInput.current.value : user1.companyName
        // user1.vat = vatInput.current.value != "" ? vatInput.current.value : user1.vat
        // // debugger;

        // // user1.imgLogo = logoInput.current.value != "" ? logoInput.current.value : user1.imgLogo
        // user1.address = addressInput.current.value != "" ? addressInput.current.value : user1.address
        // user1.state = stateInput.current.value != "" ? stateInput.current.value : user1.state
        // user1.zipcode = zipCodeInput.current.value != "" ? zipCodeInput.current.value : user1.zipCode

        // debugger;
        console.log(user1 + "eeeee");
        // userService.saveUser(user);


        userService.saveUser(user1);

        console.log(user1 + "uuuuuu")
        // const requestOptions={method:'POST',
        // //  body: JSON.stringify(user)
        // body:JSON.stringify(user)};
        // return fetch(`http://localhost:3000/saveUserInformation`, requestOptions)
        // .then(res => res.json())
        // .then((result) => { console.log(result) });


        // userService.changSuspend(user.uid).then(() => {

        //     userService.getAllUsers()
        //         .then((items) => {
        //             console.log(items);
        //             cb(items);
        //         }
        //         );
        // });
        alert("your profile is updated")
    }
    //on chang name input
    const changeName = (event) => {
        //console.log(event.target.value)
        cb(event.target.value);
        //  alert('hello')
        // setName(event.target.value);

    }
    const changeImage = (user) => {
        //console.log(event.target.value)
        changeImg(user);
        //  alert('hello')
        // setName(event.target.value);

    }

    const changePosition1 = (event) => {
        //console.log(event.target.value)
        changePosition(event.target.value);
        //  alert('hello')
        // setName(event.target.value);

    }

    const removeInput = (event) => {
        console.log(event.target.value)
        event.target.placeholder = ""
    }

    const imageFunction = () => [

    ]

    const onChangeHandlerLogo = (event) => {
        // debugger
        /////
        debugger;

        const reader1 = new FileReader();
        const file = event;
        reader1.onloadend = () => {
            setPicture(reader1.result);
        };
        reader1.readAsDataURL(file);/////
        ////////


        console.log("event", event)
        var a = global.URL.createObjectURL(event)
        console.log(a);
        var fileToUpload = event
        const myFile = new FormData();
        // let reader = new FileReader();

        myFile.append("file", fileToUpload);

        addNewImage(myFile);

        // fetch('https://lobby.leader.codes/api/uploadImage/'+user1.uid, {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(myFile) ,
        //     data:myFile
        // }).then((response) => {
        //  //  debugger;
        //     return response.json();
        // }).then((message) => {
        //     console.log(message);
        // })



        // addNewImage(myFile);

        //// return new Promise((res, req) => {
        // $.ajax({
        //     type: "POST",
        //     url: "https://files.leader.codes/api/" + user1.uid + "/upload",
        //     headers: {
        //         Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJzaW1kc01ycmNKZHBRZ3RhOGtnWHlRQmRERnkyIiwiZW1haWwiOiJjdG9AbGVhZGVyLmNvZGVzIiwiaXAiOiI1LjEwMi4yNDIuMTc5IiwiaWF0IjoxNjAzNjk1Njc1fQ.OQ0HJfdF96AOuGghYFm_CTS7lF23FuBe-HaHSZXg9Rc"

        //     },
        //     data: myFile,
        //     processData: false,
        //     contentType: false,
        //     success: async function (data) {
        //         console.log(data.data.url)
        //         //   var url1 = URL.createObjectURL(event)

        //         let url = data.data.url;
        //         user1.imgLogo = url;
        //         setUser(user1);
        //         //  await sleep(500);
        //         //  debugger

        //         console.log("upload success")
        //         // alert("upload success");
        //     },
        //     error: function (err) {
        //         console.log(err)
        //         alert(err);
        //     },
        //     // }).then((res) => {
        //     // debugger;
        //     // console.log(res)
        //     // console.log('klhk', res.data.url);



        //     // })


        //     // })
        // }
        // )
    }

    const addNewImage = (fd) => {
        // debugger;
        $.ajax({
            "url": 'https://lobby.leader.codes/api/uploadImage/' + user1.uid,
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
                user1.imgLogo = data1;
                setUser(user1);
            },
            error: function (err) {
                console.log(err)
            }
        });

    }


    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    return (
        <>

            {/* <form onSubmit={handleSubmit(onSubmit)}> */}
            <div className="container-fluid div1 scrollbar">
               
                <div className="row">
                    <div className="col-10 mt-4 div_font">Company Information</div>
                    <div className="col-2 mt-4">
                        <button className="btn_save btn btn-outline-dark" type="submit" onClick={saveInformation}>Save</button>
                    </div>
                    {/* <div className="col-2 btn_save"><button>save</button></div> */}
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="container">
                            <div className="row">
                                <div className="col font_1">User Name</div>
                            </div>
                            <div className="row">
                                <div class="col">
                                    <div className="color_name form-control i_topic">{user1.username}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 p-0">
                        <div className="container">
                            <div className="row">
                                <div className="col font_1">Inquiry Topic</div>
                            </div>
                            <div className="row">
                                <div class=" col mb-3">
                                    <input
                                        //  placeholder={user.fullName}
                                        // onFocus={(e) => e.target.placeholder = user.fullName}
                                        // value={user.fullName}
                                        id="fullName"
                                        name="fullName"
                                        onChange={(e) => handle(e)}
                                        type="text" class="form-control i_topic i_color_grey" aria-label="Recipient's username" aria-describedby="basic-addon2" />                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="container">
                            <div className="row">
                                <div className="col font_1">Position / department</div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <input
                                        name="position"
                                        onChange={(e) => handle(e)}
                                        // onClick={removeInput}
                                        //  ref={positionInput}
                                        type="text" class="form-control form-control i_topic i_color_grey ml-1" placeholder={user1.position == "" ? "position" : user1.position} aria-label="Recipient's username" aria-describedby="basic-addon2" />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="container">
                            <div className="row">
                                <div className="col font_2">
                                    Cellphone Number
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div class="input-group mb-3">
                                        <input className="placeholdersize"
                                            name="phone"
                                            onChange={(e) => handle(e)}
                                            type="number" class="form-control i_topic i_color_grey"
                                            placeholder={user1.phone == "" ? "phone" : user1.phone}
                                            aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="container">
                            <div className="row">
                                <div className="col font_2">
                                    Birthday
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div class="input-group mb-3 pr-3">
                                        <input
                                            name="birthday"
                                            onChange={(e) => handle(e)}
                                            type="text" onFocus={(e) => { e.target.type = 'date'; console.log(e.target.value) }}
                                            onBlur={(e) => { e.target.type = 'text' }}
                                            class="form-control i_topic i_color_grey calendar" placeholder={user1.birthday == "" ? "birthday" : user1.birthday} aria-label="Recipient's username" aria-describedby="basic-addon2" />

                                        {/* <img src={calender}></img> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="container">
                            <div className="row">
                                <div className="col font_2">
                                    Work hours
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div class="input-group mb-3 pr-3">
                                        <input
                                            name="workHours"
                                            onChange={(e) => handle(e)}
                                            type="number" class="form-control form-control i_topic i_color_grey ml-1" placeholder={user1.workHours == 0 ? "work hours" : user1.workHours} aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                        {/* <img src={calender}></img> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="container">
                            <div className="row">
                                <div className="col font_2">
                                    Company Logo
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label for="logouug" className="lbl_img">
                                        {/* <img className="logoC" src={this.props.quote.logo ? this.props.quote.logo :tempLogo } /> */}
                                        <img className="img_logo" referrerpolicy="no-referrer" src={picture} />
                                    </label>
                                    <input
                                        // ref={logoInput}
                                        type={"file"}
                                        id="logouug"
                                        htmlFor="myInput"
                                        accept="image/*"

                                        style={{
                                            display: 'none',
                                            cursor: 'pointer',
                                            //   width:'5px',
                                        }}
                                        onChange={(e) => onChangeHandlerLogo(e.target.files[0])}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="container">
                            <div className="row">
                                <div className="col font_2">
                                    Company Name
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <input
                                        name="companyName"
                                        onChange={(e) => handle(e)}
                                        type="text" class="form-control i_topic i_color_grey" placeholder={user1.companyName == "" ? "company name" : user1.companyName} aria-describedby="basic-addon2" />

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="container">
                            <div className="row">
                                <div className="col font_2">
                                    Vat
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <input
                                        name="vat"
                                        onChange={(e) => handle(e)}
                                        type="number" class="form-control i_topic i_color_grey" placeholder={user1.vat == "" ? "vat" : user1.vat} aria-describedby="basic-addon2" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="row">
                    <div className="col-md-4 font_2">Company Address</div>
                </div>

                <div className="row mt-1">
                    <div className="col-md-3">
                        <div class="input-group mb-3">
                            <input
                                name="address"
                                onChange={(e) => handle(e)}
                                type="text" class="form-control i_topic i_color_grey" placeholder={user1.address == "" ? "address" : user1.address} aria-label="Recipient's username" aria-describedby="basic-addon2" />
                        </div>
                    </div>
                    <div className="col-md-3" >
                        <div class="input-group mb-3">
                            <input
                                name="state"
                                onChange={(e) => handle(e)}
                                type="text" class="form-control i_topic i_color_grey" placeholder={user1.state == "" ? "state" : user1.state} aria-label="Recipient's username" aria-describedby="basic-addon2" />
                        </div>
                    </div>
                    <div className="col-md-3" >
                        <div class="input-group mb-3" >
                            <input
                                name="zipcode"
                                onChange={(e) => handle(e)}
                                type="number" class="form-control i_topic i_color_grey" placeholder={user1.zipcode == "" ? "zip code" : user1.zipcode} aria-label="Recipient's username" aria-describedby="basic-addon2" />
                        </div>
                    </div>
                    <div className="col-md-3" >
                        <div class="input-group mb-3 i_color_grey" >
                            <select className="form-control i_color_grey i_topic" name="country" onChange={(e) => handle(e)}>
                                <option default>
                                    {user1.country == "" ? "country" : user1.country}
                                </option>
                                {countries.map(item => (
                                    <option
                                        key={item.value}
                                        value={item.name}
                                    >
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>


                </div>
                <div className="row mt-1">
                    <div className="col-md-4 font_2">Social Medias</div>
                </div>
                {/* <div className="div1 scrollbar" > */}
                <div className="row mt-1">

                    <div className="col-1">
                        <div class="input-group mb-3 form-control i_topic i_color_grey">
                            <img src={facebookimg} className="img_social"></img>
                        </div>
                    </div>
                    <div className="col-11">
                        <div class="input-group mb-3 i_color_grey i_topic" >
                            <input className="input_url i_topic i_color_grey form-control"
                                // placeholder={user1.zipcode == "" ? "zip code" : user1.zipcode}
                                placeholder={medias.facebook == "" ? "facebook" : JSON.stringify(medias.facebook)}
                                // placeholder={{JSON.stringify(edias).fullName}
                                name="facebook"
                                onChange={(e) => changeSocialMedia(e)}
                            />
                        </div>
                    </div>

                </div>
                <div className="row mt-1">
                    <div className="col-1" >
                        <div class="input-group mb-3 form-control i_topic i_color_grey">
                            <img src={whatsapp} className="img_social"></img>
                        </div>
                    </div>
                    <div className="col-11">
                        <div class="input-group mb-3 i_color_grey i_topic form-control" >
                            <input className="input_url i_topic i_color_grey"
                                placeholder={medias.whatsapp == "" ? "whatsapp" : JSON.stringify(medias.whatsapp)}
                                name="whatsapp"
                                onChange={(e) => changeSocialMedia(e)}
                            />
                        </div>
                    </div>

                </div>
                <div className="row mt-1">
                    <div className="col-1" >
                        <div class="input-group mb-3 form-control i_topic i_color_grey">
                            <img src={messenger} className="img_social"></img>
                        </div>
                    </div>
                    <div className="col-11">
                        <div class="input-group mb-3 i_color_grey i_topic" >
                            <input className="input_url i_topic i_color_grey form-control"
                                name="messenger"
                                placeholder={medias.messenger == "" ? "messenger" : JSON.stringify(medias.messenger)}
                                onChange={(e) => changeSocialMedia(e)}
                            />
                        </div>
                    </div>

                </div>
                <div className="row mt-1">
                    <div className="col-1" >
                        <div class="input-group mb-3 form-control i_topic i_color_grey">
                            <img src={youtube} className="img_social"></img>
                        </div>
                    </div>
                    <div className="col-11">
                        <div class="input-group mb-3 i_color_grey i_topic" >
                            <input className="input_url i_topic i_color_grey form-control"
                                name="youtube"
                                placeholder={medias.youtube == "" ? "Youtube" : JSON.stringify(medias.youtube)}
                                onChange={(e) => changeSocialMedia(e)}
                            />
                        </div>
                    </div>

                </div>
                {/* </div> */}



                {/* <div className="row mt-1">
                        <div className="div_medias col p-1">social medias</div>
                        <MDBContainer>
                            <div className="div1 row scrollbar" >
                                <div className="row mt-3">
                                    <div className="col-1">
                                        <img src={facebookimg} className="img_social i_topic"></img>
                                    </div>
                                    <div className="col-11">
                                        <div className="row">
                                            <input className="input_url i_topic i_color_grey"
                                                placeholder={medias.facebook == "" ? "facebook" : JSON.stringify(medias.facebook)}
                                                name="facebook"
                                                onChange={(e) => changeSocialMedia(e)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                

                                
                                <div className="row mt-3">
                                    <div className="col-1 i_color_grey">
                                        <img src={whatsapp} className="img_social"></img>
                                    </div>
                                    <div className="col-11">
                                        <div className="row">
                                            <input className="input_url i_topic i_color_grey"
                                                placeholder={medias.whatsapp == "" ? "whatsapp" : JSON.stringify(medias.whatsapp)}
                                                name="whatsapp"
                                                onChange={(e) => changeSocialMedia(e)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-1">
                                        <img src={messenger} className="img_social"></img>
                                    </div>
                                    <div className="col-11">
                                        <div className="row">
                                            <input className="input_url i_topic i_color_grey"
                                                name="messenger"
                                                placeholder={medias.messenger == "" ? "messenger" : JSON.stringify(medias.messenger)}
                                                onChange={(e) => changeSocialMedia(e)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-1">
                                        <img src={youtube} className="img_social"></img>
                                    </div>
                                    <div className="col-11">
                                        <div className="row"><input className="input_url i_topic i_color_grey"
                                            name="youtube"
                                            placeholder={medias.youtube == "" ? "Youtube" : JSON.stringify(medias.youtube)}
                                            onChange={(e) => changeSocialMedia(e)}
                                        /></div>
                                    </div>
                                </div>
                            </div>
                        </MDBContainer>
                    </div> */}

                {/* <div className="row mt-3">social media</div> */}
                {/* <div className="container">
                 <div className="row">
                 <div className="col-1">
                     <div className="div_social">
                         <img src={facebookimg } className="img_social"></img>
                     </div>
                 </div>
                 <div className="col-11">
                    
                     <span>Facebook</span>
                     <input className="i_bottom"></input>
                 </div>
                 </div>
             </div> */}

            </div>
            {/* </form> */}

        </>
    )

}
// export default connect(
//     (state) => {
//         return{
//             nameTemp:state.user.name
//         }
//     },
//     null




// )(UserInformation)