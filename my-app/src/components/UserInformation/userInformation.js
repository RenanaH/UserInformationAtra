import React, { useEffect, useState } from 'react'
// import Row from 'react-bootstrap'
import './userInformation.css'
import whatsapp from '../../assets/whatsapp.svg'
import messenger from '../../assets/messenger.svg'
import youtube from '../../assets/youtube.svg'
import logo1 from '../../assets/logo1.png'

import facebookimg from '../../assets/facebookimg.png'

import $ from 'jquery';

import { connect } from 'react-redux';
import { actions } from '../../redux/actions/user.action'

import  globe  from '../../assets/globe.png'
function UserInformation(props) {

    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);

    const [apiKeyType, setApiKeyType] = useState("password");

    const [inputPhone, setInputPhone] = useState();
    const [errorPhone, setErrorPhone] = useState(" ");



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
                setCountries(data)

            })
            .catch(error => console.log(error))

    })

    const fillCities = ((countryName) => {

        // debugger;
        // const url = `http://api.geonames.org/searchJSON?username=ksuhiyp&country=${cityName}&maxRows=1000&style=SHORT`
        // fetch(url)
        //     .then(response => {
        //         if (response.ok) {
        //             return response;
        //         }
        //         throw Error(response.status)
        //     })
        //     .then(response => response.json())
        //     .then(data => {
        //         debugger;
        //         setCities(data.geonames)
        //         console.log("cities", cities)
        //     })
        //     .catch(error => console.log(error))
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("https://lobby.leader.codes/api/getCitiesByCountries/" + countryName, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                setCities(result.geonames.map(e => e.name))
                console.log(cities)
            })
            .catch(error => console.log('error', error));

    })

    const changeTypeInputApiKey = (e) => {
        if (apiKeyType == "text")
            setApiKeyType("password")
        else
            setApiKeyType("text")
    }


    const handle = (event) => {

        props.setUserByFiled1(event.target.name, event.target.value);

        if (event.target.name == "country") {
            countries.forEach(e => {
                if (e.name == event.target.value) { fillCities(e.alpha2Code); }
            })
        }
        if (event.target.name == "phone"||event.target.name=="companyEmail") {
            if (props.errors[event.target.name] != undefined) {
                props.removeErr(event.target.name)
            }

        }


        event.target.placeholder = event.target.value;
        console.log("eeeeeeeevent.target.placeholder", event.target.placeholder)
    }

    useEffect(() => {

        // if (degel) {
        //    // props.getUserFromServer1(userName)
        //     console.log(props.user)
        //     setDegel(false);
        // }
        // if (props.user) {
        //     console.log(props.user.socialmedias)
        // fillCountries();
        // // fillCities("il");
        //     setMedias(props.user.socialmedias)
        //     setUser(
        //       props.user
        //     )
        //     //setUser(props.user);
        //     // console.log("medias", medias)
        //     // console.log("ussssssss", user)
        fillCountries();

    }

        // if (degel && user1) {
        //     console.log(user1);
        //     //שאלתי גם על יוזר1 כי יוז אפקט קורה פעמיים ובפעם הראשונה אין יוזר1
        //     // debugger;

        //     setUser(user1);
        //     setMedias(user1.socialmedias);
        //     if (user1.imgLogo == "")
        //         setPicture(logo1)
        //     else
        //         setPicture(user1.imgLogo)
        //     //document.getElementsByName('fullName')[0].placeholder = user1.fullName;

        //     setDegel(false);
        //     console.log("media", medias)
        //     fillCountries();
        //     fillCities("");


        // }

        //}
        , [props]);

    const saveInformation = () => {
        let isValid = true;
        //validate front
        // if (inputPhone !== undefined) {
        //    var pattern = new RegExp(/^[0-9\b]+$/);
        //     // var pattern = /^[\s()+-]*([0-9][\s()+-]*){6,20}$/
        //     if (!pattern.test(inputPhone)) {
        //         isValid = false;
        //         setErrorPhone("Please enter only number.");
        //     } else if (inputPhone.length != 10) {
        //         isValid = false;
        //         setErrorPhone("Please enter valid phone number.");
        //     }
        // }
        // if(isValid&& inputPhone !== "undefined") {
        setErrorPhone("")
        props.saveUserInServer1(props.user);

        // alert("your profile is updated")
        // }

    }


    const onChangeHandlerLogo = (event) => {
        const reader1 = new FileReader();
        const file = event;
        reader1.onloadend = () => {
            props.setUserByFiled1("imgLogo", reader1.result);
        };
        reader1.readAsDataURL(file);/////
        ////////

        console.log("event", event)
        var fileToUpload = event
        const myFile = new FormData();
        myFile.append("file", fileToUpload);
        addNewImage(myFile);
    }

    const addNewImage = (fd) => {
        // debugger;
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
                // setUser({ ...user, ["imgLogo"]: data1 })
                props.setUserByFiled1("imgLogo", data1)
                // user.imgLogo = data1;
                // setUser(user);
            },
            error: function (err) {
                console.log(err)
            }
        });

    }



    return (
        <>
            {/* <form onSubmit={handleSubmit(onSubmit)}> */}
            <div className="container-fluid div1 scrollbar">

                <div className="row">
                    <div className="col-10  pl-4 mt-4 div_font">Company Information</div>
                    <div className="col-2 div_btn_save btn_save_small pr-2 mt-4">
                        <button className="btn_save btn btn-outline-dark" type="submit" onClick={saveInformation}>Save Setting</button>
                    </div>
                    {/* <div className="col-2 btn_save"><button>save</button></div> */}
                </div>
                <div className="row pb-4">
                    <div className="col-md-1">
                        <div className="container-fluid">
                            {/* <div className="row">
                                <div className="col font_2">
                                    Company Logo
                                </div>
                            </div> */}
                            <div className="row">
                                <div className="col">
                                    <label for="logouug" className="lbl_img">
                                        {/* <img className="logoC" src={this.props.quote.logo ? this.props.quote.logo :tempLogo } /> */}
                                        <img className="img_logo" referrerpolicy="no-referrer" src={props.user && props.user.imgLogo == "" ? logo1 : props.user.imgLogo} />
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
                    <div className="col-md-11">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col font_1">Company Name</div>
                            </div>
                            <div className="row">
                                <div className="col pr-2">
                                    <input
                                        name="companyName"
                                        onChange={(e) => handle(e)}
                                        type="text" class="form-control i_topic i_color_grey" placeholder={props.user && props.user.companyName == "" ? "company name" : props.user.companyName} aria-describedby="basic-addon2" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="row">
                    <div className="col-md-6 pl-2 pb-4">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col pl-3 font_2">
                                    Position / department
                                </div>
                            </div>
                            <div className="row">
                                <div className="col pr-1 col_small_left">
                                    <input
                                        name="position"
                                        onChange={(e) => handle(e)}
                                        // onClick={removeInput}
                                        //  ref={positionInput}
                                        type="text" class="form-control form-control i_topic i_color_grey" placeholder={props.user.position == "" ? "position" : props.user.position} aria-label="Recipient's username" aria-describedby="basic-addon2" />

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 pr-2 pb-4">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col font_2 pr-0 pl-1 col_small_lable">
                                    Company Vat Number
                                </div>
                            </div>
                            <div className="row">
                                <div className="col col_small_right pl-0">
                                    <input
                                        name="vat"
                                        onChange={(e) => handle(e)}
                                        type="number" class="form-control i_topic i_color_grey" placeholder={props.user.vat == "" ? "vat" : props.user.vat} aria-describedby="basic-addon2" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="row">
                    <div className="col-md-6 pl-2 pb-4">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col pl-3 font_2">
                                    Company Phone
                                </div>
                            </div>

                            <div className="row">
                                <div className="col pr-1 col_small_left">
                                    <input
                                        name="phone"
                                        onChange={(e) => handle(e)}
                                        type="tel" class="form-control i_topic i_color_grey"
                                        placeholder={props.user.phone == "" ? "phone" : props.user.phone}
                                        aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                </div>
                                {/* placeholder={props.user && props.user.socialmedias ? props.user.socialmedias.website === "" ? "website" : props.user.socialmedias.website : null} */}

                                <div className="text-danger">{props&&props.errors["phone"] ? props.errors["phone"].properties.message:null}</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 pr-2 pb-4">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col font_2 pr-0 pl-1 col_small_lable">
                                    Company Email
                                </div>
                            </div>
                            <div className="row">
                                <div className="col col_small_right pl-0">
                                    <input
                                        name="companyEmail"
                                        onChange={(e) => handle(e)}
                                        type="email" class="form-control i_topic i_color_grey" placeholder={props.user.companyEmail == "" ? "company email" : props.user.companyEmail} aria-describedby="basic-addon2" />
                                </div>
                                <div className="text-danger">{props&&props.errors["companyEmail"] ? props.errors["companyEmail"].properties.message:null}</div>
                            </div>
                        </div>
                    </div>

                </div>


                <div className="row">
                    <div className="col-md-5 pl-2 pb-4">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col pl-3 font_2">
                                    Address
                                </div>
                            </div>

                            <div className="row">
                                <div className="col pr-0 col_small_left">
                                    {/* <div class="input-group mb-3"> */}
                                    <input
                                        name="address"
                                        onChange={(e) => handle(e)}
                                        type="text" class="form-control i_topic i_color_grey" placeholder={props.user.address == "" ? "address" : props.user.address} aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                    {/* </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-1 pr-2 pl-2 pb-4">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col font_2 pl-0 col_small_lable">
                                    Number
                                </div>
                            </div>
                            <div className="row">
                                <div className="col col_small_right col_small_num pl-0 pr-2">
                                    {/* <div class="input-group mb-3" > */}
                                    <input
                                        name="numberAddress"
                                        onChange={(e) => handle(e)}
                                        type="number" class="form-control i_topic i_color_grey" placeholder={props.user.numberAddress == 0 ? "number" : props.user.numberAddress} aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                    {/* </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 pl-2 pb-4">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col pl-3 font_2">
                                    Country
                                </div>
                            </div>

                            <div className="row">
                                <div className="col pr-1 col_small_left pl-2">
                                    {/* <div class="input-group mb-3 i_color_grey" > */}
                                    <select className="form-control i_color_grey i_topic" name="country" onChange={(e) => handle(e)}>
                                        <option default>
                                            {props.user.country == "" ? "country" : props.user.country}
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
                                    {/* </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 pr-2 pb-4 pl-2">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col font_2 pr-0 pl-1 col_small_lable">
                                    City
                                </div>
                            </div>
                            <div className="row">
                                <div className="col col_small_right pl-0">
                                    <select className="form-control i_color_grey i_topic" name="city" onChange={(e) => handle(e)}>
                                        <option default>
                                            {props.user.city == "" ? "city" : props.user.city}
                                        </option>
                                        {cities.map(item => (
                                            <option
                                                key={item.value}
                                                value={item.name}
                                            >
                                                {item}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 pb-3 div_font pl-4">Personal Information</div>
                </div>
                <div className="row">
                    <div className="col-md-4 pl-2 pb-3">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col pl-3 font_2">
                                    Username
                                </div>
                            </div>

                            <div className="row">
                                <div className="col pr-1 col_small_left">
                                    <div className="form-control i_topic i_color_grey">{props.user.username}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 pr-2 pb-3">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col font_2 pr-0 pl-1 col_small_lable">
                                    Birthday
                                </div>
                            </div>
                            <div className="row">
                                <div className="col col_small_right pl-0">
                                    <input
                                        name="birthday"
                                        onChange={(e) => handle(e)}
                                        type="text" onFocus={(e) => { e.target.type = 'date'; console.log(e.target.value) }}
                                        onBlur={(e) => { e.target.type = 'text' }}
                                        class="form-control i_topic i_color_grey calendar" placeholder={props.user.birthday == "" ? "birthday" : props.user.birthday} aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 pr-2 pb-3">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col font_2 pr-0 pl-1 col_small_lable">
                                    Api Key
                                </div>
                            </div>
                            <div className="row">
                                <div className="col col_small_right pl-0 input-group">
                                    <input
                                        name="apiKey"
                                        // onChange={(e) => handle(e)}
                                        type={apiKeyType}
                                        class="form-control i_topic i_color_grey calendar" value={props.user.apiKey == "" ? "api key" : props.user.apiKey} aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                    <span className="password__show" onClick={(e) => changeTypeInputApiKey(e)}>
                                        <svg id="i_eye" width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-eye" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.134 13.134 0 0 0 1.66 2.043C4.12 11.332 5.88 12.5 8 12.5c2.12 0 3.879-1.168 5.168-2.457A13.134 13.134 0 0 0 14.828 8a13.133 13.133 0 0 0-1.66-2.043C11.879 4.668 10.119 3.5 8 3.5c-2.12 0-3.879 1.168-5.168 2.457A13.133 13.133 0 0 0 1.172 8z" />
                                            <path fill-rule="evenodd" d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div>
                    {/* <div className="row">
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
                */}
                    {/* <div className="row">
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              */}
                    {/* <div className="row">
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
 */}

                    {/* <div className="row">
                    <div className="col-md-4 font_2">Company Address</div>
                </div> */}

                    {/* <div className="row mt-1">
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


                </div> */}
                </div>
                <div className="row">
                    <div className="col-md-4 font_2 pl-4">Media</div>
                </div>
                {/* <div className="div1 scrollbar" > */}
                <div className="row mt-1">
                    <div className="col-1">
                        <div class="input-group mb-3 form-control i_topic i_color_grey">
                            <img src={globe} className="img_social"></img>
                        </div>
                    </div>
                    <div className="col-11">
                        {/* <div class="input-group mb-3 i_color_grey i_topic" > */}
                        <input className="i_topic i_color_grey form-control"
                            // placeholder={medias === undefined || medias.website === "" ? "website" : JSON.stringify(medias.website)}
                            placeholder={props.user && props.user.socialmedias ? props.user.socialmedias.website === "" ? "website" : props.user.socialmedias.website : null}
                            // placeholder={medias.website == "" ? "website" : JSON.stringify(medias.website)}
                            name="website"
                            onChange={(e) => handle(e)}
                        />
                        {/* </div> */}
                    </div>

                </div>
                <div className="row mt-1">

                    <div className="col-1">
                        <div class="input-group mb-3 form-control i_topic i_color_grey">
                            <img src={facebookimg} className="img_social"></img>
                        </div>
                    </div>
                    <div className="col-11">
                        <input className="i_topic i_color_grey form-control"
                            placeholder={props.user && props.user.socialmedias ? props.user.socialmedias.facebook === "" ? "facebook" : props.user.socialmedias.facebook : null}
                            name="facebook"
                            onChange={(e) => handle(e)}
                        />
                    </div>

                </div>
                <div className="row mt-1">
                    <div className="col-1" >
                        <div class="input-group mb-3 form-control i_topic i_color_grey">
                            <img src={whatsapp} className="img_social"></img>
                        </div>
                    </div>
                    <div className="col-11">
                        <input className="i_topic i_color_grey form-control"
                            placeholder={props.user && props.user.socialmedias ? props.user.socialmedias.whatsapp === "" ? "whatsapp" : props.user.socialmedias.whatsapp : null}
                            name="whatsapp"
                            onChange={(e) => handle(e)}
                        />
                    </div>

                </div>
                <div className="row mt-1">
                    <div className="col-1" >
                        <div class="input-group mb-3 form-control i_topic i_color_grey">
                            <img src={messenger} className="img_social"></img>
                        </div>
                    </div>
                    <div className="col-11">
                        <input className="i_topic i_color_grey form-control"
                            name="messenger"
                            placeholder={props.user && props.user.socialmedias ? props.user.socialmedias.messenger === "" ? "messenger" : props.user.socialmedias.messenger : null}
                            onChange={(e) => handle(e)}
                        />
                    </div>

                </div>
                <div className="row mt-1">
                    <div className="col-1" >
                        <div class="input-group mb-3 form-control i_topic i_color_grey">
                            <img src={youtube} className="img_social"></img>
                        </div>
                    </div>
                    <div className="col-11">
                        <input className="i_topic i_color_grey form-control"
                            name="youtube"
                            placeholder={props.user && props.user.socialmedias ? props.user.socialmedias.youtube === "" ? "youtube" : props.user.socialmedias.youtube : null}
                            onChange={(e) => handle(e)}
                        />
                    </div>

                </div>
                {/* </div> */}


            </div>
            {/* </form> */}

        </>
    )

}
export default connect(
    (state) => {
        return {
            user: state.user.user,
            errors: state.errors.errors
        }
    },
    (dispatch) => {
        return {
            getUserFromServer1: function (newName) {
                dispatch(actions.getUserFromServer(newName))
            },
            saveUserInServer1: function (user) {
                dispatch(actions.saveUserInServer(user))
            },
            setUserByFiled1: function (filed, value) {
                dispatch(actions.setUserByFiled(filed, value))
            },
            removeErr: function (state, action) {
                dispatch(actions.removeError(state,action))
            }
        }
    }


)(UserInformation)