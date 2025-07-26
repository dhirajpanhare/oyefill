import { useState  ,useEffect } from 'react';
import {Link} from 'react-router-dom';
// import Auth from '../components/Auth';
const Navbar = () => {
    const [HeaderContent, setHeader] = useState();

    useEffect(()=>{
        setInterval(()=>{
            if(localStorage.getItem("token")!=undefined &&  localStorage.getItem("role")=="admin"){

                setHeader(
                     <header>
           <Link to="/"><img src="assets/images/logo.png" alt="logo-image" id='logo' /></Link>
            <div className="nav-options">
           <a>  <Link to="/" className='nav-item'>Admin Home</Link></a>
               <a>   <Link to="/about" className='nav-item'>About</Link></a>
               <a>   <Link to="/" className='nav-item'>Forms</Link></a>
               <a>  <Link to="/" className='nav-item'>Alerts</Link></a>
            </div>

            <div className="buttons">
                <Link to="/login"><button>Login</button></Link>
               <Link to="/register"> <button>Register</button></Link>
            </div>
        </header>
                )
            }
            else if(localStorage.getItem("token")!=undefined && localStorage.getItem("role")=="user")
            {
                setHeader(
                     <header>
           <Link to="/"><img src="assets/images/logo.png" alt="logo-image" id='logo' /></Link>
            <div className="nav-options">
           <a>  <Link to="/" className='nav-item'>User Home</Link></a>
               <a>   <Link to="/about" className='nav-item'>About</Link></a>
               <a>   <Link to="/" className='nav-item'>Forms</Link></a>
               <a>  <Link to="/" className='nav-item'>Alerts</Link></a>
            </div>

            <div className="buttons">
                <Link to="/login"><button>Login</button></Link>
               <Link to="/register"> <button>Register</button></Link>
            </div>
        </header>
                )
            }
            else{
                setHeader(
                     <header>
           <Link to="/"><img src="assets/images/logo.png" alt="logo-image" id='logo' /></Link>
            <div className="nav-options">
           <a>  <Link to="/" className='nav-item'>Home</Link></a>
               <a>   <Link to="/about" className='nav-item'>About</Link></a>
               <a>   <Link to="/" className='nav-item'>Forms</Link></a>
               <a>  <Link to="/" className='nav-item'>Alerts</Link></a>
            </div>

            <div className="buttons">
                <Link to="/login"><button>Login</button></Link>
               <Link to="/register"> <button>Register</button></Link>
            </div>
        </header>
                )
            }
        },1)
    },[])
    return (

        
        <>
       {<Auth/>}
        {HeaderContent}
    
        </>
    )
}
export default Navbar;