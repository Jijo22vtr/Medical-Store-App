import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { removeUser } from "./store/authSlice";


function Navbar() {
    var user=useSelector(store=>store.auth.user);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    function logout(){
        if (user){
            axios.post('https://medicalstore.mashupstack.com/api/logout',{},{
                headers:{'Authorization':"Bearer "+user.token}
            });
            dispatch(removeUser());
            navigate('/');
        }
    }
    return <nav className="navbar navbar-expand-sm navbar-dark bg-secondary">
        <div style={{float:"left", color:"white"}}><h2>MEDICAL STORE</h2></div>
        <div className="collapse navbar-collapse mr-auto">
            <ul className="navbar-nav ml-auto">
            <li className="btn btn-danger"><NavLink to={'/'}>Home</NavLink></li>&nbsp;&nbsp;
               {/* <li className="btn btn-light"><NavLink to={'/medicines/add'}>Add Medicine</NavLink></li>&nbsp;&nbsp; */}
                {/* <li className="btn btn-light"><NavLink to={'/medicines'}>Medicines</NavLink></li>&nbsp;&nbsp; */}
                <li className="btn btn-warning" ><NavLink to={'/register'}>Register</NavLink></li>&nbsp;&nbsp;
                {user?
                <li><button className="btn btn-danger" onClick={logout} style={{border:"none", color:"#3366CC"}}>Logout</button>
                </li>:<li className="btn btn-success"><NavLink to={"/login"}>Login</NavLink></li>
                }
            </ul>
        </div>
    </nav>;
}

export default Navbar;