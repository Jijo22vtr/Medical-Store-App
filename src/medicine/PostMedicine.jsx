import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function PostMedicine(props){
    var user=useSelector(store=>store.auth.user)
    function deleteMedi(){
        axios.delete('https://medicalstore.mashupstack.com/api/medicine/' + props.medicine.id,
        {headers: {'Authorization':"Bearer " + user.token}}).then(response=>{
            alert(response.data.message)
            props.refresh()
        })

    }
   
    return (

    <div className="card" style={{marginTop:"60px"}}>
        <div className="card-body">
            <p>Medicine:<b>{props.medicine.name}</b></p>
            <p>Company:<b>{props.medicine.company}</b></p>
            <p>Expiry Date:<b>{props.medicine.expiry_date}</b></p>
            <Link to={'/medicines/'+props.medicine.id+"/edit"} className="btn btn-primary float-right">Edit Medicine</Link>
            {/* <Link to={'/medicines/'+props.medicine.id+"/view"} className="btn btn-primary float-right">View Medicine</Link> */}
            <button className="btn btn-primary float-right" onClick={deleteMedi}>Delete Medicine</button>
        </div>
    </div>

    );

}

export default PostMedicine;