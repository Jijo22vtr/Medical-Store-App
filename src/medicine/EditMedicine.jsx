import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

function EditMedicine(){

    var {medicineId}=useParams()
    var [name, setName]=useState('');
    var [company, setCompany]=useState('');
    var [expiry, setExpiry]=useState('');
    var navigate=useNavigate()
    var user=useSelector(store=>store.auth.user)

    useEffect(()=>{
        axios.get('https://medicalstore.mashupstack.com/api/medicine/'+medicineId,
        {headers:{'Authorization':"Bearer "+user.token}}).then(response=>{
            setName(response.data.name);
            setCompany(response.data.company);
            setExpiry(response.expiry_date);
        })
    },[medicineId, user.token])
 
    function edit(){
            axios.post('https://medicalstore.mashupstack.com/api/medicine/'+medicineId,{
                name:name,
                company:company,
                expiry_date:expiry
            },{headers:{'Authorization':'Bearer '+ user.token}}).then(response=>{
                <p>{response.data.message}</p>
                navigate('/medicines')       
            })
    }

        return(
           <div><Navbar/>
            <div className="container">
                <div className="row">
                    <div className="col-md-5">
                        <h2 className="text-center">EDIT MEDICINE</h2>
                        <label> New Medicine Name:</label>
                        <input className="form-control" type="text" value={name}
                        onInput={(event)=>{setName(event.target.value)}}></input>
                        <label>New Company Name:</label>
                        <input className="form-control" type="text" value={company}
                        onInput={(event)=>{setCompany(event.target.value)}}></input>
                        <label>New Expiry Date:</label>
                        <input className="form-control" type="date" value={expiry}
                        onInput={(event)=>{setExpiry(event.target.value)}}></input>
                        <button onClick={edit} className="btn btn-success">Update</button>
                    </div>

                </div>
            </div>
            </div>
        );
    
}

export default EditMedicine;