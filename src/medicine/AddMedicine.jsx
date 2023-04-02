import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../Navbar";
import checkLoggedIn from "../auth/checkLoggedIn";

function AddMedicine(){

    var [name, setName]=useState('');
    var [company, setCompany]=useState('');
    var [expiry, setExpiry]=useState('');
    var user=useSelector(store=>store.auth.user)
    var navigate=useNavigate()

    function add(){
        axios.post('https://medicalstore.mashupstack.com/api/medicine',{
            name:name,
            company:company,
            expiry_date:expiry
        },{headers:{'Authorization':"Bearer "+user.token}}).then(response=>{
            alert(response.data.message)
            navigate('/medicines')       
        })
    }

    return(
        <div>
            <Navbar/>
            <div className="container">
                <div className="row">
                    <div className="col-md-4 offset-md-4">
                        <h3>ADD MEDICINE</h3>
                        <div className="form-group">
                            <label>Medicine Name:</label>
                            <input className="form-control" type="text" value={name}
                            onInput={(event)=>{setName(event.target.value)}}></input>
                        </div>
                        <div className="form-group">
                            <label>Company Name:</label>
                            <input className="form-control" type="text" value={company}
                            onInput={(event)=>{setCompany(event.target.value)}}></input>
                        </div>
                        <div className="form-group">
                            <label>Expiry Date:</label>
                            <input className="form-control" type="date" value={expiry}
                            onInput={(event)=>{setExpiry(event.target.value)}}></input>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-success float-right" onClick={add}>+ADD</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default checkLoggedIn(AddMedicine);