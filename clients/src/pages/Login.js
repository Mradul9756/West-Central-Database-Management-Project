import React, { useEffect, useState } from "react";
import "./Login.css";
import axios from "axios";
import {useParams, Link} from 'react-router-dom';

const Login = () => {
const [pin , setPin]  = useState()

const handleSubmit =   () =>{
const params = { userPin: pin };
  console.log(params)
  axios.post("http://localhost:5000/api/login",{
    pin
}).then((res) => {
  localStorage.setItem("status",true)
  window.location.reload()
  alert("User logged In")
}).catch((err) => {alert("Wrong Pin Entered")})

}
  // login code ends
  return (
    <div className="login-page">
      <span>Enter your security pin</span>
      <input onChange={e => setPin(e.target.value)}></input>
      <Link to="/">
      <button onClick={handleSubmit} class="security-btn">
    
    <span class="text">Submit</span>
    </button>
  </Link> 
    </div>
  );
};

export default Login;