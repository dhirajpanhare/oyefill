import { useState  ,useEffect } from 'react';
import {Link} from 'react-router-dom';
import Auth from '../components/Auth';
const Navbar = () => {
    const [HeaderContent, setHeader] = useState();
    const [menuOpen, setMenuOpen] = useState(false)

    const toggleMenu = () => {
        setMenuOpen(prev => !prev);
    
    };
    useEffect(()=>{
        
        setInterval(()=>{
            if(localStorage.getItem("token")!=undefined &&  localStorage.getItem("role")=="admin"){

                setHeader(
                     <header>
           <Link to="https://oyefill.vercel.app/adminhome"><img src="/public/assets/images/logo.png" alt="logo-image" id='logo' /></Link>
            <div className={`nav-options ${menuOpen ? "active" : ""}`}>
  <Link to="https://oyefill.vercel.app/adminhome" className='nav-item'>Admin Home</Link>
               <Link to="https://oyefill.vercel.app/manageusers" className='nav-item'>ManageUsers</Link>
               <Link to="https://oyefill.vercel.app/addcategory" className='nav-item'>ManageCategory</Link>
                <Link to="https://oyefill.vercel.app/manageforms" className='nav-item'>ManageForms</Link>
              <Link to="https://oyefill.vercel.app/addalert" className='nav-item'>AddAlert</Link>
              <Link to="https://oyefill.vercel.app/messages" className='nav-item'>Messages</Link>
            </div>

            <div className="buttons">
                   <Link to="https://oyefill.vercel.app/logout"><button>logout</button></Link>
            </div>
  <div className="menu" onClick={toggleMenu}>
                            <i className="fa-solid fa-bars"></i>
                        </div>
        </header>
                )
            }
          else if(localStorage.getItem("token")!=undefined &&  localStorage.getItem("role")=="user")
          {
            
            setHeader(
                 <header>
           <Link to="https://oyefill.vercel.app/"><img src="/public/assets/images/logo.png" alt="logo-image" id='logo' /></Link>
            <div className="nav-options">
             <Link to="https://oyefill.vercel.app/" className='nav-item'>Home</Link>
                  <Link to="https://oyefill.vercel.app/about" className='nav-item'>About</Link>
                  <Link to="https://oyefill.vercel.app/form" className='nav-item'>Forms</Link>
                 <Link to="https://oyefill.vercel.app/alerts" className='nav-item'>Alerts</Link>
             
               <Link to="https://oyefill.vercel.app/contact" className='nav-item'>Contact</Link>
            </div>

            <div className="buttons">
                <button>
                   
                    {localStorage.getItem('name')}</button>
                <Link to="/logout"><button>logout</button></Link>

            </div>
             <div className="menu" onClick={toggleMenu}>
                            <i className="fa-solid fa-bars"></i>
                        </div>
        </header>
            )
          }
            else{
                setHeader(
                     <header>
           <Link to="https://oyefill.vercel.app/"><img src="/public/assets/images/logo.png" alt="logo-image" id='logo' /></Link>
           
            <div className={`nav-options ${menuOpen ? 'active' : ''}`}>
             <Link to="https://oyefill.vercel.app/" className='nav-item'>Home</Link>


                  <Link to="https://oyefill.vercel.app/about" className='nav-item'>About</Link>
                  <Link to="https://oyefill.vercel.app/form" className='nav-item'>Forms</Link>
                 <Link to="https://oyefill.vercel.app/alerts" className='nav-item'>Alerts</Link>
               <Link to="https://oyefill.vercel.app/contact" className='nav-item'>Contact</Link>
              
            </div>

            <div className="buttons">

                <Link to="/login"><button>Login</button></Link>
               <Link to="/register"> <button>Register</button></Link>
            </div>
             <div className="menu" onClick={toggleMenu}>
                            <i className="fa-solid fa-bars"></i>
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