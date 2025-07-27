    import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react'; 

function Auth()
{
    const navigate = useNavigate();

    useEffect(()=>{
     var path=window.location.pathname;
     if(path=="https://oyefill.vercel.app/adminhome" || path=="https://oyefill.vercel.app/manageusers" || path=="https://oyefill.vercel.app/addcategory")
     {
      if(!localStorage.getItem("token") || localStorage.getItem("role")!="admin")   
        navigate("/logout");
    }
     
  
    });
   
    return(
        <></>
    )
}

export default Auth;
