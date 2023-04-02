import { useState } from "react";
import Navbar from "../Navbar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

function Login(){
    var [email, setEmail] = useState('');
    var [password, setPassword] = useState('');
    var [errorMessage, setErrorMessage] = useState('');
    var navigate=useNavigate()
    var dispatch=useDispatch();
    var user=useSelector(store=>{return store.user})

    function tryLogin(){

        axios.post('https://medicalstore.mashupstack.com/api/login',{
            email:email,
            password:password
        }).then(response=>{
            setErrorMessage('')
                user={
                email:email,
                token:response.data.token
            }
            dispatch(setUser(user))
            navigate('/medicines')
        }).catch(error=>{
            if(error.response.data.erros){
                setErrorMessage(Object.values(error.response.data.errors).join(' '))
            }else if(error.response.data.message){
                setErrorMessage(error.response.data.message)
            }else{
                setErrorMessage('Failed to login. Contact Admin')   
            }            
            
        })
    }

    return (<div>
        <Navbar/>
        <div className="container">
            <div className="row">
                <div className="col-8 offset-2">
                    <h1>Login</h1>
                    {errorMessage?<div className="alert alert-danger">{errorMessage}</div>:''}
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="email"
                        className="form-control"
                        value={email}
                        onInput={(event)=>setEmail(event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input type="password"
                        className="form-control"
                        value={password}
                        onInput={(event)=>setPassword(event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-success float-right" onClick={tryLogin}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    </div>)

}

export default Login;