import axios from "axios";
import  {useState,useEffect} from "react";
import { useSelector } from "react-redux";
import Navbar from "../Navbar";
import PostMedicine from "./PostMedicine";
import checkLoggedIn from "../auth/checkLoggedIn";
import { Link } from "react-router-dom";

function ListMedicine(){

    var [medicines, setMedicines]=useState([]);
    const [searchmed, setSearchMed]=useState('');
    var user=useSelector(store=> store.auth.user)
    

    function fetchMedicines(){
        axios.get('https://medicalstore.mashupstack.com/api/medicine/search?keyword='+searchmed,
        {headers: {'Authorization': 'Bearer '+ user.token}
        }).then(response=>{
            setMedicines(response.data); 
        })
        }
            useEffect(() =>{
            fetchMedicines();
        },[searchmed]);
    
    return(
    <div>
        <Navbar/>
        <div className="container">
            <div className="row">
                <div className="col-md-4 offset-md-5">
                    <h1>MEDICINES</h1>
                </div>
            </div>
            <div style={{float:"right"}}>
                <input value={searchmed} onInput={(event=>setSearchMed(event.target.value))} 
                style={{marginRight:"20px", marginTop:"20px"}}/>
                <button onClick={fetchMedicines} className="btn btn-success">Search</button>
            </div>
            {<div className="col-md-3 two">
                <Link to={"/medicines/add"} className="btn btn-info">+Add Medicine</Link>
            </div> }
            <div>    
                {medicines.map(medicine =><PostMedicine key={medicine.id} medicine={medicine} refresh={fetchMedicines}/>)}
            </div>
            </div>
        </div>
    
    )
}
export default checkLoggedIn(ListMedicine);