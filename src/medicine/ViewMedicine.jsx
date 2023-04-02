import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";

function ViewMedicine(){

    var {medicineId}=useParams()
    var [medicine, setMedicine]=useState({name:'',company:'',expiry:''})
    var user=useSelector(store=>store.auth.user)

    useEffect(()=>{
        axios.get('https://medicalstore.mashupstack.com/api/medicine/' + medicineId,
        {headers: {'Authorization': "Bearer " + user.token}}).then(response=>{
            setMedicine(response.data)
        })
    },[medicineId, user.token]);

    return <div>
        <Navbar/>
        <div className="container">
            <div className="row">
                <div className="col-md-5">
                    <div className="card">
                        <div className="card-header"><h3>MEDICINE</h3></div>
                            <div className="card-body">
                                <h3>Medicine Name:{medicine.name}</h3>
                                <p>Company Name:{medicine.company}</p>
                                <p>Expiry date:{medicine.expiry_date}</p>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    x</div>
}
export default ViewMedicine;