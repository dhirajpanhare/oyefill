    import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react'; 

function Auth()
{
    const navigate = useNavigate();

    useEffect(()=>{
     var path=window.location.pathname;
     if(path=="/adminhome" || path=="/manageusers" || path=="/addcategory")
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
