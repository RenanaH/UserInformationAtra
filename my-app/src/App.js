import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import UserInformation from './components/UserInformation/userInformation'
import Wrap from './components/Wrap/wrap'
import { useParams } from "react-router-dom";
import userService from './Services/userService';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import X from './components/x';

function App() {

  // const { userName } = useParams();
  // const isFirstEntery = true;//that useeffect be once

  // const useEffect = () => {
  //   // let { id } = useParams();
  //   // console.log(id)
  //   // if (isFirstEntery) {
  //   //   isFirstEntery = false;
  //   var url = window.location;
  //   var userName = (url.pathname.split('/')[1]);
  //   console.log(userName);
  //   // }
  // }
  return (
    <div className="App">
      {/* <UserInformation/> */}
      <Wrap />
      {/* <X></X> */}
    </div>
  );
}

export default App;
