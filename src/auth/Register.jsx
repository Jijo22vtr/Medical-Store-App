import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

function Register(){

    var [name, setName] = useState('');
    var [email, setEmail] = useState('');
    var [password, setPassword] = useState('');
    var [passwordConf, setPasswordConf] = useState('');
    var [errorMessage, setErrorMessage] = useState('');
    var navigate = useNavigate();

    function signupUser(){
        var user = {
            name: name,
            email: email,
            password: password,
            password_confirmation: passwordConf
        }

        axios.post('https://medicalstore.mashupstack.com/api/register', user).then(response=>{
            setErrorMessage('');
            navigate('/login');
        }).catch(error=>{
            if(error.response.data.errors){
                setErrorMessage(Object.values(error.response.data.errors).join(''));
            }else{
                setErrorMessage('Failed to connect to api');
            }
        })
    }

    return <div>
        <Navbar/>
        <div className="container">
            <div className="row">
                <div className="col-8 offset-2">
                    <h2>Register</h2>
                    {errorMessage?<div className="alert alert-warning">{errorMessage}</div>:''}
                    <div className="form-group">
                        <label>Name:</label>
                        <input type="text" value={name} className="form-control" 
                        onInput={(event)=>setName(event.target.value)}></input>
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="email" className="form-control" value={email}
                        onInput={(event)=>setEmail(event.target.value)}></input>
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input type="password" value={password} className="form-control" 
                        onInput={(event)=>setPassword(event.target.value)}></input>
                    </div>
                    <div className="form-group">
                        <label>Confirm Password:</label>
                        <input type="password" className="form-control" value={passwordConf}
                        onInput={(event)=>setPasswordConf(event.target.value)}></input>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary float-right" onClick={signupUser}>Register</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

}

export default Register;

