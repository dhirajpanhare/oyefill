import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../components/Auth';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [role, setRole] = useState('');
  const [token, setToken] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    setToken(localStorage.getItem('token'));
    setRole(localStorage.getItem('role'));
    setName(localStorage.getItem('name'));
  }, []);

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  const renderLinks = () => {
    if (token && role === 'admin') {
      return (
        <>
          <Link to="/adminhome" className="nav-item">Admin Home</Link>
          <Link to="/manageusers" className="nav-item">ManageUsers</Link>
          <Link to="/addcategory" className="nav-item">ManageCategory</Link>
          <Link to="/manageforms" className="nav-item">ManageForms</Link>
          <Link to="/addalert" className="nav-item">AddAlert</Link>
          <Link to="/messages" className="nav-item">Messages</Link>
        </>
      );
    } else if (token && role === 'user') {
      return (
        <>
          <Link to="/" className="nav-item">Home</Link>
          <Link to="/about" className="nav-item">About</Link>
          <Link to="/form" className="nav-item">Forms</Link>
          <Link to="/alerts" className="nav-item">Alerts</Link>
          <Link to="/contact" className="nav-item">Contact</Link>
        </>
      );
    } else {
      return (
        <>
          <Link to="/" className="nav-item">Home</Link>
          <Link to="/about" className="nav-item">About</Link>
          <Link to="/form" className="nav-item">Forms</Link>
          <Link to="/alerts" className="nav-item">Alerts</Link>
          <Link to="/contact" className="nav-item">Contact</Link>
        </>
      );
    }
  };

  const renderButtons = () => {
    if (token && role === 'admin') {
      return (
        <div className="buttons">
          <Link to="/logout"><button>Logout</button></Link>
        </div>
      );
    } else if (token && role === 'user') {
      return (
        <div className="buttons">
          <button>{name}</button>
          <Link to="/logout"><button>Logout</button></Link>
        </div>
      );
    } else {
      return (
        <div className="buttons">
          <Link to="/login"><button>Login</button></Link>
          <Link to="/register"><button>Register</button></Link>
        </div>
      );
    }
  };

  return (
    <>
      <Auth />
      <header>
        <Link to="/">
          <img src="https://oyefill.vercel.app/assets/images/logo.png" alt="logo-image" id="logo" />
        </Link>

        <div className={`nav-options ${menuOpen ? 'show' : ''}`}>
          {renderLinks()}
        </div>

        {renderButtons()}

        <div className="menu" onClick={toggleMenu}>
          <i className="fa-solid fa-bars"></i>
        </div>
      </header>
    </>
  );
};

export default Navbar;
