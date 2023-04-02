import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const checkLoggedIn=(Component)=>{

    function Wrapper(props){
        var navigate=useNavigate();
        var user=useSelector(store=>store.auth.user);

        useEffect(()=>{
            if(!user){
                navigate('/login');
            }
        },[user, navigate]);
        return <Component {...props}/>
    }
    return Wrapper
}

export default checkLoggedIn;
